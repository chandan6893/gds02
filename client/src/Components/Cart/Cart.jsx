import React, { useState } from "react";
import "./Style/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image:
        "https://i.pinimg.com/originals/03/61/91/036191319d23b0066d819c259b63ecc2.jpg",
      name: "Naturing",
      price: 49.99,
      quantity: 1,
      description: "20g protein per scoop for muscle building and energy.",
      previousPrice: 54.99,
      discountedPrice: 49.99,
    },
    // {
    //     id: 3,
    //     image:
    //       "https://klimatkontrole.lv/e-catalog/files/resized/products/okay-food29.700x800.jpg",
    //     name: "Chobani Oats",
    //     price: 39.99,
    //     quantity: 1,
    //     description: "20g protein per scoop for muscle building and energy.",
    //     previousPrice: 44.99,
    //     discountedPrice: 39.99,
    //   },
    //   {
    //     id: 3,
    //     image:
    //       "https://shop.gdswellness.com/wp-content/uploads/2024/06/HK-Vitals-Women-Protein-1.png",
    //     name: "HK Vitals Women Protein",
    //     price: 49.99,
    //     quantity: 1,
    //     description: "20g protein per scoop for muscle building and energy.",
    //     previousPrice: 54.99,
    //     discountedPrice: 49.99,
    //   },
  ]);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  // Calculate subtotal and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <img className="productImage" src={item.image} alt="" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Previous price: ${item.previousPrice}</p>
                <p>Discounted price: ${item.discountedPrice}</p>
              </div>
            </div>

            {/* <div className="item-price">${item.price.toFixed(2)}</div> */}
            <div className="item-quantity">
              <button onClick={() => removeItem(item.id)}>Remove item</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>CART TOTALS</h2>
        <div className="cart-totals">
          <div className="subtotal">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="total">
            <span>Total</span>
            <span>${total.toFixed(2)} USD</span>
          </div>
        </div>
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
