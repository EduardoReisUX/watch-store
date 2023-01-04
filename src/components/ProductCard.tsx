interface Product {
  title: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  addToCart(product: Product): void;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <section data-testid="product-card">
      <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
        <div
          data-testid="image"
          className="flex items-end justify-end h-56 w-full bg-cover"
          style={{
            backgroundImage: `url(${product.image})`,
          }}
        >
          <button
            onClick={() => addToCart(product)}
            className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4"
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
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{product.title}</h3>
        <span className="text-gray-500 mt-2">${product.price}</span>
      </div>
    </section>
  );
}
