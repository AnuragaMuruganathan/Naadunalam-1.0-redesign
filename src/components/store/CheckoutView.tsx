"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { DELIVERY_FEE, WHATSAPP } from "@/lib/data";
import { inr } from "@/lib/format";
import type { Product } from "@/lib/products";
import { useStore } from "./StoreProvider";
import { EMPTY_ART, EmptyState, OrderSummary } from "./Parts";
import { Arrow, Basket, Chat, Check } from "../Icons";

type Field = "name" | "phone" | "email" | "line1" | "line2" | "city" | "pincode" | "state" | "note";
type Values = Record<Field, string> & { pay: "upi" | "bank" };
type Errors = Partial<Record<Field, string>>;

const STATES = ["Tamil Nadu", "Puducherry", "Other state"];
const PAYMENTS = [
  { id: "upi", t: "UPI", d: "GPay, PhonePe or Paytm. We send the UPI ID with your confirmed total." },
  { id: "bank", t: "Bank transfer", d: "We send our account details with your confirmed total." },
] as const;

const INITIAL: Values = {
  name: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  pincode: "",
  state: "Tamil Nadu",
  note: "",
  pay: "upi",
};

const digits = (s: string) => s.replace(/\D/g, "");
const mobile = (s: string) => {
  const d = digits(s);
  return d.length === 12 && d.startsWith("91") ? d.slice(2) : d;
};

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[6-9]\d{9}$/.test(mobile(v.phone))) e.phone = "Enter a 10-digit mobile number, e.g. 98765 43210.";
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "This email doesn't look right.";
  if (v.line1.trim().length < 5) e.line1 = "Enter your house number and street.";
  if (v.city.trim().length < 2) e.city = "Enter your town or city.";
  if (!/^[1-9]\d{5}$/.test(digits(v.pincode))) e.pincode = "Enter a 6-digit pincode.";
  return e;
}

type Placed = {
  no: string;
  name: string;
  url: string;
  lines: { product: Product; qty: number }[];
  subtotal: number;
  delivery: number | null;
};

export default function CheckoutView() {
  const { lines, subtotal, clearCart, ready } = useStore();
  const [v, setV] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [placed, setPlaced] = useState<Placed | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const delivery = v.state === "Tamil Nadu" ? DELIVERY_FEE : null;

  const set = (k: Field) => (e: { target: { value: string } }) => {
    const value = e.target.value;
    setV((s) => ({ ...s, [k]: value }));
    // Clear an error as soon as the field becomes valid.
    if (errors[k]) setErrors((er) => ({ ...er, [k]: validate({ ...v, [k]: value })[k] }));
  };
  const blur = (k: Field) => () => setErrors((er) => ({ ...er, [k]: validate(v)[k] }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const er = validate(v);
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const no = `NN-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const total = subtotal + (delivery ?? 0);
    const msg = [
      `Hello Naadu Nalam, I'd like to place an order.`,
      `Order ${no}`,
      ``,
      ...lines.map((l) => `• ${l.product.en} (${l.product.pack}) × ${l.qty} = ${inr(l.product.price * l.qty)}`),
      ``,
      `Subtotal: ${inr(subtotal)}`,
      `Delivery: ${delivery === null ? "please confirm" : inr(delivery)}`,
      `Total: ${inr(total)}${delivery === null ? " + delivery" : ""}`,
      `Payment: ${v.pay === "upi" ? "UPI" : "Bank transfer"}`,
      ``,
      `Name: ${v.name.trim()}`,
      `Mobile: ${mobile(v.phone)}`,
      v.email.trim() ? `Email: ${v.email.trim()}` : null,
      `Address: ${[v.line1, v.line2, v.city]
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ")} - ${digits(v.pincode)}, ${v.state}`,
      v.note.trim() ? `Note: ${v.note.trim()}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    const url = `${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setPlaced({ no, name: v.name.trim().split(/\s+/)[0], url, lines, subtotal, delivery });
    clearCart();
    window.scrollTo({ top: 0 });
  };

  const err = (k: Field) =>
    errors[k] ? (
      <span className="err" id={`${k}-err`}>
        {errors[k]}
      </span>
    ) : null;
  const a11y = (k: Field) => ({
    name: k,
    id: `co-${k}`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
    onBlur: blur(k),
  });

  return (
    <section className="checkout bg-paper flow" aria-labelledby="co-title">
      <div className="inner">
        <div className="sec-head">
          <div>
            <h1 id="co-title" className="title-en">
              {placed ? `Thank you, ${placed.name}` : "Checkout"}
            </h1>
          </div>
          {!placed && (
            <Link href="/cart" className="btn btn-line">
              <Arrow dir="left" /> Back to cart
            </Link>
          )}
        </div>

        {placed ? (
          <div className="co-body">
            <div className="done">
              <span className="ic">
                <Check />
              </span>
              <h2>Order {placed.no} is ready in WhatsApp</h2>
              <p>
                Press send in WhatsApp and we&apos;ll reply with your confirmed total and payment details. If WhatsApp
                didn&apos;t open, use the button below.
              </p>
              <div className="btn-row">
                <a href={placed.url} className="btn btn-forest" target="_blank" rel="noopener noreferrer">
                  <Chat /> Open WhatsApp again
                </a>
                <Link href="/shop" className="btn btn-line">
                  Back to the shop
                </Link>
              </div>
            </div>
            <OrderSummary
              title="Your order"
              lines={placed.lines}
              subtotal={placed.subtotal}
              delivery={placed.delivery}
              showItems
            />
          </div>
        ) : !ready ? (
          <div className="store-wait" aria-hidden="true" />
        ) : !lines.length ? (
          <EmptyState
            art={EMPTY_ART.checkout}
            icon={<Basket />}
            title="Nothing to check out yet"
            text="Add a few things to your cart, then come back here to place the order."
          />
        ) : (
          <form ref={formRef} className="co-body" onSubmit={onSubmit} noValidate>
            <div className="co-form">
              <fieldset>
                <legend>Your details</legend>
                <div className="grid2">
                  <div className="fld">
                    <label htmlFor="co-name">Full name</label>
                    <input {...a11y("name")} autoComplete="name" value={v.name} onChange={set("name")} />
                    {err("name")}
                  </div>
                  <div className="fld">
                    <label htmlFor="co-phone">Mobile (WhatsApp)</label>
                    <input
                      {...a11y("phone")}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      value={v.phone}
                      onChange={set("phone")}
                    />
                    {err("phone")}
                  </div>
                  <div className="fld span2">
                    <label htmlFor="co-email">
                      Email <i>optional</i>
                    </label>
                    <input
                      {...a11y("email")}
                      type="email"
                      autoComplete="email"
                      spellCheck={false}
                      value={v.email}
                      onChange={set("email")}
                    />
                    {err("email")}
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Delivery address</legend>
                <div className="grid2">
                  <div className="fld span2">
                    <label htmlFor="co-line1">House no. and street</label>
                    <input {...a11y("line1")} autoComplete="address-line1" value={v.line1} onChange={set("line1")} />
                    {err("line1")}
                  </div>
                  <div className="fld span2">
                    <label htmlFor="co-line2">
                      Area or landmark <i>optional</i>
                    </label>
                    <input {...a11y("line2")} autoComplete="address-line2" value={v.line2} onChange={set("line2")} />
                  </div>
                  <div className="fld">
                    <label htmlFor="co-city">Town or city</label>
                    <input {...a11y("city")} autoComplete="address-level2" value={v.city} onChange={set("city")} />
                    {err("city")}
                  </div>
                  <div className="fld">
                    <label htmlFor="co-pincode">Pincode</label>
                    <input
                      {...a11y("pincode")}
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={7}
                      value={v.pincode}
                      onChange={set("pincode")}
                    />
                    {err("pincode")}
                  </div>
                  <div className="fld span2">
                    <label htmlFor="co-state">State</label>
                    <select {...a11y("state")} autoComplete="address-level1" value={v.state} onChange={set("state")}>
                      {STATES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <span className="hint">
                      {delivery === null
                        ? "Outside Tamil Nadu we confirm the delivery charge on WhatsApp."
                        : `Flat ₹${DELIVERY_FEE} delivery anywhere in Tamil Nadu.`}
                    </span>
                  </div>
                  <div className="fld span2">
                    <label htmlFor="co-note">
                      Note for us <i>optional</i>
                    </label>
                    <textarea {...a11y("note")} rows={2} value={v.note} onChange={set("note")} />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Payment</legend>
                <div className="pay">
                  {PAYMENTS.map((p) => (
                    <label key={p.id} className="pay-opt">
                      <input
                        type="radio"
                        name="pay"
                        value={p.id}
                        checked={v.pay === p.id}
                        onChange={() => setV((s) => ({ ...s, pay: p.id }))}
                      />
                      <span>
                        <strong>{p.t}</strong>
                        <small>{p.d}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <OrderSummary lines={lines} subtotal={subtotal} delivery={delivery} showItems>
              <button type="submit" className="btn btn-sun sum-cta">
                <Chat /> Place order on WhatsApp
              </button>
              <p className="sum-note">Your order opens in WhatsApp, ready to send. Nothing is charged here.</p>
            </OrderSummary>
          </form>
        )}
      </div>
    </section>
  );
}
