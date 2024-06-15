"use client";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { type FormEventHandler, type HTMLProps, useState } from "react";
import {
  type FormSubmitHandler,
  type SubmitHandler,
  type UseFormHandleSubmit,
  useForm,
} from "react-hook-form";

import { Mochiy_Pop_One } from "next/font/google";
const mochiyPopOne = Mochiy_Pop_One({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});
import { SERVICE_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import { Swords } from "lucide-react";
import { maxLength, minLength, object, pipe, string } from "valibot";
import { useAuthUseCase } from "../usecase";
import { Input } from "@/components/ui/input";

const formSchema = object({
  userName: pipe(
    string(),
    minLength(1, "入力が必須の項目です"),
    maxLength(255, "255文字以内で入力してください")
  ),
});
export const AuthPanel = () => {
  const { login } = useAuthUseCase();
  const onSubmit: SubmitHandler<{
    userName: string;
  }> = (data) => {
    login("/rooms", data.userName);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      userName: "匿名ユーザー",
    },
    resolver: valibotResolver(formSchema),
  });
  return (
    <div className="h-1/2 w-1/2 rounded-xl border border-primary p-4 shadow-primary/50 shadow-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
        className="flex h-full flex-col items-center justify-center gap-8"
      >
        <div className="flex flex-row items-center self-center">
          <p>ようこそ</p>
          <strong className={cn("text-xl", mochiyPopOne.className)}>
            {SERVICE_NAME}
          </strong>
          <p>へ</p>
        </div>
        <Input
          className={cn(
            "-skew-x-[32deg] border-4 border-primary/70 bg-black text-white text-xl shadow-primary outline-4 drop-shadow-sm"
          )}
          {...register("userName")}
        />
        <p className="h-4 w-full text-red-400">{errors.userName?.message}</p>
        <button
          className="group relative overflow-hidden rounded-sm border border-primary bg-gradient-to-b bg-pos-100 bg-size-200 from-transparent via-transparent to-primary px-8 py-2 font-bold shadow-md shadow-primary/20 transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-pos-0 hover:px-0 hover:pr-4 hover:pl-12"
          type="submit"
        >
          <Swords className="-translate-x-full -translate-y-1/2 absolute top-1/2 left-0 transition-transform group-hover:translate-x-3" />
          <span className="translate-x-0 group-hover:translate-x-full">
            ゲームスタート
          </span>
        </button>
      </form>
    </div>
  );
};
