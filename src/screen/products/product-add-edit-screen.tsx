import { Formik, useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import { MainNavigation } from "../../navigation/main.navigation.type";
import { useAppDispatch } from "../../store/hooks";
import {
  addProductReducer,
  deleteProductReducer,
  updateProductReducer,
} from "../../store/reducers/product.reducer";

export default function ProductAddEditScreen({
  navigation,
  route,
}: MainNavigation<"AddEdit">) {
  const toaster = useToast()
  const [initialParams, setInitianParams] = useState({
    productName: "",
    imageUrl: "",
    price: "",
    offerPrice: "",
  });

  const dispatch = useAppDispatch();
  const saveDate = useCallback(
    async (product: ProductModel) => {
      try{
        if (route.params) {
          
          await dispatch(updateProductReducer(route.params.id!, product));
          toaster.show({
            description: "Update successful"
          })
          return;
        }
       await dispatch(addProductReducer(product));
        toaster.show({
          description: "Add successful"
        })
      } catch(err:any){
        toaster.show({ description: err.message });
      }
     
    },
    [dispatch]
  );
  const deleteDate = useCallback(async () => {
    if (route.params) {
     await dispatch(deleteProductReducer(route.params?.id!));
     navigation.goBack();
    }
  }, [dispatch]);

  useEffect(() => {
    const params = route.params;
    if (params) {
      setInitianParams({
        productName: params.productName,
        imageUrl: params.image,
        price: params.price,
        offerPrice: params.offerPrice,
      });
    }
  }, []);

  return (
    <Box alignItems="center" flex={1} background="white">
      <Formik
        initialValues={initialParams}
        enableReinitialize={true}
        onSubmit={(values) => {
          const product = new ProductModel(
            values.productName,
            values.price,
            values.imageUrl,
            values.offerPrice
          );
          saveDate(product);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Box w="100%">
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Product Name</FormControl.Label>
                <Input
                  type="text"
                  defaultValue="12345"
                  onChangeText={handleChange("productName")}
                  onBlur={handleBlur("productName")}
                  value={values.productName}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Image Url</FormControl.Label>
                <Input
                  type="text"
                  value={values.imageUrl}
                  onChangeText={handleChange("imageUrl")}
                  onBlur={handleBlur("imageUrl")}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Price</FormControl.Label>
                <Input
                  type="text"
                  value={values.price}
                  keyboardType="decimal-pad"
                  onChangeText={handleChange("price")}
                  onBlur={handleBlur("price")}
                />
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <Stack mx="4">
                <FormControl.Label>Offer Price</FormControl.Label>
                <Input
                  type="text"
                  keyboardType="decimal-pad"
                  value={values.offerPrice}
                  onChangeText={handleChange("offerPrice")}
                  onBlur={handleBlur("offerPrice")}
                />
              </Stack>
            </FormControl>
            <Box m={4}>
              <Button size={"sm"} onPress={() => handleSubmit()}>
                {route.params ? "Update" : "Add"}
              </Button>
              {route.params && <Button
                size={"sm"}
                mt={3}
                colorScheme="danger"
                onPress={() => deleteDate()}
              >
                Delete
              </Button>}
            </Box>
          </Box>
        )}
      </Formik>
    </Box>
  );
}
