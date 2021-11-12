import styles from "./navbar.module.css";
import { useProduct } from "../provider/ReduceProvider";
const Navbar = ({ totalProducts }) => {
  const products = useProduct();
  totalProducts = products.filter((p) => p.quantity > 0).length;
  return <div className={styles.nav}>Shopping : {totalProducts}</div>;
};

export default Navbar;
