import { fetchBannerData } from "@/actions/fetch-banner-data";
import { fetchProducts } from "@/actions/fetch-products";
import AboveHeaderMessage from "@/components/sections/above-header-message";
import Banner from "@/components/sections/banner/banner";
import HomeBanner from "@/components/sections/home-banner";
import NewProductsSlider from "@/components/sections/new-products";
import ProductsByCategory from "@/components/sections/products-by-category";
import SubscribeNow from "@/components/sections/subscribe-now";
import { BannerI, ProductProps } from "@/types/types";

const HomePage = async () => {
  const bannersData: BannerI[] = await fetchBannerData();
  const newProductData: ProductProps[] = await fetchProducts("new");
  const bestsellerProductData: ProductProps[] = await fetchProducts(
    "bestseller"
  );
  const specialOfferProductData: ProductProps[] = await fetchProducts(
    "special offer"
  );

  return (
    <main className=" overflow-hidden min-h-screen">
      <AboveHeaderMessage />
      <Banner banners={bannersData} />
      <NewProductsSlider products={newProductData} />
      <HomeBanner />
      <ProductsByCategory products={bestsellerProductData} title="Bestseller" />
      <SubscribeNow />
      <ProductsByCategory
        products={specialOfferProductData}
        title="Special Offers"
      />
    </main>
  );
};

export default HomePage;
