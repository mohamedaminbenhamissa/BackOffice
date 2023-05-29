import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  IconButton,
  TableContainer,
} from '@mui/material';
// components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user';
// mock
import AddUserForm from '../../../sections/@dashboard/user/UserForm';
import UpdateUserForm from '../../../sections/@dashboard/user/UserUpdate';

const TABLE_HEAD = [
  {id:""},
  { id: 'prenom', label: 'Prenom', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'tel', label: 'Téléphone', alignRight: false },
  { id: 'formation', label: 'Formation', alignRight: false },
  
];
Historique.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function Historique({  
 
  
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,}) {
  const [showForm, setShowForm] = useState(false);

  const [showFormUpdate, setShowFormUpdate] = useState(false);

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('prenom');

  const [filternom, setFilternom] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [members, setMembres] = useState([]);

  const [membreId, setMembreId] = useState(localStorage.getItem('membreId'));

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [query, setquery] = useState('');
  const amin = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    getAllMembreFromBack();
  }, []);
  const getAllMembreFromBack = () => {
    axios.get('http://localhost:3003/api/').then((res) => {
      setMembres(res.data);

      console.log('res.data.data.user', res.data.data.data);
    });
  };
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterBynom = (event) => {
    setPage(0);
    setFilternom(event.target.value);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    console.log('**********memebreId******', membreId);
  };
  const handleShowFormUpdate = (membreId) => {
    localStorage.setItem('membreId', membreId);
    console.log('**********memebreId******', membreId);
    setShowFormUpdate(!showFormUpdate);
  };

  const update = (id) => {
    console.log('okkk updated');

    navigate(`/dashboard/UserUpdate/${id}`, { state: { id } });
  };

  const supprimerUtilisateur = async (membreId) => {
    console.log('ok supprimer', membreId);
    Swal.fire({
      title: 'Vous-êtez sûr??',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'avertissement',
      showCancelButton: true,
      confirmButtonColor: '#00ff00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3003/api/formations/:66594/membres/${membreId}`)

          .then((res) => {
            console.log(res.status);
            console.log('resposne', res);
            if (res.status === 200) {
              // getAll();
              // getAllMembreFromBack();
              //  event.preventDefault();
              Swal.fire('Supprimé!', 'Votre fichier a été supprimé.', 'Succès');
            }
            window.location.reload(true);
            toast.error('Supprimé avec succées', { position: 'top-center' });
          });
      }
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
        theme="light"
      />
      <Helmet>
        <title> Historique </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Historique
          </Typography>
        </Stack>
        <Card>
          <UserListToolbar numSelected={selected.length} filternom={filternom} onFilternom={handleFilterBynom} />

          {/* //  <input placeholder='serach' onChange={event => setquery(event.target.value)}/> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />

                <TableBody>
                  {members.map((member) => (
                    <TableRow hover key={member.user_id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={numSelected > 0 && numSelected < rowCount}
                          checked={rowCount > 0 && numSelected === rowCount}
                          onChange={onSelectAllClick}
                        />
                      </TableCell>

                      <TableCell>{member.prenom}</TableCell>
                      <TableCell>{member.nom}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.tel}</TableCell>
                      <TableCell>Corpus LS</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
}
