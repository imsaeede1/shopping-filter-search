import { createContext } from "react";
import { productsData } from "../../db/products";
import _ from "lodash";
import { useContext, useReducer } from "react";

const ProductContext = createContext();
const ProductContextDispatcher = createContext();

// const productsData = [
//   {
//     id: 1,
//     sku: 18644119330491312,
//     title: "Sphynx Tie Dye Grey T-Shirt",
//     quantity: 1,
//     description: "Sphynx Tie Dye Grey",
//     availableSizes: ["X", "L", "XL", "XXL"],
//     price: 10,
//     isFreeShipping: true,
//   },

//   {
//     id: 2,
//     sku: 11854078013954528,
//     title: "Danger Knife Grey T-Shirt",
//     quantity: 1,
//     description: "Danger Knife Grey",
//     availableSizes: ["X", "M", "L"],
//     price: 14.9,
//     isFreeShipping: true,
//   },

//   {
//     id: 3,
//     sku: 876661122392077,
//     title: "Sphynx Tie Dye Grey T-Shirt",
//     quantity: 1,
//     description: "Sphynx Tie Dye Grey",
//     availableSizes: ["X", "L", "XL", "XXL"],
//     price: 10,
//     isFreeShipping: true,
//   },

//   {
//     id: 4,
//     sku: 9197907543445677,
//     title: "Born On The Streets T-Shirt",
//     quantity: 1,
//     description: "Born On The Streets",
//     availableSizes: ["XL"],
//     price: 25.9,
//     isFreeShipping: true,
//   },

//   {
//     id: 5,
//     sku: 10547961582846888,
//     title: "Tso 3D Short Sleev T-Shirt",
//     quantity: 1,
//     description: "Tso 3D Short Sleev",
//     availableSizes: ["X", "L", "XL"],
//     price: 10.9,
//     isFreeShipping: false,
//   },
//   {
//     id: 6,
//     sku: 6090484789343891,
//     title: "Man Tie Dye Cinza Grey T-Shirt",
//     quantity: 1,
//     description: "Man Tie Dye Cinza Grey",
//     availableSizes: ["XL", "XXL"],
//     price: 49.9,
//     isFreeShipping: false,
//   },

//   {
//     id: 7,
//     sku: 18532669286405342,
//     title: "Crazy Monkey Black T-Shirt",
//     quantity: 1,
//     description: "1977 Infantil",
//     availableSizes: ["S"],
//     style: "Preto com listras brancas",
//     price: 22.5,
//     isFreeShipping: true,
//   },

//   {
//     id: 8,
//     sku: 5619496040738316,
//     title: "Tso 3D black T-Shirt",
//     quantity: 1,
//     description: "",
//     availableSizes: ["Xl"],
//     style: "Azul escuro",
//     price: 18.7,
//     isFreeShipping: false,
//   },

//   {
//     id: 9,
//     sku: 11600983276356165,
//     title: "Crazy Monkey Gray",
//     quantity: 1,
//     description: "",
//     availableSizes: ["S"],
//     style: "Preto com listras brancas",
//     price: 22.5,
//     isFreeShipping: true,
//   },
// ];

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
