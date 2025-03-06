import React, { useEffect } from "react";
import { useMediaQuery, Box } from "@mui/material";
import ScrollReveal from "scrollreveal";
import SimpleBottomNavigation from "../../components/SimpleBottomNavigation";
import CarouselComponent from "./CarouselComponent";
import RowAndColumnSpacing from "./Gridv2";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width:768px)"); // xs (Extra Small)

  useEffect(() => {
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
      <div>
        <div className="fade-in">
          <CarouselComponent />
        </div>

        <Box ml={-1} sx={{ ml: { xs: -1, lg: 6 } }} className="fade-in">
          <RowAndColumnSpacing />
        </Box>
        <SimpleBottomNavigation />
      </div>
    </>
  );
}

export default Dashboard;
