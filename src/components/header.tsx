"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";

export default function Header() {
  return (
    <>
      <Menubar className="">
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/">홈</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              홈 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/">회원가입</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              회원가입 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/login">로그인</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              로그인 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/cart">장바구니</Link>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              장바구니 <MenubarShortcut>바로가기</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <DarkModeToggle />
      </Menubar>
    </>
  );
}
