import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HandymanIcon from '@mui/icons-material/Handyman';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import SellIcon from '@mui/icons-material/Sell';

export default function Filter2() {
  const filters = [
    { label: 'Brand New', icon: <ShoppingBagIcon fontSize="small" /> },
    { label: 'Free Delivery', icon: <LocalShippingIcon fontSize="small" /> },
    { label: '2nd Hand', icon: <SellIcon fontSize="small" /> },
    { label: 'Services', icon: <HandymanIcon fontSize="small" /> },
    
  ];

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        p: 2,
        mt: 1,
      }}
    >
      <Grid 
        container 
        spacing={2} 
        justifyContent="center" 
        alignItems="center"
      >
        {filters.map((filter, index) => (
          <Grid item key={index} xs={6} sm={4} md={2.2} lg={2}>
            <Button
              variant="contained"
              startIcon={filter.icon}
              sx={{
                width: '100%',
                minWidth: '140px', // Keeps button sizes equal
                maxWidth: '160px',
                whiteSpace: 'nowrap', // Prevents text wrapping
                textTransform: 'none',
                borderRadius: '25px',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                fontWeight: 'bold',
                padding: { xs: '6px 8px', sm: '7px 12px', md: '8px 14px' },
                background: 'linear-gradient(135deg, #007bff 30%, #0056b3 90%)',
                color: '#fff',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0056b3 30%, #004494 90%)',
                  transform: 'scale(1.05)',
                },
                '&:focus': {
                  outline: '2px solid #004494',
                },
              }}
            >
              {filter.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
