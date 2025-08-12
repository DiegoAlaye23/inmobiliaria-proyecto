import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export interface Property {
  id: number;
  title: string;
  city: string;
  type: string;
  price: number;
  rooms: number;
  date: string;
  image: string;
  neighborhood?: string;
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card>
      <Box sx={{ position: 'relative', pt: '56.25%' }}>
        <CardMedia
          component="img"
          image={property.image}
          alt={property.title}
          loading="lazy"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {property.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.city} - {property.type}
        </Typography>
        <Typography variant="h6" color="primary">
          ${property.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rooms: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    neighborhood: PropTypes.string
  }).isRequired
};

export default PropertyCard;
