import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function FilterHeader1() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Tabs
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        indicatorColor="primary"
        textColor="primary"
        sx={{
          '& .MuiTab-root': {
            fontSize: '13px', // Slightly smaller
            fontWeight: '500', // Medium weight
            textTransform: 'none',
            minWidth: 'auto', // Removes extra width
            padding: '6px 12px', // Reduces inner spacing
          },
          '& .MuiTabs-flexContainer': {
            gap: '4px', // Reduces space between tabs
          },
        }}
      >
        <Tab label="All" />
        <Tab label="Electronics" />
        <Tab label="Saloon Services" />
        <Tab label="Shoes" />
        <Tab label="Cyber Services" />
        <Tab label="Clothes" />
        <Tab label="Appliances" />
      </Tabs>
    </Box>
  );
}
