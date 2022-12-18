import { Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Text,
  useToast,
  View,
  WarningOutlineIcon,
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { auth } from "../../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { MainNavigation } from "../../navigation/main.navigation.type";
import { FirebaseError } from "firebase/app";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});
export default function AuthScreen({ navigation }: MainNavigation<"Auth">) {
  const toaster = useToast();
  const [isRegister, setIsRegister] = useState(false);
  const onRegister = useCallback((email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation.popToTop();
      })
      .catch((errr) => {
        toaster.show({ description: errr });
      });
  }, []);
  const onLogin = useCallback((email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation.popToTop();
      })
      .catch((errr:FirebaseError) => {
  
        console.log(errr.message);
        toaster.show({ description: errr.message });
      });
  }, []);
  const handleSubmit = useCallback(
    (email: string, password: string) => {
      if (isRegister) {
        onRegister(email, password);
      } else {
        onLogin(email, password);
      }
    },
    [isRegister]
  );
  return (
    <Box alignItems="center" flex={1} backgroundColor="white">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          handleSubmit(values.email, values.password);
        }}
        validationSchema={schema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Box w="100%">
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  type="text"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text fontSize={"sm"} color="red.500">
                    Please enter Valid emil
                  </Text>
                )}
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  placeholder="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <Text fontSize={"sm"} color="red.500">
                    Please enter minimum 6 digits password
                  </Text>
                )}
              </Stack>
            </FormControl>
            <Box m={4}>
              <Button
                size={"sm"}
                onPress={() => {
                  setIsRegister(false);
                  handleSubmit();
                }}
              >
                Log In
              </Button>

              <Button
                size={"sm"}
                mt={3}
                colorScheme="pink"
                onPress={() => {
                  setIsRegister(true);
                  handleSubmit();
                }}
              >
                Register
              </Button>
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
