import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Button, Stack, IconButton, InputAdornment, TextField, Popover } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import InscrireForm from './InscrireForm'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inscrire, setInscrire]= useState('');
  const [error, setError] = useState('');
  

  const handleClick = async (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const apiUrl = 'http://localhost:3003/api/users/signin';
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password',password);
 
    try {
      const response = await axios.post(apiUrl, data);
      
      // Save the authentication token to local storage or cookie

      let access = response.data.accessToken
      const refresh = response.data.refreshToken
      const id = response.data.id
      localStorage.setItem('accessToken', access);
      localStorage.setItem('userId', id)

      const userId = localStorage.getItem('userId')
      console.log("userid",userId)

    
      console.log("acess",localStorage.getItem('accessToken'));
      // localStorage.setItem('id', id);
      // console.log("id",localStorage.getItem('id'));
      // alert(localStorage.getItem('accessToken'))
      localStorage.setItem('refreshToken', refresh);
      // console.log("refresh",localStorage.getItem('refreshToken'));
     
      // alert(localStorage.getItem('id'))

const expire = response.data.expire_in;
if(expire===0){
  access = refresh
}

      navigate('/dashboard', { replace: true });
    
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      } else {
        setError('Une erreur s\'est produite lors de la connexion');
      }
    }
  };  

  const handleInscription = () => {
    setInscrire(!inscrire);
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Adresse E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Mot de Passe"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center"  sx={{ my: 2 }}>
    
            Vous n'avez pas de compte ? {''}
              <Button variant="subtitle2" onClick={handleInscription}>S'inscrire</Button>
              <Popover
            open={Boolean(inscrire)}
            anchorEl={inscrire}
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
            <InscrireForm show={inscrire} setShow={setInscrire} />
          </Popover>
    
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Commencer
      </LoadingButton>
    </>
  );
}
