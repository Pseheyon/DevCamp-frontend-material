"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TsOrderSchemaType, orderSchema } from "@/validators/cartSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mockCartData } from "@/app/api/cart/route";
import { number, z } from "zod";
import Image from "next/image";
import { Children, useEffect, useState } from "react";
import { Divide } from "lucide-react";
import { date } from "zod";
import CouponCodeFrom from "@/components/couponCode";
import CouponPointFrom from "@/components/couponPoint";
import CouponPointUsedFrom from "@/components/couponPointUsed";

//type TsOrderSchemaType = z.infer<typeof orderSchema>;

export default function Cart() {
  const [cartData, setCartData] = useState(mockCartData[0]);
  const [editedUser, setEditedUser] = useState({
    username: cartData.user.username,
    email: cartData.user.email,
    phoneNumber: cartData.user.phoneNumber,
  });
  const [shippingInfoe, setshippingInfoe] = useState({
    address: cartData.shippingInfo.address,
    shippingType: cartData.shippingInfo.shippingType,
    recipient: cartData.shippingInfo.recipient,
    recipientphone: cartData.shippingInfo.recipientphone,
  });
  const [isUserEditMode, setUserEditMode] = useState(false);
  const [isShippingEditMode, setShippingEditMode] = useState(false);

  const form = useForm<TsOrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      user: {
        username: cartData?.user.username || "",
        email: cartData?.user.email || "",
        phoneNumber: cartData?.user.phoneNumber || "",
      },
      productInfo: {
        productname: cartData?.productInfo.productname || "",
        productdetail: cartData?.productInfo.productdetail || "",
        price: cartData?.productInfo.price || 0,
        quantity: cartData?.productInfo.quantity || 1,
      },
      shippingInfo: {
        address: cartData?.shippingInfo.address || "",
        shippingType: cartData?.shippingInfo.shippingType || "",
        recipient: cartData?.shippingInfo.recipient || "",
        recipientphone: cartData?.shippingInfo.recipientphone || "",
      },
      coupon: {
        couponPoint: cartData?.coupon.couponPoint || 0,
        couponCode: cartData?.coupon.couponCode || "",
        pointsUsed: cartData?.coupon.pointsUsed || 0,
      },
      paymentAmount: {
        discount: cartData?.paymentAmount.discount || 0,
        total: cartData?.paymentAmount.total || 0,
      },
      paymentMethod: {
        payment: cartData?.paymentMethod.payment || "",
        depositor: cartData?.paymentMethod.depositor || "",
      },
      purchaseAgreement: {
        termsAndConditions:
          cartData?.purchaseAgreement.termsAndConditions || true,
        privacyPolicy: cartData?.purchaseAgreement.privacyPolicy || true,
      },
    },
  });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  //   reset,
  //   setError,
  // } = useForm<TsOrderSchemaType>({
  //   resolver: zodResolver(orderSchema),
  // });

  //수량변경
  const handleQuantityChange = (newQuantity: number) => {
    // 수량이 1 미만으로 내려가지 않도록 체크
    const updatedQuantity = Math.max(newQuantity, 1);
    const updatedtotal = cartData.productInfo.price * newQuantity;
    form.setValue("productInfo.quantity", updatedQuantity);
    form.setValue("paymentAmount.total", updatedtotal);

    setCartData((prevCartData) => ({
      ...prevCartData,
      productInfo: {
        ...prevCartData.productInfo,
        quantity: updatedQuantity,
      },
      paymentAmount: {
        ...prevCartData.paymentAmount,
        total: updatedtotal,
      },
    }));
  };

  const handleUserEditClick = () => {
    setUserEditMode(true);
  };

  const handleUserSaveClick = () => {
    setCartData((prevCartData) => ({
      ...prevCartData,
      user: editedUser,
    }));
    setUserEditMode(false);
  };

  const handleShippingEditClick = () => {
    setShippingEditMode(true);
  };

  const handleShippingSaveClick = () => {
    setCartData((prevCartData) => ({
      ...prevCartData,
      shippingInfo: shippingInfoe,
    }));
    setShippingEditMode(false);
  };
  console.log(form.watch());
  const getPoint = Math.round(cartData.paymentAmount.total / 100);

  const amoutQuantitypay =
    cartData.productInfo.price * cartData.productInfo.quantity;

  //포인트사용
  const handlePointsUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseFloat(e.target.value);

    const minPoints = 5000;
    const maxPoints = amoutQuantitypay; // 가용한 포인트 상한값

    const clampedValue = Math.max(
      maxPoints - Math.max(minPoints, numericValue),
      0
    );

    setCartData((prevCartData) => ({
      ...prevCartData,
      coupon: {
        ...prevCartData.coupon,
        couponPoint: clampedValue,
      },
    }));
  };

  // 쿠폰 코드에서 할인 퍼센트를 추출하는 함수
  const extractDiscountPercent = (code: string) => {
    const regex = /(\d{1,2})%/;
    const match = code.match(regex);
    if (match) {
      return parseInt(match[1]);
    } else {
      return 0;
    }
  };

  //쿠폰형 데이터
  const handlePointsDiscountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = e.target.value;
    const percent = extractDiscountPercent(numericValue);

    const maxPoints = amoutQuantitypay; // 가용한 포인트 상한값

    const clampedValue = maxPoints - maxPoints * (percent * 0.01);

    setCartData((prevCartData) => ({
      ...prevCartData,
      coupon: {
        ...prevCartData.coupon,
        couponCode: `쿠폰코드 ${clampedValue}%사용`,
      },
    }));
  };

  const user = cartData.user.username;
  const amount = cartData.paymentAmount.total;
  const orderId = Math.random().toString(36).slice(2);
  const orderName = cartData.productInfo.productname;

  const onSubmit = async (data: TsOrderSchemaType) => {
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      alert("잘못된 접rms입니다.");
    }

    alert(JSON.stringify(data, null, 4));
  };

  return (
    <main className="grid justify-center ">
      <Form {...form}>
        <h3 className=" p-4 box-border text-center font-extrabold text-lg pb-8 ">
          결제하기
        </h3>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-4 justify-center justify-self-center gap-4 min-h-dvh rounded-none  box-border w-[100%] "
        >
          <Card className=" col-span-3 rounded-none bg-inherit border-none">
            <Card className=" mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">주문 상품 정보</CardTitle>
              <CardContent className="flex flex-row  ">
                <div>
                  <Image
                    src="/cat.jpg"
                    alt="제품 이미지"
                    width={100}
                    height={20}
                    className="w-auto h-auto"
                  ></Image>
                </div>
                <div className="px-4 box-border w-full">
                  {/* 상품명 */}
                  <FormField
                    control={form.control}
                    name="productInfo.productname"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <h6 className="font-bold">
                            {cartData.productInfo.productname}
                          </h6>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex text-slate-400 text-xs pb-2  h-10  ">
                    {/* 상품정보 */}
                    <FormField
                      control={form.control}
                      name="productInfo.productdetail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl className="flex justify-center">
                            <>
                              <Button
                                type="button"
                                size="icon"
                                variant="secondary"
                                className=" box-border h-min mr-1"
                              >
                                정보
                              </Button>
                              <span className="mr-1">
                                {cartData.productInfo.productdetail}
                              </span>
                            </>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* 구매수량 */}
                    <FormField
                      control={form.control}
                      name="productInfo.productname"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex justify-center self-stretch mt-1">
                              (수량)
                              <span className=" box-border  text-center self-stretch ">
                                - {cartData.productInfo.quantity}
                              </span>
                              <span>마리</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex  text-xs pb-2 w-full h-10 justify-between h-10px items-center">
                    {/* 가격 */}
                    <FormField
                      control={form.control}
                      name="productInfo.price"
                      render={({ field }) => (
                        <FormItem className="basis-4/5">
                          <FormControl>
                            <p className=" text-base text font-black ">
                              반려묘 가격
                              <span>{cartData.productInfo.price}</span> 만원
                            </p>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentAmount.total"
                      render={({ field }) => (
                        <FormItem className="basis-1/5">
                          <FormControl>
                            <div className="flex justify-center self-stretch mt-1 text text-indigo-400 font-black text-xl">
                              (수량)
                              <span className=" box-border  text-center self-stretch text text-indigo-400 font-black text-xl">
                                {cartData.productInfo.quantity}
                              </span>
                              <span>마리</span>
                            </div>
                          </FormControl>
                          <FormMessage />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text flex text-indigo-400 font-black text-xl basis-1/5">
                      <span>{amoutQuantitypay}</span> 만원
                    </p>
                    {/* 구매 수량 + 버튼
                    <FormField
                      control={form.control}
                      name="productInfo.quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex justify-center self-stretch mt-1 h-sss">
                              <Button
                                variant="secondary"
                                type="button"
                                className=" rounded-none box-border size-px px-2 py-2"
                                onClick={() =>
                                  handleQuantityChange(
                                    cartData.productInfo.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <span
                                className=" box-border  text-center self-stretch  p-1"
                                {...field}
                              >
                                {cartData.productInfo.quantity}
                              </span>
                              <Button
                                variant="secondary"
                                type="button"
                                className=" rounded-none box-border size-px px-2 py-2 "
                                onClick={() =>
                                  handleQuantityChange(
                                    cartData.productInfo.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    /> */}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className=" mt-4 boder rounded-none shadow-sm border">
              <CardTitle className="p-4 pt-5  font-black">
                주문자 정보
              </CardTitle>

              <CardContent className="flex flex-row w-full justify-between">
                <div>
                  <FormField
                    control={form.control}
                    name="user.username"
                    render={({ field }) => (
                      <div className="flex">
                        <FormItem>
                          <FormControl>
                            {isUserEditMode ? (
                              <Input
                                value={editedUser.username}
                                onChange={(e) => {
                                  setEditedUser((prevUser) => ({
                                    ...prevUser,
                                    username: e.target.value,
                                  }));
                                  form.setValue(
                                    "user.username",
                                    e.target.value
                                  );
                                }}
                              />
                            ) : (
                              <p className="text-slate-500" {...field}>
                                {cartData.user.username}
                              </p>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user.email"
                    render={({ field }) => (
                      <FormItem>
                        {isUserEditMode ? (
                          <Input
                            {...field}
                            value={editedUser.email}
                            onChange={(e) => {
                              setEditedUser((prevUser) => ({
                                ...prevUser,
                                email: e.target.value,
                              }));
                              form.setValue("user.email", e.target.value);
                            }}
                          />
                        ) : (
                          <p className="text-slate-500">
                            {cartData.user.email}
                          </p>
                        )}
                        <FormMessage className="m-5" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="user.phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        {isUserEditMode ? (
                          <Input
                            {...field}
                            value={editedUser.phoneNumber}
                            onChange={(e) => {
                              setEditedUser((prevUser) => ({
                                ...prevUser,
                                phoneNumber: e.target.value,
                              }));
                              form.setValue("user.phoneNumber", e.target.value);
                            }}
                          />
                        ) : (
                          <p className="text-slate-500">
                            {cartData.user.phoneNumber}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  {isUserEditMode ? (
                    <Button
                      variant="secondary"
                      type="button"
                      className="rounded-[3px]"
                      onClick={handleUserSaveClick}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-[3px]"
                      onClick={handleUserEditClick}
                    >
                      수정
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className=" mt-4 boder rounded-none shadow-sm border ">
              <CardTitle className="p-4 pt-5 ">배송 정보</CardTitle>
              <CardContent className="flex flex-row w-full justify-between">
                {/*배송자 명*/}
                <div>
                  <FormField
                    control={form.control}
                    name="shippingInfo.recipient"
                    render={({ field }) => (
                      <FormItem>
                        {isShippingEditMode ? (
                          <Input
                            value={shippingInfoe.recipient}
                            onChange={(e) => {
                              setshippingInfoe((prevUser) => ({
                                ...prevUser,
                                recipient: e.target.value,
                              }));
                              form.setValue(
                                "shippingInfo.recipient",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <h5 className="font-bold" {...field}>
                            {cartData.shippingInfo.recipient}
                          </h5>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*배송자 번호*/}
                  <FormField
                    control={form.control}
                    name="shippingInfo.recipientphone"
                    render={({ field }) => (
                      <FormItem>
                        {isShippingEditMode ? (
                          <Input
                            value={shippingInfoe.recipientphone}
                            onChange={(e) => {
                              setshippingInfoe((prevUser) => ({
                                ...prevUser,
                                recipientphone: e.target.value,
                              }));
                              form.setValue(
                                "shippingInfo.recipientphone",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <p className="text-slate-500" {...field}>
                            {cartData.shippingInfo.recipientphone}
                          </p>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/*배송자 주소*/}
                  <FormField
                    control={form.control}
                    name="shippingInfo.address"
                    render={({ field }) => (
                      <FormItem {...field}>
                        {isShippingEditMode ? (
                          <Input
                            value={shippingInfoe.address}
                            onChange={(e) => {
                              setshippingInfoe((prevUser) => ({
                                ...prevUser,
                                address: e.target.value,
                              }));
                              form.setValue(
                                "shippingInfo.address",
                                e.target.value
                              );
                            }}
                          />
                        ) : (
                          <h6>{cartData.shippingInfo.address}</h6>
                        )}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  {isShippingEditMode ? (
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-[3px]"
                      onClick={handleShippingSaveClick}
                    >
                      저장
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-[3px]"
                      onClick={handleShippingEditClick}
                    >
                      변경
                    </Button>
                  )}
                </div>
              </CardContent>
              {/* <CardContent> */}
              {/*배송 메모*/}
              <FormField
                control={form.control}
                name="shippingInfo.shippingType"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel className="font-bold ">배송 메모</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      //defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="배송메모를 선택해 주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dor">
                          문앞에 두고 가주세요.
                        </SelectItem>
                        <SelectItem value="nock">노크 해주세요.</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* </CardContent> */}
              {/* <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="p-4">
                    <FormLabel>역할</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="배송메모를 선택해 주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">관리자</SelectItem>
                        <SelectItem value="user">일반사용자</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </Card>
            <Card className=" mt-4 mb-8 boder rounded-none box-border shadow-sm border">
              <CardTitle className="p-4 pt-5 ">쿠폰/포인트</CardTitle>
              <CardHeader className=" pb-2 pt-1 font-bold">쿠폰</CardHeader>
              <CardContent
                className="flex size-full justify-center gap-2 
              rounded-none w-full"
              >
                <CouponPointFrom
                  form={form}
                  cartData={cartData}
                  setCartData={setCartData}
                />
              </CardContent>
              <CardHeader className=" pb-2 pt-1 font-bold">
                쿠폰 번호
              </CardHeader>

              <CardContent className="flex size-full justify-center gap-2 rounded-none w-full">
                <CouponCodeFrom
                  form={form}
                  cartData={cartData}
                  setCartData={setCartData}
                />
              </CardContent>
              <CardHeader className=" pb-2 pt-1 font-bold">포인트</CardHeader>
              <CardContent>
                <div className="flex size-full justify-center gap-2 rounded-none w-full">
                  {/*쿠폰 포인트 사용*/}

                  <CouponPointUsedFrom
                    form={form}
                    cartData={cartData}
                    setCartData={setCartData}
                  />
                </div>
                <p className=" text-slate-800 text-s pt-1 font-bold">
                  보유 포인트 <span>{cartData.coupon.pointsUsed}</span>
                </p>
                <p className=" text-slate-400 text-xs pt-1 ">
                  5000 포인트 이상 보유 및 10,000 이상 구매시 사용가능
                </p>
              </CardContent>
            </Card>
          </Card>
          <Card className="col-span-1 rounded-none bg-inherit border-none">
            <Card className=" mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">최종 결제 금액</CardTitle>
              <CardContent>
                <div className="flex flex-row w-full justify-between">
                  {/*상품 가격*/}
                  <FormField
                    control={form.control}
                    name="productInfo.price"
                    render={({ field }) => (
                      <FormItem>
                        <p className="text-slate-500 font-medium" {...field}>
                          상품 가격
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <p className="font-bold">
                    {cartData.paymentAmount.total}
                    <span>원</span>
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p className="text-slate-500 font-medium">할인 가격</p>
                  <p className="font-bold">
                    <span>{cartData.paymentAmount.discount}</span>
                    <span>원</span>
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p className="text-slate-500 font-medium"></p>

                  <p className="font-bold">
                    <span>-</span>0<span>원</span>
                  </p>
                </div>
                <div className="flex flex-row w-full justify-between">
                  <p className="text-slate-500 font-medium">배송비</p>
                  <p className="font-bold">
                    <span>+</span>2500<span>원</span>
                  </p>
                </div>
                <hr className="mt-4 mb-4" />
                <div className="flex flex-row w-full justify-between items-center">
                  <h5>총 결제 금액</h5>
                  <h5 className=" font-black text-indigo-600 text-2xl">
                    {cartData.paymentAmount.total + 2500}
                  </h5>
                </div>
              </CardContent>
              <CardContent className="  w-full p-3 justify-items-center">
                <h6 className="flex items-center text-center">
                  <span className=" text-indigo-600 font-black">
                    {getPoint}
                  </span>
                  포인트 적립예정
                </h6>
              </CardContent>
            </Card>
            <Card className=" mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">결제 방법</CardTitle>
            </Card>
            <Card className=" mt-4 boder rounded-none p-1 shadow-sm border">
              <CardTitle className="p-4 ">최종 결제 금액</CardTitle>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod.payment"
                  render={({ field }) => (
                    <FormItem>
                      <RadioGroup
                        className="grid"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <>
                            <div className="flex items-center space-x-2 ">
                              <RadioGroupItem
                                value="option-one"
                                id="option-one"
                              />
                              <Label htmlFor="option-one">신용카드</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-two"
                                id="option-two"
                              />
                              <Label htmlFor="option-two">가상계좌</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-tree"
                                id="option-tree"
                              />
                              <Label htmlFor="option-tree">무통장입금</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-four"
                                id="option-four"
                              />
                              <Label htmlFor="option-four">핸드폰결제</Label>
                            </div>
                            <div className="flex items-center space-x-2 basis-1/2">
                              <RadioGroupItem
                                value="option-five"
                                id="option-five"
                              />
                              <Label htmlFor="option-five">카카오페이</Label>
                            </div>
                          </>
                        </FormControl>
                      </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <FormField
                  control={form.control}
                  name="paymentMethod.payment"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="은행을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bankone">
                            ㄱ00은행:000-00-0000 예금주명
                          </SelectItem>
                          <SelectItem value="banktwo">
                            ㄴ00은행:000-00-0000 예금주명
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="paymentMethod.depositor"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormControl className="w-full">
                        <Input
                          className=" rounded-none bg-inherit border"
                          placeholder="입급자명을 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="mt-2 text-slate-500 font-medium text-xs">
                  <span>
                    주문 후 24시간동안 미입금시 자동 취소가 될 수 있습니다.
                  </span>
                </p>
                <hr className="mt-2 mb-4" />
                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      현금 영수증 신청
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className=" mt-4 pb-4 boder rounded-none p-0 shadow-sm border">
              <CardContent className="pt-5">
                <FormField
                  control={form.control}
                  name="purchaseAgreement.termsAndConditions"
                  render={({ field }) => (
                    <FormItem>
                      <div className="items-top flex space-x-2 mb-4">
                        <Checkbox
                          id="terms1"
                          checked={field.value}
                          onCheckedChange={() => field.onChange(!field.value)}
                          {...field}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            전체동의
                          </label>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="items-top flex space-x-2 ml-4">
                  <FormField
                    control={form.control}
                    name="purchaseAgreement.termsAndConditions"
                    render={({ field }) => (
                      <FormItem>
                        <div className="items-top flex space-x-2 mb-4">
                          <Checkbox
                            id="terms1"
                            checked={field.value}
                            onCheckedChange={() => field.onChange(!field.value)}
                            {...field}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              구매조건 확인 및 결제진행에 동의
                            </label>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardContent className="grid justify-items-center  bg-indigo-600 w-full p-3 justify-center text-center">
                <Button
                  className="flex items-center text-center text-white font-extrabold self-center w-full basis-full"
                  type="submit"
                  // onClick={(e) => {
                  //   console.log("확인", date);
                  //   form.handleSubmit(onSubmit)(e);
                  // }}
                >
                  결제하기
                </Button>
              </CardContent>
            </Card>
          </Card>
        </form>
      </Form>
    </main>
  );
}
