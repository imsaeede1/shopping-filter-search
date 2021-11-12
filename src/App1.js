import styles from "./app.module.css";
import Navbar from "./components/navbar/Navbar";
import ReduceProList from "./components/product/ReduceProList";
import Filter from "./components/filter/Filter";
import ReduceProvider from "./components/provider/ReduceProvider";

const App1 = () => {
  return (
    <div className={styles.container}>
      <ReduceProvider>
        <Navbar />
        <Filter />
        <ReduceProList />
      </ReduceProvider>
    </div>
  );
};

export default App1;
