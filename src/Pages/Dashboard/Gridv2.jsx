import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import RecipeReviewCard from './MediaCard';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 , lg: 2 }}>
        <Grid size={{ xs: 6, sm: 6, md: 3, xl: 2 }}>
          <RecipeReviewCard />
        </Grid >
        <Grid size={{ xs: 6, sm: 6, md: 3,xl: 2 }}>
          <RecipeReviewCard />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 ,xl: 2 }}>
          <RecipeReviewCard />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 ,xl: 2 }}>
          <RecipeReviewCard />
        </Grid>
      </Grid>
    </Box>
  );
}