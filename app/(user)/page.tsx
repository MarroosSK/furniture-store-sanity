import { fetchBannerData } from "@/actions/fetch-banner-data";
import { fetchProducts } from "@/actions/fetch-products";
import BestsellersSection from "@/components/sections/bestsellers/bestsellers-section";
import HeroSection from "@/components/sections/hero/hero-section";
import NewSection from "@/components/sections/new/new-section";
import ShopNowSection from "@/components/sections/shop-now/shop-now-section";
import SubscribeSection from "@/components/sections/subscribe/subscribe-section";
import TopMessageSection from "@/components/sections/top-message/top-message-section";

const HomePage = async () => {
  const [bannersData, newProductData, bestsellerProductData] =
    await Promise.all([
      fetchBannerData(),
      fetchProducts("new"),
      fetchProducts("bestseller"),
    ]);

  return (
    <>
      <TopMessageSection />
      <HeroSection banners={bannersData} />
      <NewSection products={newProductData} />
      <ShopNowSection />
      <BestsellersSection products={bestsellerProductData} />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
