import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';

const ClientLayout = dynamic(() => import('@/components/layout/ClientLayout'));

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easy Algo - 通俗易懂的算法学习平台",
  description: "专业的算法教程网站，提供数据结构与算法详解、LeetCode 题解、面试算法指南。通过清晰的图解和实例，让算法学习变得简单有趣。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${geist.className} min-h-screen bg-white flex flex-col`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
