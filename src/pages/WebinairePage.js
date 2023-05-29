import { Helmet } from 'react-helmet-async';

import { useState, useEffect } from 'react';
import axios from 'axios';

// @mui

import {
  Card,
  Table,
  Stack,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
// components


import Scrollbar from '../components/scrollbar';
import { UserListHead } from '../sections/@dashboard/user';


const TABLE_HEAD = [
  { id: 'id', label: 'Id Webinaire', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'jours', label: 'Jours', alignRight: false },
  { id: 'nbsession', label: 'Nombres des Sessions', alignRight: false },
  { id: 'nbauditeurs', label: 'Nombre des Participants', alignRight: false },
  { id: 'ntype', label: 'Type', alignRight: false },
];

export default function FormationPage() {

  const [formations, setForamtions] = useState([]);


  useEffect(() => {
    getAllFormationFromBack();

  }, []);
  const getAllFormationFromBack = () => {
    axios.get('http://localhost:3003/api/formation/formations').then((res) => {
        setForamtions(res.data.data[0]);
        console.log("*******data*****",res.data.data)
        console.log("idformation",res.data.data[0]._id)
        console.log("idformation",res.data.data[0].idFormation)
        console.log("idformation",res.data.data[0].nomFormation)

    });
  };
  
  return (
    <>
      <Helmet>
        <title> Webinaire </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Webinaire
          </Typography>
        
        </Stack>
        <Card>
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
              <UserListHead  headLabel={TABLE_HEAD} />
                <TableBody>
                  {/* {formations.map((formation) => (
                    <TableRow hover key={formation._id}>
                      <TableCell>{formation.idformation}</TableCell>
                      <TableCell>{formation.nomformation}</TableCell>
                      <TableCell>{formation.uniqid}</TableCell>
                      <TableCell>{formation.non_admin_users_count}</TableCell>
                      <TableCell>{formation.modules_count}</TableCell>
                    </TableRow>
                  ))} */}
                   
                     <TableCell>_</TableCell>
                      <TableCell>_</TableCell>
                      <TableCell>_</TableCell>
                      <TableCell >_</TableCell>
                      <TableCell>_</TableCell>
                      <TableCell>_</TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      
    </>
  );
}
