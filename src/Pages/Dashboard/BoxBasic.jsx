import * as React from 'react';
import Box from '@mui/material/Box';

import RowAndColumnSpacing from './Gridv2';

export default function BoxBasic() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <RowAndColumnSpacing />
    </Box>
  );
}