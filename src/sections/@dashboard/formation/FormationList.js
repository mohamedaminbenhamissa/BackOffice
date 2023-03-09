import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopFormationCard from './FormationCard';

// ----------------------------------------------------------------------

FormationList.propTypes = {
  Formations: PropTypes.array.isRequired,
};

export default function FormationList({ Formations, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {Formations.map((Formation) => (
        <Grid key={Formation.id} item xs={12} sm={6} md={3}>
          <ShopFormationCard Formation={Formation} />
        </Grid>
      ))}
    </Grid>
  );
}
