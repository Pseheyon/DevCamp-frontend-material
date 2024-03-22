"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  const form = useForm<TsLoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TsLoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TsLoginSchemaType) => {
    alert(JSON.stringify(data, null, 4));
    const response = await fetch("/pages/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      alert("사용자 정보가 없습니다.");
      return;
    }
    if (response.ok) {
      alert("로그인에 성공했습니다!");
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
