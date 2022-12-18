import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addProductAPI,
  deleteProductAPI,
  getProductsAPI,
  updateProductAPI,
} from "../../apis/product.api";
import { ProductModel } from "../../models/product.model";

// Define a type for the slice state
interface ProductState {
  products: ProductModel[];
  isLoadin: boolean;
}

// Define the initial state using that type
const initialState: ProductState = {
  products: [],
  isLoadin: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductModel[]>) => {
      state.products = [...action.payload];
    },
    addProduct: (state, action: PayloadAction<ProductModel>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<ProductModel>) => {
      const products = state.products;
      const index = products.findIndex((data) => data.id == action.payload.id);
      if (index >= 0) {
        products[index] = {
          ...action.payload,
          id: action.payload.id,
        };
      }
      state = {
        ...state,
        products,
      };
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((t) => t.id != action.payload);
    },

    setIsLoadin: (state, action: PayloadAction<boolean>) => {
      state.isLoadin = action.payload;
    },
  },
});

const { addProduct, deleteProduct, updateProduct, setProducts, setIsLoadin } =
  productSlice.actions;
export default productSlice.reducer;

export const addProductReducer = (product: ProductModel) => {
  return async function appProduct(dispatch: any, getState: any) {
    try {
      const data = await addProductAPI(product);
      dispatch(
        addProduct({
          ...product,
          id: data.data.name,
        })
      );
    } catch (erro) {
      console.log("ADD ERROR", erro);
    }
  };
};
export const getProductsReducer = async (dispatch: any, getState: any) => {
  dispatch(setIsLoadin(true));
  const data = await getProductsAPI();
  const transformData: ProductModel[] = [];
  for (const key in data.data) {
    transformData.push({
      ...data.data[key],
      id: key,
    });
  }
  dispatch(setIsLoadin(false));
  dispatch(setProducts(transformData));
};

export const updateProductReducer =
  (prouctId: string, product: ProductModel) =>
  async (dispatch: any, getState: any) => {
    try {
      const data = await updateProductAPI(prouctId, product);
      dispatch(
        updateProduct({
          ...product,
          id: prouctId,
        })
      );
    } catch (erro) {
      console.log("ADD ERROR", erro);
    }
  };
export const deleteProductReducer =
  (prouctId: string) => async (dispatch: any, getState: any) => {
    try {
      const data = await deleteProductAPI(prouctId);
      dispatch(deleteProduct(prouctId));
    } catch (erro) {
      console.log("ADD ERROR", erro);
    }
  };
