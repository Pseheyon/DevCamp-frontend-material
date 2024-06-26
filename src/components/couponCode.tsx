"use client";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "./ui/use-toast";
import { Input } from "@/components/ui/input";
import {
  TsRegisterSchemaType,
  registerSchema,
} from "@/validators/signupSchema";
import { cn } from "@/lib/utils";

import { TsOrderSchemaType } from "@/validators/cartSchema"; // 필요한 타입 임포트
import { error } from "console";

interface Props {
  form: UseFormReturn<TsOrderSchemaType>;
  cartData: TsOrderSchemaType;
  setCartData: React.Dispatch<React.SetStateAction<TsOrderSchemaType>>;
}

const CouponCodeFrom: React.FC<Props> = ({ form, cartData, setCartData }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false); // 번호확인 버튼 클릭 상태
  const [isResetButtonShown, setIsResetButtonShown] = useState(false); // 초기화 버튼 표시 상태

  const extractDiscountPercent = (code: string) => {
    const regex = /(\d{1,2})%/;
    const match = code.match(regex);
    if (match) {
      return parseInt(match[1]);
    } else {
      return 0;
    }
  };

  const amoutQuantitypay =
    cartData.productInfo.price * cartData.productInfo.quantity;

  const handlePointsDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = e.target.value;
    const percent = extractDiscountPercent(numericValue);

    const maxPoints = amoutQuantitypay; // 가용한 포인트 상한값

    const clampedValue = maxPoints - maxPoints * (percent * 0.01);
    form.setValue("paymentAmount.discount", clampedValue);
    setCartData((prevCartData) => ({
      ...prevCartData,
      coupon: {
        ...prevCartData.coupon,
        couponCode: `쿠폰코드 ${clampedValue}%사용`,
      },
    }));
  };
  const handleUseDiscount = () => {
    if (cartData.paymentAmount.discount !== undefined) {
      if (isButtonClicked) return;

      const numericValue = cartData.coupon.couponCode;
      const percent = numericValue ? extractDiscountPercent(numericValue) : 0;
      const maxPoints = cartData.paymentAmount.total;

      let updatedtotal =
        cartData.paymentAmount.total - maxPoints * (percent * 0.01);
      if (numericValue !== undefined) {
        const percent = extractDiscountPercent(numericValue);
        if (updatedtotal < 1000) {
          alert("1000원 이하는 사용이 불가능합니다");
          return;
        }
      } else {
        alert("실패");
      }
      // updatedtotal이 0 밑으로 되면 total에 원래의 값 유지
      const discount = cartData.paymentAmount.total - updatedtotal;
      const isdiscount = cartData.paymentAmount.discount;
      const resetcoutn = discount + isdiscount;
      setIsButtonClicked(true);
      setIsResetButtonShown(true);
      const setDiscount = discount;
      localStorage.setItem("couponCodeDis", `${setDiscount}`);
      form.setValue("paymentAmount.total", updatedtotal);
      setCartData((prevCartData) => ({
        ...prevCartData,
        paymentAmount: {
          ...prevCartData.paymentAmount,
          total: updatedtotal,
          discount: resetcoutn,
        },
      }));
      console.log("쿠폰코드", cartData.coupon.couponCode);
    }
  };

  const handleReset = () => {
    const couponCodeDis = localStorage.getItem("couponCodeDis");
    if (
      cartData.paymentAmount.discount !== undefined &&
      couponCodeDis !== null
    ) {
      setIsButtonClicked(false);
      setIsResetButtonShown(false);
      if (!setIsResetButtonShown) {
        alert("쿠폰/포인트를 다시 적용해주세요");
        return;
      }

      const updatedtotal = amoutQuantitypay;
      const discount = cartData.paymentAmount.discount;
      const setDiscout = discount - parseInt(couponCodeDis);
      form.setValue("paymentAmount.total", updatedtotal);
      form.setValue("paymentAmount.discount", 0);

      setCartData((prevCartData) => ({
        ...prevCartData,
        paymentAmount: {
          ...prevCartData.paymentAmount,
          total: amoutQuantitypay,
          discount: setDiscout,
        },
      }));
    }
  };

  return (
    <div className="flex size-full justify-center gap-2 rounded-none w-full">
      <FormField
        control={form.control}
        name="coupon.couponCode"
        render={({ field }) => (
          <FormItem className="basis-4/5">
            <FormControl className="w-full">
              <Input
                className=" rounded-none bg-inherit border"
                placeholder="쿠폰 번호 입력"
                {...field}
                onChange={handlePointsDiscountChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isResetButtonShown ? ( // 초기화 버튼이 표시될 경우에만 보여줌
        <Button
          type="button"
          variant="secondary"
          className="basis-1/5 text-center box-border rounded-[3px]"
          onClick={handleReset}
        >
          사용 취소
        </Button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          className="basis-1/5 text-center box-border rounded-[3px]"
          onClick={handleUseDiscount}
          disabled={isButtonClicked}
        >
          번호확인
        </Button>
      )}
    </div>
  );
};
export default CouponCodeFrom;
