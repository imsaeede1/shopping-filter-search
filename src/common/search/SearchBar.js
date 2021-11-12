import { useState } from "react";
import { useProductAction } from "../../components/provider/ReduceProvider";
import styles from "./search.module.css";

const SearchBar = ({ filter }) => {
  const dispatch = useProductAction();
  const [value, setValue] = useState("");

  const changeHandler = (e) => {
    dispatch({ type: "filterSize", selectedOption: filter });
    dispatch({ type: "search", event: e });
    setValue(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder="Search for..."
        onChange={changeHandler}
        className={styles.container}
      />
    </div>
  );
};

export default SearchBar;
