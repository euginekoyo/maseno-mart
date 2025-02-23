import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Dialog, Button, useMediaQuery, useTheme } from '@mui/material';

const ExpandMore = styled(IconButton)(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: { xs: 320, sm: 350 }, mx: 'auto', borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ 
            height: { xs: 200, sm: 300 }, 
            objectFit: 'cover' 
          }}
          image="/src/assets/jersey.jpg"
          alt="Paella dish"
        />
      </Box>
      <CardContent sx={{ padding: '5px 10px' }}>
        <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          JEYSERY Free Delivery
        </Typography>
        <Typography variant="h7" fontWeight={600} sx={{ mt: 1, color: 'primary.main' }}>
          KSh 2,999
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ padding: '8px 11px' }}>
        <IconButton aria-label="add to favorites" color="primary" size="small"><FavoriteIcon /></IconButton>
        <IconButton aria-label="share" color="primary" size="small"><ShareIcon /></IconButton>
        <IconButton
          aria-label="whatsapp"
          color="primary"
          size="small"
          onClick={() => window.open('https://wa.me/254712345678', '_blank')}
        >
          <WhatsAppIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" color="primary" size="small">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Dialog open={expanded} onClose={handleExpandClick}>
        <Box sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', position: 'relative' }}>
          <IconButton onClick={handleExpandClick} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography paragraph sx={{ pl: 2, fontWeight: 'bold' }}>Details:</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pl: 2 }}>
            <Avatar sx={{ bgcolor: red[600], width: 40, height: 40 }}>R</Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>Shrimp Paella</Typography>
              <Typography variant="caption" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>Sep 14, 2016</Typography>
            </Box>
          </Box>
          <Typography paragraph sx={{ pl: 2, mt: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
          </Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<WhatsAppIcon />}
            sx={{ mt: 2, display: 'flex', justifyContent: 'center', mx: 'auto' }}
            onClick={() => window.open('https://wa.me/254712345678', '_blank')}
          >
            Contact me
          </Button>
        </Box>
      </Dialog>
    </Card>
  );
}