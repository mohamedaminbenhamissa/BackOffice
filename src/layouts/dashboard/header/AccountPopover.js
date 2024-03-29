import { useState,useEffect } from 'react';
import axios from 'axios';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
// mocks_
import account from '../../../_mock/account';


// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/api/users/users/${userId}`);
      console.log('data----------', response.data.email);
      setFirstname(response.data.firstname);
      setEmail(response.data.email);
      // setGroupes(response.data.data.data.groupes)
      console.log('ok ****************** ', response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleprofile = () => {
    navigate("/dashboard/Profile")
  }

  const handleClose = () => {
    setOpen(false);
  
  };
  
  
  const navigate = useNavigate();

  const handleconnection = () => {
    navigate("/login")
  }
  
  const handleacceuil = () => {
    navigate("/dashboard/app")
  }
  const handlehistorique = () => {
    navigate("/dashboard/Historique")
  }
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
          {firstname}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>


        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={handleacceuil} sx={{ m: 1 }}>
          Acceuil
        </MenuItem>
        <MenuItem onClick={handleprofile} sx={{ m: 1 }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handlehistorique} sx={{ m: 1 }}>
          Historique
        </MenuItem>
        <MenuItem onClick={handleconnection} sx={{ m: 1 }}>
          Déconnecter
        </MenuItem>
      </Popover>
    </>
  );
}
