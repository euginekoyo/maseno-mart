import { Box } from "@mui/material";
import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <div style={{ maxWidth: "90%", paddingTop: "10px" }}>
      <Box sx={{ ml: { lg: 12, xs:4} }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/jersey.jpg"
              alt="First slide"
              style={{
                height: "250px",
                objectFit: "cover",
                borderRadius: "15px", // 👈 Rounded corners
                boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)", // 👈 Soft shadow
              }}
            />
            <Carousel.Caption>
              <h5
                style={{
                  background: "linear-gradient(to right, #006400, #008000",
                  borderRadius: "10px",
                  padding: "5px",
                  color: "#fff",
                }}
              >
                Print @ a Comrade Price
              </h5>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/c.jpg"
              alt="Second slide"
              style={{
                height: "250px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 128, 0, 0.3)",
              }}
            />
            <Carousel.Caption>
              <h5
                style={{
                  background: "linear-gradient(to right, #006400, #008000)",
                  borderRadius: "10px",
                  padding: "5px",
                  color: "fff",
                }}
              >
                Become a Seller Today
              </h5>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/src/assets/c.jpg"
              alt="Third slide"
              style={{
                height: "250px",
                objectFit: "cover",
                borderRadius: "15px",
                boxShadow: "0 4px 8px rgba(0, 0128 0, 0.3)",
              }}
            />
            <Carousel.Caption>
              <h5
                style={{
                  background: "linear-gradient(to right, #006400, #008000)",
                  borderRadius: "10px",
                  padding: "5px",
                  color: "#fff"
                }}
              >
                Market your Services
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Box>
    </div>
  );
};

export default CarouselComponent;
