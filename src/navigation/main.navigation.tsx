import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import AuthScreen from "../screen/auth/auth.screen";
import ProductAddEditScreen from "../screen/products/product-add-edit-screen";
import ProductListScreen from "../screen/products/product-list.screen";
import { useAppSelector } from "../store/hooks";
import { MainNavigationType } from "./main.navigation.type";

import {
  signOut
} from "firebase/auth";
import { auth } from "../../firebase-config";
const Stack = createNativeStackNavigator<MainNavigationType>();

function MainNavigation() {
  const authState = useAppSelector(store=> store.auth);
  const toaster = useToast()
  const logout = async()=> {
    try{
      await signOut(auth);
      toaster.show({
        description:"Log out Success"
      })
    }catch(err){
      toaster.show({
        description:"Some Error occer"
      })
    }
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={({ navigation }) => {
          return {
            title: "Products",
            headerRight: () => {
              if(authState.email){
                return (
                  <TouchableOpacity onPress={async() => logout()}>
                    <AntDesign name="logout" size={20} color="black" />
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity onPress={() => navigation.push("Auth")}>
                  <AntDesign name="login" size={20} color="black" />
                </TouchableOpacity>
              );
            },
          };
        }}
      />
      <Stack.Screen
        name="AddEdit"
        component={ProductAddEditScreen}
        options={({ route }) => {
          return {
            title: route.params ? "Update Product" : "Add Product",
          };
        }}
      />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigation;
