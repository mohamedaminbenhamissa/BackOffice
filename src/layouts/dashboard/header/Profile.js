import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// @mui

import {
  Card,
  Table,
  Stack,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
// components

import Scrollbar from '../../../components/scrollbar';
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';

const TABLE_HEAD1 = [{ id: 'prenom', label: 'Prenom : ', alignRight: false }];
const TABLE_HEAD2 = [{ id: 'nom', label: 'Nom : ', alignRight: false }];
const TABLE_HEAD3 = [{ id: 'email', label: 'Email : ', alignRight: false }];

export default function Profile() {
  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('prenom');

  const [members, setMembres] = useState([]);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/api/users/users/${userId}`);
      console.log('data----------', response.data.email);
      setFirstname(response.data.firstname);

      setLastname(response.data.lastname);
      setEmail(response.data.email);
      // setGroupes(response.data.data.data.groupes)
      console.log('ok ****************** ', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
        </Stack>
        <Card sx={{ width: 500, margin: 'auto' }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 500, width: 100 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD1} />
                <br />

                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>{firstname}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <UserListHead headLabel={TABLE_HEAD2} />
                <br />

                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>{lastname}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table>
                <UserListHead headLabel={TABLE_HEAD3} />
                <br />

                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: 'center' }}>{email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
