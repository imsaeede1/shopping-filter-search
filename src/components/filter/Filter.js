import { useState } from "react";
import Select from "react-select";
import SearchBar from "../../common/search/SearchBar";
import { useProductAction } from "../provider/ReduceProvider";
import styles from "./filter.module.css";

const filterOptions = [
  { value: "", label: "All" },
  { value: "S", label: "S" },
  { value: "X", label: "X" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const sortoptions = [
  { value: "lowest", label: "lowest" },
  { value: "highest", label: "highest" },
];

const Filter = () => {
  const dispatch = useProductAction();
  const [filter, setfilter] = useState("");
  const [sort, setSort] = useState("");

  const filterHandler = (selectedOption) => {
    dispatch({ type: "filterSize", selectedOption });
    dispatch({ type: "sort", selectedOption: sort });
    setfilter(selectedOption);
  };

  const sortHandler = (selectedOption) => {
    dispatch({ type: "sort", selectedOption });
    setSort(selectedOption);
  };
  return (
    <div className={styles.container}>
      <SearchBar filter={filter} />
      <div>
        order by size:
        <Select
          value={filter}
          onChange={filterHandler}
          options={filterOptions}
          className={styles.filterSelect}
        />
      </div>
      <div>
        sort by price:
        <Select
          value={sort}
          onChange={sortHandler}
          options={sortoptions}
          className={styles.filterSelect}
        />
      </div>
    </div>
  );
};

export default Filter;
// {/* <select onChange={changeHandler} value={value}>
// <option value=""> All</option>
// <option value="X"> X</option>
// <option value="S"> S</option>
// <option value="M"> M</option>
// <option value="L"> L</option>
// <option value="XL"> XL</option>
// <option value="XXL"> XXL</option>
// </select> */}
