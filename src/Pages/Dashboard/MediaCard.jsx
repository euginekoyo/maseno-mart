import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog } from '@mui/material';

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: { xs: 320, sm: 345 }, mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[600], width: 32, height: 32, fontSize: 14 }}>R</Avatar>}
        action={<IconButton color="primary" size="small"><MoreVertIcon /></IconButton>}
        title={<Typography variant="subtitle1" fontWeight={600}>Shrimp Paella</Typography>}
        subheader={<Typography variant="caption" sx={{ fontSize: '0.7rem' }}>Sep 14, 2016</Typography>}
        sx={{ padding: '8px 16px' }}
      />
<CardMedia
  component="img"
  sx={{ 
    height: { xs: 100, sm: 300 }, 
    borderRadius: 2,
    objectFit: 'contain' // Ensures the whole image fits without cropping
  }}
  image="/src/assets/jersey.jpg"
  alt="Paella dish"
/>

      <CardContent sx={{ padding: '8px 16px' }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          This impressive paella is a perfect party dish and a fun meal to cook together with your guests.
        </Typography>
        <Typography variant="h6" fontWeight={600} sx={{ mt: 1, color: 'primary.main' }}>
          KSh 2,999
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: '8px 16px' }}>
        <IconButton aria-label="add to favorites" color="primary" size="small"><FavoriteIcon /></IconButton>
        <IconButton aria-label="share" color="primary" size="small"><ShareIcon /></IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" color="primary" size="small">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Dialog open={expanded} onClose={handleExpandClick}>
        <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', position: 'relative' }}>
          <IconButton onClick={handleExpandClick} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography paragraph sx={{ pl: 2, fontWeight: 'bold' }}>Method:</Typography>
          <Typography paragraph sx={{ pl: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
          </Typography>
        </Box>
      </Dialog>
    </Card>
  );
}
