import Axios from "../axios";
import { ProductModel } from "../models/product.model";
export function addProductAPI(product: ProductModel) {
  return Axios.post<{ name: string }>("product.json", product);
}
export function updateProductAPI(id: string, product: ProductModel) {
  return Axios.put<{ name: string }>("product/" + id + ".json", product);
}
export function deleteProductAPI(id: string) {
  return Axios.delete<{ name: string }>("product/" + id + ".json");
}
export function getProductsAPI() {
  return Axios.get<{
    [id: string]: ProductModel;
  }>("product.json");
}
