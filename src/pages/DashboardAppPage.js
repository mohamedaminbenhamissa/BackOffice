import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, Popover } from '@mui/material';

// components

// sections
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary, AppConversionRates } from '../sections/@dashboard/app';

import Scan from './Scan';
import Calander from './Calander';
import Circle from './Circle';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [showQR, setShowQR] = useState(false);
  const [formations, setForamtions] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllFormationFromBack();
  }, []);
  const getAllFormationFromBack = () => {
    axios.get('http://localhost:3003/api/formation/formations').then((res) => {
      setForamtions(res.data.data[0]);
    });
  };
  const handleShowQR = () => {
    setShowQR(!showQR);
  };
  const handleEventAdd = (event) => {
    // Update the events array with the new event
    setEvents([...events, event]);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* <Grid item xs={4} sm={4} md={4}>
            <Button onClick={handleShowQR}>
              <AppWidgetSummary title="Générer un QR Code" icon={'ic:sharp-qr-code-scanner'} />
            </Button>
          </Grid> */}
          <Popover
            open={Boolean(showQR)}
            anchorEl={showQR}
            // onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 320,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            {/* <<UpdateUserForm showupdate={showFormUpdate} setShowupdate={setShowFormUpdate}  />> */}
            <Scan show={showQR} setShow={setShowQR} />
          </Popover>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title=" un QR Code" title2="Générer"  color="info" icon={'ic:sharp-qr-code-scanner'} onClick={handleShowQR} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Apprenants"  total={formations.non_admin_users_count} color="warning" icon={'mdi:users-group'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Formations" total={1} color="error" icon={'game-icons:star-formation'} />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits
              title="Progression des Apprenants"
              chartLabels={['Apprenanat 1', 'Apprenanat 2 ', 'Apprenanat 3', 'Apprenanat 4', 'Apprenanat 5', 'Apprenanat 6']}
              chartData={[
                {
                  name: 'Progression',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 80, 23, 11],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <Calander view="month" events={events} onEventAdd={handleEventAdd} />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4}  >
           Nombre Totales des Apprenants : 
           <br/>   <br/>   <br/>   
           <Circle/>
          </Grid> */}

        </Grid>
      </Container>
    </>
  );
}
