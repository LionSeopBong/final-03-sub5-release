"use client";

import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import Navi from "@/app/components/common/Navi";
import HomeContent from "@/app/home/components/HomeContent";

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeContent />
      <Footer />
      <Navi />
    </>
  );
}
