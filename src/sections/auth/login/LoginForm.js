import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleClick = async (e) => {
    e.preventDefault();
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
      console.log("idaaaaaaaaaaaaaaa",id);
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
    }
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
       
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Commencer
      </LoadingButton>
    </>
  );
}
