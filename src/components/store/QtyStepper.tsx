"use client";

import { MAX_QTY, useStore } from "./StoreProvider";
import { Minus, Plus, Trash } from "../Icons";

/* − qty + ; at 1 the minus becomes a remove button so the line can be cleared from here too. */
export default function QtyStepper({ id, name, className = "" }: { id: string; name: string; className?: string }) {
  const { cart, setQty } = useStore();
  const qty = cart[id] ?? 0;
  return (
    <div className={`qty ${className}`} role="group" aria-label={`Quantity of ${name}`}>
      <button
        type="button"
        onClick={() => setQty(id, qty - 1)}
        aria-label={qty <= 1 ? `Remove ${name} from cart` : `One less ${name}`}
      >
        {qty <= 1 ? <Trash /> : <Minus />}
      </button>
      <output aria-live="polite">{qty}</output>
      <button
        type="button"
        onClick={() => setQty(id, qty + 1)}
        disabled={qty >= MAX_QTY}
        aria-label={`One more ${name}`}
      >
        <Plus />
      </button>
    </div>
  );
}
