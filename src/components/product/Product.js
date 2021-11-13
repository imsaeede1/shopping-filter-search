import styles from "./product.module.css";
import { BiTrash } from "react-icons/bi";
const Product = ({ product, onDelete, onIncrement, onDecrease }) => {
  return (
    <div className={styles.container} id="title">
      <img alt="menu" src={product.img} className={styles.containerImg} />
      <div className={styles.flextext}>
        <p className={styles.size}>{product.availableSizes}</p>
        <p className={styles.titleText}>{product.title}</p>
        <p className={styles.priceText}>${product.price}</p>
      </div>

      {/* <div className={styles.flexButton}>
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
      </div> */}
    </div>
  );
};

export default Product;

//<input className={styles.btn} onChange={onChange} value={product.title} />
