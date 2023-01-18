import { Product } from "../hooks/useFetchProducts";
import { useCartStore } from "../store/cart";

interface CartItemProps {
  product: Product;
}

export function CartItem({ product }: CartItemProps) {
  const {
    actions: { remove, increase, decrease },
  } = useCartStore();

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
          <button className="text-xs font-bold" onClick={() => remove(product)}>
            Remove
          </button>
          <div className="flex items-center mt-2">
            <button
              data-testid="decrease-btn"
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={() => decrease(product)}
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
              {product.quantity}
            </span>
            <button
              data-testid="increase-btn"
              className="text-gray-500 focus:outline-none focus:text-gray-600"
              onClick={() => increase(product)}
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
