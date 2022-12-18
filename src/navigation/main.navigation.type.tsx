import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductModel } from "../models/product.model";
export type MainNavigationType = {
  ProductList: undefined;
  Auth: undefined;
  AddEdit: ProductModel | undefined;
};
export type MainNavigation<Screen extends keyof MainNavigationType> =
  NativeStackScreenProps<MainNavigationType, Screen>;
