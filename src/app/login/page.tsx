"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { Input } from "@/components/ui/input";
import { TsLoginSchemaType, loginSchema } from "@/validators/loginSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const form = useForm<TsLoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  interface LoginResponse {
    token?: string;
    errors?: Record<string, string>;
  }

  const publicApi = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async (data: TsLoginSchemaType) => {
    try {
      const response = await fetch(`${publicApi}/api/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 응답이 JSON 형식인지 확인하기 위해 response.ok 확인 후 JSON 파싱
      // if (!response.ok) {
      //   throw new Error("아이디 또는 비밀번호가 틀렸습니다.");
      // }

      const responseData: LoginResponse = await response.json();

      if (responseData.errors) {
        throw new Error("사용자 정보가 없습니다.");
      }

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);

        if (data.role === "admin") {
          router.push("/admin");
        }
        if (data.role === "user") {
          router.push("/products");
        }
        router.push("/products");
        alert("로그인에 성공했습니다!");
      } else {
        console.error(responseData.errors);
      }
    } catch (error) {
      // JSON 파싱 오류와 같은 다른 종류의 오류를 구체적으로 처리
      if (error instanceof SyntaxError) {
        console.error("응답이 JSON 형식이 아닙니다:", error);
        alert("서버 응답이 올바르지 않습니다.");
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className="p-40 box-border w-100">
      <Card className="w-[380px]">
        <CardHeader className="pb-4 pt-8">
          <CardTitle>로그인</CardTitle>
          <CardDescription>환영합니다!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative space-y-2 w-100"
            >
              <div className={"size-full"}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="user@example.com_으로 로그인 가능"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className={"size-full"}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="pw1234!_으로 로그인 가능"
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={"size-full"}>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>역할</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="역할을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">관리자로 로그인</SelectItem>
                          <SelectItem value="user">
                            일반사용자로 로그인
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={"flex gap-3 size-full w-100 pt-4"}>
                <Button
                  variant="default"
                  type="submit"
                  className=" cursor-pointer w-3/6 block"
                  onClick={(e) => {
                    form.handleSubmit(onSubmit)(e);
                  }}
                >
                  로그인하기
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  className=" cursor-pointer w-3/6 block"
                  onClick={(e) => {
                    form.handleSubmit(onSubmit)(e);
                  }}
                >
                  <Link href="/">계정 생성하기</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
