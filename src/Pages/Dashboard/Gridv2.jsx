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
    <Box sx={{ width: '100%', p: 2 }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeReviewCard />
        </Grid>
      </Grid>
    </Box>
  );
}