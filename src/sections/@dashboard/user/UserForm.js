import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { afficheUser } from '../../../slices/SliceUser';

export default function AddUserForm({ show, setShow }) {
  const [membreId, setMembreId] = useState('');
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
  const dispatch = useDispatch();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  // const { prenom, nom, email, groupes, adresse, ville, pays, codePostal, tel, selectedFormation } = useSelector((state) => state.form);

 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérification des champs obligatoires
    const errors = {};
    if (!prenom) {
      errors.prenom = 'Le prénom est obligatoire';
    }
    if (!nom) {
      errors.nom = 'Le nom est obligatoire';
    }
    if (!email) {
      errors.email = 'L\'email est obligatoire';
    }
    if (!groupes) {
      errors.groupes = 'Le groupe est obligatoire';
    }
    if (!selectedFormation) {
      errors.selectedFormation = 'Veuillez sélectionner une formation';
    }

    // Si des erreurs sont présentes, on les affiche et on arrête le traitement
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
      .post(`http://localhost:3003/api/formations/${selectedFormation}/membres`, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          const successMessage = document.createElement('p');
          successMessage.textContent = 'Form submitted successfully!';
          setShow(false);
          alert(` Utilisateur ${prenom} ajouté avec succès!`);
          // console.log('souuuuuuuuu)))))))))uuuuuuuuuuuuuuuuuu', response);
          window.location.reload(true);
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
      <div onSubmit={handleSubmit} style={{ display: show ? 'block' : 'none' }}>
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
                Ajouter Utilisateur
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
                defaultValue="user1"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                error={formErrors.prenom}
                helperText={formErrors.prenom}
              />
              <TextField
                id="default-value"
                label="Nom "
                variant="outlined"
                defaultValue="user1"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                error={formErrors.nom}
                helperText={formErrors.nom}
              />
              <TextField
                id="default-value"
                label="Email "
                variant="outlined"
                defaultValue="user1"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                id="default-value"
                label="Groupes "
                variant="outlined"
                defaultValue="user1"
                fullWidth
                sx={{
                  mb: 2,
                }}
                value={groupes}
                onChange={(e) => setGroupes(e.target.value)}
                error={formErrors.groupes}
                helperText={formErrors.groupes}
              />
              <TextField
                id="default-value"
                label="Adresse "
                variant="outlined"
                defaultValue="user1"
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
                defaultValue="user1"
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
                defaultValue="user1"
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
                <Button color="success" variant="contained" onClick={handleSubmit}>
                  Ajouter
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
