import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../../firebase-config";
import { useAppDispatch } from "../store/hooks";
import { authenticate, logout } from "../store/reducers/auth.reducer";
import MainNavigation from "./main.navigation";

export default function Navigation() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user: any) => {
    
      
      if (user) {
        console.log("User", user);
        dispatch(
          authenticate({
            email: user.email!,
            token: user.stsTokenManager.accessToken,
          })
        );
        console.log("Afer", );
      } else {
        dispatch(logout());
      }
    });
   return sub;
  }, [auth]);
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
}
