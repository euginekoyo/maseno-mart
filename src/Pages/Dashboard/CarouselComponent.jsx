import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <div style={{ maxWidth: "90%", paddingTop: "10px" }}>
      <Box sx={{ ml: { lg: 12, xs: 4 } }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/img3.png"
              alt="First slide"
              style={{
                height: { lg: "100%" },
                width: "100%",
                objectFit: "fit",
                borderRadius: "15px", // 👈 Rounded corners
                boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)", // 👈 Soft shadow
              }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/img2.png"
              alt="Second slide"
              style={{
                height: { lg: "100%" },
                width: "100%",
                objectFit: "fit",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)",
              }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/img4.jpg"
              alt="Third slide"
              style={{
                height: { lg: "100%" },
                width: "100%",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0128 0, 0.3)",
              }}
            />
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/src/assets/img7.png"
                alt="Third slide"
                style={{
                  height: { lg: "100%" },
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0, 0128 0, 0.3)",
                }}
              />
            </Carousel.Item>
          </Carousel.Item>
        </Carousel>
      </Box>
    </div>
  );
};

export default CarouselComponent;
