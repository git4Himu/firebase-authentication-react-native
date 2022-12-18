import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { ProductModel } from "../models/product.model";
import { useAppSelector } from "../store/hooks";
export interface IProduct {
  product: ProductModel;
  onEdit: (product: ProductModel) => void;
}

const Product = ({ product, onEdit }: IProduct) => {
  const isLoggedIn = !!useAppSelector((state) => state.auth.email);
  return (
    <HStack space={3} m="2" background={"white"} p={3}>
      <Box>
        <Image
          size="20"
          rounded={"md"}
          source={{
            uri: product.image.length
              ? product.image
              : "https://img.icons8.com/ios/512/open-box.png",
          }}
          alt="product img"
        />
      </Box>
      <VStack>
        <HStack alignItems={"center"} justifyContent="flex-end">
          <Heading size={"md"}>{product.productName || "No Name"}</Heading>
          {isLoggedIn && (
            <Pressable onPress={() => onEdit(product)}>
              <AntDesign name="edit" size={20} color="black" />
            </Pressable>
          )}
        </HStack>
        <Text color={"gray.500"} strikeThrough>
          ₹ {product.price}
        </Text>
        <Text bold fontSize={"lg"}>
          ₹ {product.offerPrice}
        </Text>
      </VStack>
    </HStack>
  );
};

export default React.memo(Product);
