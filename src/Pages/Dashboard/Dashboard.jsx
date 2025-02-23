import React, { useEffect } from "react";
import { useMediaQuery, Box } from "@mui/material";
import ScrollReveal from "scrollreveal";
import BoxBasic from "./BoxBasic";
import SimpleBottomNavigation from "../../components/SimpleBottomNavigation";
import FilterHeader1 from "./FilterHeader1";
import CarouselComponent from "./CarouselComponent";
import Filter2 from "./Filter2";
import SearchButton from "../../components/searchButton";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width:768px)"); // xs (Extra Small)

  useEffect(() => {
    console.log("isMobile:", isMobile); // Debugging to check if the media query is working

    const sr = ScrollReveal({
      duration: 1000,
      origin: "bottom",
      distance: "30px",
      delay: 200,
      easing: "ease-in-out",
      reset: false,
    });

    sr.reveal(".fade-in", { opacity: 0, scale: 0.95 });
  }, [isMobile]);

  return (
    <>
      <Box my={2.5} mx={1.5} width={365}>
        {isMobile && <SearchButton />}
      </Box>
      <div>
        <div className="fade-in">
          <FilterHeader1 />
        </div>
        <div className="fade-in">
          <CarouselComponent />
        </div>
        <div className="fade-in">
          <Filter2 />
        </div>
        <div className="fade-in">
          <BoxBasic />
        </div>

        <SimpleBottomNavigation />
      </div>
    </>
  );
}

export default Dashboard;
