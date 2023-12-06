import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <li className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </li>
  );
};

export default ProductCard;
