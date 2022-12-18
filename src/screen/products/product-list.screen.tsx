import { AntDesign } from "@expo/vector-icons";
import { Box, Center, Fab, FlatList, Icon, Text, View } from "native-base";
import { useCallback, useEffect } from "react";
import Product from "../../components/product";
import { ProductModel } from "../../models/product.model";
import { MainNavigation } from "../../navigation/main.navigation.type";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductsReducer } from "../../store/reducers/product.reducer";

export default function ProductListScreen({
  navigation,
}: MainNavigation<"ProductList">) {
  const isLoggedIn = !!useAppSelector((state) => state.auth.email);
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductsReducer);
  }, []);
  const onEdintProduct = useCallback(
    (product: ProductModel) => {
      navigation.navigate("AddEdit", product);
    },
    [navigation]
  );
  return (
    <View flex={1}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Product onEdit={onEdintProduct} product={item} />
        )}
      />
      {isLoggedIn && (
        <Fab
          onPress={() => navigation.push("AddEdit")}
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        />
      )}
    </View>
  );
}
