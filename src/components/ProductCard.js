import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card bg-black-100 text-white" style={{ width: 280 }}>
      <div className="rounded overflow-hidden">
        {product.images?.[0]?.url ? (
          <img src={product.images[0].url} alt={product.name} className="card-img-top" />
        ) : null}
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-secondary" style={{ minHeight: 40 }}>{product.description?.slice(0, 80)}...</p>
        <div className="d-flex justify-content-between align-items-center">
          <span>${product.price}</span>
          <div className="d-flex gap-2">
            <Link to={`/product/${product._id}`} className="btn btn-primary">View</Link>
            <button className="btn btn-outline-light" onClick={() => {
              const saved = JSON.parse(localStorage.getItem('cart') || '[]');
              const existing = saved.find(i => i._id === product._id);
              if (existing) existing.quantity += 1; else saved.push({ _id: product._id, name: product.name, price: product.price, image: product.images?.[0]?.url, quantity: 1 });
              localStorage.setItem('cart', JSON.stringify(saved));
              alert('Added to cart');
            }}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
