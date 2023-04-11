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
  { id: 'id', label: 'Id Foramtion', alignRight: false },
  { id: 'nom', label: 'Nom Foramtion', alignRight: false },
  { id: 'uniqid', label: 'Uniq Id', alignRight: false },
  { id: 'nbrp', label: 'Apprenants', alignRight: false },
  { id: 'nbm', label: 'Nombre des Modules', alignRight: false },
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
        <title> Formation </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Formation
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
                   
                     <TableCell>{formations.idFormation}</TableCell>
                      <TableCell>{formations.nomFormation}</TableCell>
                      <TableCell>{formations.uniqid}</TableCell>
                      <TableCell >{formations.non_admin_users_count}</TableCell>
                      <TableCell>{formations.modules_count}</TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      
    </>
  );
}
