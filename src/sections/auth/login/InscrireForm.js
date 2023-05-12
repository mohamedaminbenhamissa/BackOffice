import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Card, CardContent, Divider, Box, Typography, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { afficheUser } from '../../../slices/SliceUser';

export default function InscrireForm({ show, setShow }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleInscrir = (event) => {
    const formData = new URLSearchParams();

    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('pseudo', pseudo);
    formData.append('email', email);
    formData.append('password', password);

    axios
      .post(`http://localhost:3003/api/users/register`, formData)
      .then((response) => {
        // Handle the response from the API

        if (response.status === 200) {
          const successMessage = document.createElement('p');
          successMessage.textContent = 'Form submitted successfully!';
          setShow(false);
          // alert(` Utilisateur ${firstname} ajouté avec succès!`);
          toast.success("Login Successful!", { position: "top-center" }); 

          dispatch(afficheUser());
        } else {
          throw new Error(response.status);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        // Show an error message
      });
  };

  return (
    <>
    <ToastContainer 
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"/>
      <div onSubmit={handleInscrir} style={{ display: show ? 'block' : 'none' }}>
        <Card
          variant="outlined"
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              padding: '15px 30px',
            }}
            display="flex"
            alignItems="center"
          >
            <Box flexGrow={1}>
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: '500',
                }}
              >
                Inscription
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent
            sx={{
              padding: '30px',
            }}
          >
            <form>
              <TextField
                id="default-value"
                label="Prenom"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Nom"
                variant="outlined"
                // defaultValue={ok}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                label="Pseudo"
                // defaultValue={ok}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                label="Email"
                // defaultValue={ok}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                label="Mot de Passe"
                type="password"
                // defaultValue={ok}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br /> <br />
              <div>
                <Button color="success" variant="contained" onClick={(event) => handleInscrir()}>
                  S'inscrire
                 
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="error" variant="contained" onClick={() => setShow(false)}>
                  Fermer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
     
    </>
  );
}
