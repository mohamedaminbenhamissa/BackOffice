import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from '@mui/material';

export default function UpdateUserForm() {
  const [membreId, setMembreId] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  // const [groupes, setGroupes] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  // const [codePostal, setCodePostal] = useState('');
  const [tel, setTel] = useState('');
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [userData, setUserData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMembreId(location.state.id);
    // getuserById(location.state.id)
    console.log('ok id ', location.state.id);
    fetchUserData(location.state.id);
  }, []);

  const fetchUserData = async (membreId) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/formations/:66594/membres/${membreId}`);
      setUserData(response.data.data.data);
      setPrenom(response.data.data.data.prenom);
      setNom(response.data.data.data.nom);
      console.log('*********////////', response.data.data.data.nom);
      setEmail(response.data.data.data.email);
      // setGroupes(response.data.data.data.groupes)
      setAdresse(response.data.data.data.adresse);
      setVille(response.data.data.data.ville);
      setPays(response.data.data.data.pays);
      // setCodePostal(response.data.data.data.codePostal)
      setTel(response.data.data.data.tel);

      console.log('ok ****************** ', response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {
    const formData = new URLSearchParams();

    formData.append('prenom', prenom);
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('adresse', adresse);
    formData.append('ville', ville);
    formData.append('pays', pays);
    formData.append('tel', tel);
    formData.append('selectedFormation', selectedFormation);

    const token = localStorage.getItem('accessToken');

    axios
      .patch(`http://localhost:3003/api/formations/:66594/membres/${membreId}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response from the API
        console.log('ok************', userData.prenom);
        console.log('**********statut', response.status);
        if (response.status === 200) {
          const successMessage = document.createElement('p');
          successMessage.textContent = 'Form submitted successfully!';
          
         
          navigate(-1);
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

  useEffect(() => {
    // Make a request to the third-party API to retrieve the list of formations
    axios
      .get('http://localhost:3003/api/formation/formations')
      .then((response) => {
        setFormations(response.data.data[0]);
        console.log('******formation********', response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleFormationChange = (event) => {
    const selectedNomFormation = event.target.value;
    setSelectedFormation(selectedNomFormation ? formations.idFormation : '');
  };

  return (
    <>
        
      <div onSubmit={handleUpdate} style={{ block: 'none' }}>
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
                Modifier Utilisateur
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
                variant="outlined"
                defaultValue={userData.prenom}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                defaultValue={userData.nom}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                defaultValue={userData.email}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* <TextField
                id="default-value"
               
                variant="outlined"
                defaultValue={userData.groupes}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={groupes}
                onChange={(e) => setGroupes(e.target.value)}
              /> */}
              <TextField
                id="default-value"
                variant="outlined"
                defaultValue={userData.adresse}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                defaultValue={userData.ville}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={ville}
                onChange={(e) => setVille(e.target.value)}
              />
              <TextField
                id="default-value"
                variant="outlined"
                defaultValue={userData.pays}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={pays}
                onChange={(e) => setPays(e.target.value)}
              />
              {/* <TextField
                id="default-value"
            
                variant="outlined"
                defaultValue={userData.codePostal}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
              /> */}
              <TextField
                id="default-value"
                variant="outlined"
                defaultValue={userData.tel}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
              <div>
                <div style={{ color: 'black' }}>
                  Formations :
                  {/* <TextField
                id="default-value"
                label="Formation"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={selectedFormation}
                onChange={(e) => setSelectedFormation(e.target.value)}
              /> */}
                  <div style={{ paddingLeft: '150px', display: 'inline' }}>
                    <select id="formation" onChange={handleFormationChange}>
                      <option value="">Select Formation</option>
                      <option value={formations.nomFormation} key={formations._id}>
                        {formations.nomFormation}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <br /> <br />
              <div>
                <Button color="success" variant="contained" onClick={() => handleUpdate()}>
                  Modifier
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="error" variant="contained" onClick={() => navigate(-1)}>
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
