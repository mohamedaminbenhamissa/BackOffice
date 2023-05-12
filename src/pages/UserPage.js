import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

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
import {afficheUser} from '../slices/SliceUser'
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import AddUserForm from '../sections/@dashboard/user/UserForm';
import UpdateUserForm from '../sections/@dashboard/user/UserUpdate'; 

const TABLE_HEAD = [
  { id: 'id', label: 'Id Apprenant', alignRight: false },
  { id: 'prenom', label: 'Prenom', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'formation', label: 'Formation', alignRight: false },
  { id: '' },
];

export default function UserPage() {
  const [showForm, setShowForm] = useState(false);

  const [showFormUpdate , setShowFormUpdate] = useState(false);

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('prenom');

  const [filternom, setFilternom] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [members, setMembres] = useState([]);

  const [membreId, setMembreId] = useState(localStorage.getItem("membreId"));
  
  const [query, setquery] = useState("");
  const amin=useSelector(state => state.user)
  const dispatch = useDispatch()

  const navigate = useNavigate();


  useEffect(() => {
    getAllMembreFromBack();

  }, []);
  const getAllMembreFromBack = () => {
    axios.get('http://localhost:3003/api/allmembre').then((res) => {
      setMembres(res.data.data.data);

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
    console.log("**********memebreId******",membreId);
  };
  const handleShowFormUpdate = (membreId) => {
    localStorage.setItem("membreId",membreId);
    console.log("**********memebreId******",membreId);
    setShowFormUpdate(!showFormUpdate);
    
  };

  const update = (id) => {
    console.log("okkk updated");
    
    navigate(`/dashboard/UserUpdate/${id}`, { state: { id } });

  };
  
  const supprimerUtilisateur = async (membreId) => {
  
        console.log("ok supprimer", membreId);
        Swal.fire({
          title: "Vous-êtez sûr??",
          text: "Vous ne pourrez pas revenir en arrière!",
          icon: "avertissement",
          showCancelButton: true,
          confirmButtonColor: "#00ff00",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, supprimez-le!",
        }).then((result) => {
          if (result.isConfirmed) {

            axios.delete(`http://localhost:3003/api/formations/:66594/membres/${membreId}`)
           
            .then((res) => {
              console.log(res.status);
              console.log("resposne", res);
              if (res.status === 200) {
                // getAll();
                // getAllMembreFromBack();
                //  event.preventDefault();
                Swal.fire("Supprimé!", "Votre fichier a été supprimé.", "Succès");
                
              }
              window.location.reload(true);  
              toast.error("Supprimé avec succées", { position: "top-center" }); 
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
    theme="light"/>
      <Helmet>
        <title> Utilisateur </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Utilisateurs
          </Typography>
          
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShowForm}>
            Nouvel utilisateur
          </Button>
          <Popover
            open={Boolean(showForm)}
            anchorEl={showForm}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 700,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <AddUserForm show={showForm} setShow={setShowForm} />
          </Popover>
        </Stack>
        <Card>
          <UserListToolbar numSelected={selected.length} filternom={filternom} onFilternom={handleFilterBynom} />
          
          {/* //  <input placeholder='serach' onChange={event => setquery(event.target.value)}/> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} />

                <TableBody>
                  {members
                  .map((member) => (
                    <TableRow hover key={member.user.user_id}>
                    
                      <TableCell>{member.user.user_id}</TableCell>
                      <TableCell>{member.user.fname}</TableCell>
                      <TableCell>{member.user.lname}</TableCell>
                      <TableCell>{member.user.email}</TableCell>
                      <TableCell>Corpus LS</TableCell>
                      <TableCell align="right">

                        {/* <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton> */}
        <MenuItem onClick={(e) => update(member.user.user_id)}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}  />
          Modifier
        </MenuItem>
        <Popover
            open={Boolean(showFormUpdate)}
            anchorEl={showFormUpdate}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 700,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <UpdateUserForm showupdate={showFormUpdate} setShowupdate={setShowFormUpdate}  />
          </Popover>
        <MenuItem sx={{ color: 'error.main' }} onClick={(e) => supprimerUtilisateur(member.user.user_id)}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>
     
                     
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* <p>{amin.email}oooooooooooooooooooooo</p> */}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        {/* <MenuItem onClick={handleShowForm}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }}  />
          Modifier
        </MenuItem>
        <Popover
            open={Boolean(showForm)}
            anchorEl={showForm}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 700,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <AddUserForm show={showForm} setShow={setShowForm} />
          </Popover>
        <MenuItem sx={{ color: 'error.main' }} onClick={(e) => supprimerUtilisateur()}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Supprimer
        </MenuItem> */}
      </Popover>
    </>
  );
}
