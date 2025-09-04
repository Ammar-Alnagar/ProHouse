import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../api';

function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiGet(`/product/${id}`)
      .then((data) => {
        if (mounted) {
          setProduct(data.product);
          setError('');
        }
      })
      .catch((e) => setError(e.message || 'Failed to load'))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="container text-white py-5">Loading...</div>;
  if (error) return <div className="container text-danger py-5">{error}</div>;
  if (!product) return null;

  return (
    <div className="container text-white py-5">
      <h2>{product.name}</h2>
      <p className="text-secondary">{product.description}</p>
      <div className="d-flex flex-wrap gap-3 my-3">
        {product.images?.map((img) => (
          <img key={img.public_id} src={img.url} alt={product.name} style={{ maxWidth: 200, borderRadius: 8 }} />
        ))}
      </div>
      <div className="my-2">Price: <strong>${product.price}</strong></div>
      <div className="my-2">Stock: <strong>{product.stock}</strong></div>
      <button className="btn btn-primary mt-3" onClick={() => {
        const saved = JSON.parse(localStorage.getItem('cart') || '[]');
        const existing = saved.find(i => i._id === product._id);
        if (existing) existing.quantity += 1; else saved.push({ _id: product._id, name: product.name, price: product.price, image: product.images?.[0]?.url, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(saved));
        alert('Added to cart');
      }}>Add to cart</button>
    </div>
  );
}

export default ProductDetails;
