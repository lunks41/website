import { createContext, useEffect, useState, useContext } from "react";

import { getCarts } from "@/api/cart";

import { AuthContext } from "./AuthContext";

import { getUserAddress } from "@/api/address";

export const CartContext = createContext({});

const CartContextProvider = (props: any) => {
  const [count, setCount] = useState(0);
  const [carts, setCarts] = useState<any>([]);
  const [tax, setTax] = useState<any>({});
  const [selectedAddress, setSelectedAddress] = useState<any>({});
  const [cateringDetails, setCateringDetails] = useState<any>({});
  const { isAuthenticated } = useContext<any>(AuthContext);
  const [totalInfo, setTotalInfo] = useState<any>({
    totalMaxPrice: "",
    totalSellingPrice: "",
    voucherDiscount: 0,
  });

  const updateCart = async () => {
    const res: any = await getCarts();
    setCarts(res.data?.carts || []);
    setTax(res.data?.tax || {});
    setCount(res.data?.carts.length || 0);
    setTotalInfo({
      totalMaxPrice: res.data?.totalMaxPrice,
      totalSellingPrice: res.data?.totalSellingPrice,
      voucherDiscount: res.data?.voucherDiscount,
    });
  };

  const getAddress = async () => {
    const res: any = await getUserAddress();
    setSelectedAddress(res.data ? res?.data[0] : []);
  };

  useEffect(() => {
    if (isAuthenticated) {
      updateCart();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const oldOptions = JSON.parse(localStorage.getItem("catering") || "{}");
    const newOptions = { ...oldOptions, ...cateringDetails };
    localStorage.setItem("catering", JSON.stringify(newOptions));
  }, [cateringDetails]);

  return (
    <CartContext.Provider
      value={{
        count,
        carts,
        tax,
        updateCart,
        getAddress,
        selectedAddress,
        setSelectedAddress,
        totalInfo,
        setCateringDetails,
        cateringDetails,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
