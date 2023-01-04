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
          ></button>
        </div>
      </div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{product.title}</h3>
        <span className="text-gray-500 mt-2">${product.price}</span>
      </div>
    </section>
  );
}
