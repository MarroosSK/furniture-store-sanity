import { BannerI } from "@/types/types";
import ShopNowButton from "../../buttons/shop-now-button";
import BannerHeading from "./banner-heading";
import BannerSlider from "./banner-slider";

const Banner = ({ banners }: { banners: BannerI[] }) => {
  return (
    <div className="relative">
      <BannerSlider banners={banners} />
      <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <BannerHeading />
        <ShopNowButton
          title={"Shop now"}
          href={"/shop"}
          classes="text-white border-white"
        />
      </div>
    </div>
  );
};

export default Banner;
