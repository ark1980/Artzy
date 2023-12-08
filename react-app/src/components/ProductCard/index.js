import { NavLink } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <li className="product-card">
      <NavLink to={`/products/${product.id}`}>
        <h2>{product.name}</h2>
      </NavLink>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>stars :{product.stars}</p>
    </li>
  );
};

export default ProductCard;
