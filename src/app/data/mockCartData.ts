import { TsOrderSchemaType, orderSchema } from "@/validators/cartSchema";

export const mockCartData: TsOrderSchemaType[] = [
  {
    user: {
      username: "루미",
      email: "lumi@example.com",
      phoneNumber: "123-456-7890",
    },
    productInfo: {
      productname: "루미고양이",
      productdetail: "너무 귀엽지",
      price: 1000,
      quantity: 2,
    },
    shippingInfo: {
      address: "123 부산 중구 대동로 40-21번지 길바닥집, ",
      shippingType: "dor",
      recipient: "쫀덕이",
      recipientphone: "123-456-7890",
    },
    coupon: {
      couponPoint: 6000,
      couponCode: "DISCOUNT123-20% 할인 쿠폰",
      pointsUsed: 6000,
    },
    paymentAmount: {
      discount: 0,
      total: 2000,
    },
    paymentMethod: {
      payment: "",
      depositor: "박루미",
    },
    purchaseAgreement: {
      termsAndConditions: true || "",
      privacyPolicy: true || "",
    },
  },
];
