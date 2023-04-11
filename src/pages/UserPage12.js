import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState , useEffect } from 'react';
import axios from "axios";

// @mui

import {
  Card,
  Table,
  Stack,
  Paper,
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
  TablePagination,
} from '@mui/material';
// components

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar  } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import  AddUserForm from '../sections/@dashboard/user/UserForm'
import MembreService from '../services/membres'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
 
  { id: 'prenom', label: 'Prenom', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'groupes', label: 'Groupes', alignRight: false },
  { id: 'adresse', label: 'Adresse', alignRight: false },
  { id: 'ville', label: 'Ville', alignRight: false },
  { id: 'pays', label: 'Pays', alignRight: false },
  { id: 'codePostal', label: 'Code Postal', alignRight: false },
  { id: 'tel', label: 'Téléphone', alignRight: false },
  { id: 'formation', label: 'Formation', alignRight: false },
  { id: '' },

];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.nom.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [showForm, setShowForm] = useState(false);
  
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('prenom');

  const [filternom, setFilternom] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [members , setMembres] = useState([])

  

  useEffect(() => {
   getAllMembreFromBack()
  }, []);
const getAllMembreFromBack = ()=> {

axios.get("http://localhost:3003/api/allmembre")
.then((res)=> {
  console.log("*************",res.data.data)
})
}
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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.prenom);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, prenom) => {
    const selectedIndex = selected.indexOf(prenom);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, prenom);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };


  const handleShowForm = () => {
    setShowForm(true);
  };
const hadnldeCloseForm = () => {
  setShowForm(false);
}

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterBynom = (event) => {
    setPage(0);
    setFilternom(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filternom);

  const isNotFound = !filteredUsers.length && !!filternom;

  return (
    <>
      <Helmet>
        <title> Utilisateur  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Utilisateurs
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleShowForm}>
        Nouvel utilisateur
      </Button>
      <Button onClick={hadnldeCloseForm}>Close</Button>
      <AddUserForm showForm={showForm} />
      
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filternom={filternom} onFilternom={handleFilterBynom} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, prenom, nom, email, groupes,adresse,ville,pays,codePostal,tel,formation } = row;
                    const selectedUser = selected.indexOf(prenom) !== -1; */}
                   
{

members.map((member) => { 
  const selectedUser = selected.indexOf(member.prenom) !== -1;
                    return (
                      <TableRow hover key={member._id} tabIndex={-1} prenom="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, member.prenom)} /> */}
                        </TableCell>


                        <TableCell align="left">{member.fname}</TableCell>                  

                        {/* <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{groupes}</TableCell>

                        <TableCell align="left">{adresse}</TableCell>

                        <TableCell align="left">{ville}</TableCell>
                          
                        <TableCell align="left">{pays}</TableCell>

                        <TableCell align="left">{codePostal}</TableCell>

                        <TableCell align="left">{tel}</TableCell>

                        <TableCell align="left">{formation}</TableCell> */}

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                          Pas trouvé
                          </Typography>

                          <Typography variant="body2">
                          Aucun résultat trouvé pour &nbsp;
                            <strong>&quot;{filternom}&quot;</strong>.
                            <br /> Essayez de vérifier les fautes de frappe ou d'utiliser des mots complets.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Modifier
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Supprimer
        </MenuItem>
      </Popover>
    </>
  );
}

