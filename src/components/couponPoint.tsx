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

interface Props {
  form: UseFormReturn<TsOrderSchemaType>;
  cartData: TsOrderSchemaType;
  setCartData: React.Dispatch<React.SetStateAction<TsOrderSchemaType>>;
}

const CouponPointFrom: React.FC<Props> = ({ form, cartData, setCartData }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isResetButtonShown, setIsResetButtonShown] = useState(false);

  const amoutQuantitypay =
    cartData.productInfo.price * cartData.productInfo.quantity;
  const total = cartData.paymentAmount.total;

  const handlePointsUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.trim();
    if (!inputVal) {
      return;
    }
    const numericValue: number = parseFloat(inputVal);

    if (isNaN(numericValue)) {
      // 변환된 값이 NaN인 경우에 대한 처리
      alert("숫자를 입력해주세요.");
      return;
    }
    if (numericValue > (amoutQuantitypay || total)) {
      alert(`현재 총 금액이 쿠폰보다 적으므로 사용이 불가능 합니다.`);
      form.setValue("coupon.couponPoint", 0);
      return;
    }

    if (numericValue > (amoutQuantitypay || total)) {
      alert(
        `현재 총 금액이 쿠폰보다 적으므로 사용이 불가능 합니다.chang값${numericValue}`
      );
      form.setValue("coupon.couponPoint", 0);
      return;
    } else if (total < 0) {
      alert(`현재금액이 0 원이므로 사용이 불가능 합니다.`);
      return;
    } else if (numericValue < 0) {
      alert(`할인 금액이 0보다 낮아 구매가 불가능 합니다.`);
      return;
    }
    if (cartData.paymentAmount.discount !== undefined) {
      const discount = cartData.paymentAmount.discount;
      const setDiscout = discount + numericValue;
      form.setValue("coupon.couponPoint", numericValue);
      form.setValue("paymentAmount.discount", discount);

      setCartData((prevCartData) => ({
        ...prevCartData,
        coupon: {
          ...prevCartData.coupon,
          couponPoint: numericValue,
        },
        // paymentAmount: {
        //   ...prevCartData.paymentAmount,
        //   discount: setDiscout,
        // },
      }));
    }
  };

  const handleUseAllPoints = () => {
    if (
      cartData.coupon &&
      cartData.coupon.couponPoint &&
      cartData.paymentAmount.discount !== undefined
    ) {
      const cartPoint = cartData.coupon.couponPoint;
      if (cartPoint > (amoutQuantitypay || total)) {
        alert(
          `현재 총 금액이 쿠폰보다 적으므로 사용이 불가능 합니다.${cartPoint}`
        );
        return;
      } else if (total < 0) {
        alert(`현재금액이 0 원이므로 사용이 불가능 합니다.`);
        return;
      } else if (cartPoint < 0) {
        alert(`할인 금액이 0보다 낮아 구매가 불가능 합니다.`);
        return;
      }

      const discount = cartData.coupon.couponPoint;
      const isdiscount = cartData.paymentAmount.discount;
      const resetcoutn = discount + isdiscount;
      const updatedtotal =
        cartData.paymentAmount.total - cartData.coupon.couponPoint;
      form.setValue("paymentAmount.total", updatedtotal);
      form.setValue("paymentAmount.discount", discount);
      const setDiscount = discount;
      localStorage.setItem("couponPointDis", `${setDiscount}`);
      setIsResetButtonShown(true);
      setIsButtonClicked(true);

      setCartData((prevCartData) => ({
        ...prevCartData,
        paymentAmount: {
          ...prevCartData.paymentAmount,
          total: updatedtotal,
          discount: resetcoutn,
        },
      }));
      alert(`쿠폰이 적용되었습니다`);
    } else {
    }

    console.log("포인트 사용 확인", cartData.coupon.couponPoint);
  };

  const handleReset = () => {
    const couponPointDis = localStorage.getItem("couponPointDis");
    if (
      cartData.coupon.couponPoint &&
      cartData.paymentAmount.discount !== undefined &&
      couponPointDis !== null
    ) {
      setIsButtonClicked(false);
      setIsResetButtonShown(false);

      const updatedtotal = amoutQuantitypay;
      const discount = cartData.paymentAmount.discount;
      const setDiscout = discount - parseInt(couponPointDis);
      form.setValue("paymentAmount.total", updatedtotal);
      setCartData((prevCartData) => ({
        ...prevCartData,
        paymentAmount: {
          ...prevCartData.paymentAmount,
          total: updatedtotal,
          discount: setDiscout,
        },
      }));
    }
  };

  return (
    <div className="flex size-full justify-center gap-2 rounded-none w-full">
      <FormField
        control={form.control}
        name="coupon.couponPoint"
        render={({ field }) => (
          <FormItem className="basis-4/5">
            <FormControl className="w-full">
              <Input
                className="rounded-none bg-inherit border"
                placeholder="0"
                {...field}
                onChange={(e) => {
                  field.onChange(e); // react-hook-form이 제공하는 onChange 이벤트 핸들러 호출
                  handlePointsUsedChange(e); // 추가적인 처리를 위해 사용자 정의 핸들러 호출
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {isResetButtonShown ? (
        <Button
          type="button"
          variant="secondary"
          className="basis-1/5 text-center box-border rounded-[3px]"
          onClick={handleReset}
        >
          초기화
        </Button>
      ) : (
        <Button
          type="button"
          variant="secondary"
          className="basis-1/5 text-center box-border rounded-[3px]"
          onClick={handleUseAllPoints}
          disabled={isButtonClicked}
        >
          사용
        </Button>
      )}
    </div>
  );
};

export default CouponPointFrom;
