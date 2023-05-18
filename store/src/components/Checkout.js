import React from "react";
import '../style/Checkout.css';



function Checkout({ cartItems, onCheckout }) {
//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
const subtotal = 100;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="checkout-container">
      <h2>Cart</h2>
      <ul className="cart-items">
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <div className="totals">
        <div>
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div>
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div>
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button className="checkout-button" onClick={onCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default Checkout;

