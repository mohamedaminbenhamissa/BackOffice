import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from '@mui/material';

export default function UpdateUserForm({ showupdate, setShowupdate }) {
  const [membreId , setMembreId] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [groupes, setGroupes] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [tel, setTel] = useState('');
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [userData, setUserData] = useState({});


 

  useEffect(() => {
    fetchUserData(membreId); 
  }, [membreId]);
  
  const fetchUserData = async (membreId) => {
    try {
      const response = await axios.get(`http://localhost:3003/api/users/${membreId}`);
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
  
    const formData = new URLSearchParams();
    
    formData.append('prenom', prenom);
    formData.append('nom', nom);
    formData.append('email', email);
    formData.append('groupes', groupes);
    formData.append('adresse', adresse);
    formData.append('ville', ville);
    formData.append('pays', pays);
    formData.append('codePostal', codePostal);
    formData.append('tel', tel);
    formData.append('selectedFormation', selectedFormation);
  
    const token = localStorage.getItem('accessToken');
  
    axios
      .put(`http://localhost:3003/api/formations/:66594/membres/${membreId}`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response from the API
        console.log("ok************",userData.prenom)
        if (response.status === 201) {
          const successMessage = document.createElement('p');
          successMessage.textContent = 'Form submitted successfully!';
          setShowupdate(false);
          alert(` Utilisateur ${prenom} modifié avec succès!`);
          
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
      <div onSubmit={handleUpdate} style={{ display: showupdate ? 'block' : 'none' }}>
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
                label="prenom "
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
                label="Nom "
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
                label="Email "
                variant="outlined"
                defaultValue={userData.email}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Groupes "
                variant="outlined"
                defaultValue={userData.groupes}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={groupes}
                onChange={(e) => setGroupes(e.target.value)}
              />
              <TextField
                id="default-value"
                label="Adresse "
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
                label="Ville "
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
                label="Pays "
                variant="outlined"
                defaultValue={userData.pays}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={pays}
                onChange={(e) => setPays(e.target.value)}
              />
              <TextField
                id="default-value"
                label="code Postal"
                variant="outlined"
                defaultValue={userData.codePostal}
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
              />
              <TextField
                id="default-value"
                label="tel"
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
                <Button color="success" variant="contained" onClick={handleUpdate}>
                  Modifier
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button color="error" variant="contained" onClick={() => setShowupdate(false)}>
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
