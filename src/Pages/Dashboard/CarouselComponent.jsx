import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
    <div style={{ maxWidth: '90%', margin: 'auto', paddingTop: '10px' }}> 
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/src/assets/jersey.jpg"
            alt="First slide"
            style={{
              height: '250px',
              objectFit: 'cover',
              borderRadius: '15px', // 👈 Rounded corners
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // 👈 Soft shadow
            }}
          />
          <Carousel.Caption>
            <h5 style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '5px' }}>
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
              height: '250px',
              objectFit: 'cover',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Carousel.Caption>
            <h5 style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '5px' }}>
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
              height: '250px',
              objectFit: 'cover',
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Carousel.Caption>
            <h5 style={{ background: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '5px' }}>
              Market your Services
            </h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
