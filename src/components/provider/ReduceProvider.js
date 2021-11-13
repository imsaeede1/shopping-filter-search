import { createContext } from "react";
import { productsData } from "../../db/products";
import _ from "lodash";
import { useContext, useReducer } from "react";

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "incrementHandler": {
      const index = state.findIndex((p) => p.id === action.id);
      const product = { ...state[index] };
      product.quantity++;
      const updatedProducts = [...state];
      updatedProducts[index] = product;
      return updatedProducts;
    }

    case "decrementHandler": {
      const index = state.findIndex((p) => p.id === action.id);
      const product = { ...state[index] };
      if (product.quantity === 1) {
        const filterProduct = state.filter((p) => p.id !== action.id);
        return filterProduct;
      } else {
        const updatedProducts = [...state];
        product.quantity--;
        updatedProducts[index] = product;
        return updatedProducts;
      }
    }

    case "deleteHandler": {
      const filterProduct = state.filter((p) => p.id !== action.id);
      return filterProduct;
    }

    case "filterSize": {
      if (action.selectedOption.value === "") {
        return productsData;
      } else {
        const updatedProducts = productsData.filter(
          (p) => p.availableSizes.indexOf(action.selectedOption.value) >= 0
        );
        return updatedProducts;
      }
    }

    case "sort": {
      const products = [...state];
      if (action.selectedOption.value === "lowest") {
        return _.orderBy(products, ["price"], ["asc"]);
      } else {
        return _.orderBy(products, ["price"], ["desc"]);
      }
    }
    case "search": {
      if (action.event.target.value === "") {
        return productsData;
      } else {
        const updatedProducts = productsData.filter((p) =>
          p.title
            .toLowerCase()
            .includes(action.event.target.value.toLowerCase())
        );
        return updatedProducts;
      }
    }

    default:
      return state;
  }
};

const ReduceProvider = ({ children }) => {
  const [products, dispatch] = useReducer(reducer, productsData);
  return (
    <div>
      <ProductContext.Provider value={products}>
        <ProductContextDispatcher.Provider value={dispatch}>
          {children}
        </ProductContextDispatcher.Provider>
      </ProductContext.Provider>
    </div>
  );
};

export default ReduceProvider;

export const useProduct = () => useContext(ProductContext);
export const useProductAction = () => useContext(ProductContextDispatcher);
