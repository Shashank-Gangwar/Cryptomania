import Carousel from "./Carousel";
import HeroHeading from "./HeroHeading";
import SearchBar from "./SearchBar";

const HeroSection = () => {
  return (
    <div className=" bg-dark text-center heroSection">
      <HeroHeading />
      <SearchBar />
      <Carousel />
    </div>
  );
};

export default HeroSection;
