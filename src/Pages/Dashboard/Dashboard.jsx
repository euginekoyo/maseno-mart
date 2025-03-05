import React, { useEffect } from "react";
import { useMediaQuery, Box } from "@mui/material";
import ScrollReveal from "scrollreveal";
import BoxBasic from "./BoxBasic";
import SimpleBottomNavigation from "../../components/SimpleBottomNavigation";
import FilterHeader1 from "./FilterHeader1";
import CarouselComponent from "./CarouselComponent";
import Filter2 from "./Filter2";
import SearchButton from "../../components/searchButton";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

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

  const location = useLocation(); // Get passed state

  useEffect(() => {
    if (location.state?.message) {
      Swal.fire({
        toast: true, // Enable toast mode
        position: "top", // Set position to top-right
        icon: "success",
        title: location.state.message,
        showConfirmButton: false,
        timer: 3000, // Auto-dismiss after 3 seconds
        timerProgressBar: true,
        customClass: {
          popup: "custom-swal-popup", // Custom class for styling
        },
      });
    }
  }, [location]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login")
  
  }
  
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
