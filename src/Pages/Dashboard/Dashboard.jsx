import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import BoxBasic from "./BoxBasic";
import SimpleBottomNavigation from "../../components/SimpleBottomNavigation";
import FilterHeader1 from "./FilterHeader1";
import CarouselComponent from "./CarouselComponent";
import Filter2 from "./Filter2";

function Dashboard() {
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
  }, []);

  return (
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
  );
}

export default Dashboard;
