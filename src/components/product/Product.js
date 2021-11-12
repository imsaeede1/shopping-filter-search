import styles from "./product.module.css";
import { BiTrash } from "react-icons/bi";
const Product = ({ product, onDelete, onIncrement, onDecrease }) => {
  // const addToCard =()=>{
  //   const products = {title : product.title, price: product.price}
  //   setCardItem((currState) => {
  //     return{...currState, products}
  //   })
  // }

  return (
    <div className={styles.container} id="title">
      <p>{product.title}</p>
      <p>{product.price}</p>
      <span className={styles.quant}>{product.quantity}</span>
      <button className={`${styles.btn} ${styles.inc}`} onClick={onIncrement}>
        +
      </button>
      <button
        className={`${styles.btn} ${product.quantity === 1 && styles.remove}`}
        onClick={onDecrease}
      >
        {product.quantity > 1 ? "-" : <BiTrash />}
      </button>
      <button className={styles.btn} onClick={onDelete}>
        Delete
      </button>
      {/* <button onClick={addToCard}>add to card</button> */}
    </div>
  );
};

export default Product;

//<input className={styles.btn} onChange={onChange} value={product.title} />
