import { useState } from "react";

interface Product {
  product: { title: string; price: string; image: string };
}

export function CartItem({ product }: Product) {
  const [quantity, setQuantity] = useState(1);

  function increase() {
    setQuantity(quantity + 1);
  }

  function decrease() {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  }

  return (
    <div data-testid="cart-item" className="flex justify-between mt-6">
      <div className="flex">
        <img
          className="h-20 w-20 object-cover rounded"
          src={product.image}
          alt={product.title}
        />

        <div className="mx-3">
          <h3 className="text-sm text-gray-600">{product.title}</h3>
          <div className="flex items-center mt-2">
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={() => decrease()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <span data-testid="quantity" className="text-gray-700 mx-2">
              {quantity}
            </span>
            <button
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={() => increase()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <span className="text-gray-600">${product.price}</span>
    </div>
  );
}
