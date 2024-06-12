import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';
// components
import moment from 'moment'
import ChefMoreMenu from '../../sections/@dashboard/user/ChefMoreMenu';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import AdminService from '../../services/AdminService';
// mock
import USERLIST from '../../_mock/user';
import BookingsMoreMenu from '../../sections/@dashboard/user/BookingsMoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'package', label: 'Date', alignRight: false },
  { id: 'package', label: 'Package', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'chef', label: 'Chef', alignRight: false },
  { id: 'guests', label: 'No. OOf Guests', alignRight: false },
  { id: 'guests', label: '', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function BookingsList() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [bookingsList, setBookiingsList] = useState([]);

  const _adminService = new AdminService();

  useEffect(() => {
    async function fetchBookings() {
      const token = await sessionStorage.getItem('authToken');
      _adminService
        .getAllBookings(token)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((responseJson) => {
          console.log('GET-CHEFS-RESPONSE-JSON|RESPONSE', responseJson);
          if (responseJson != null) {
            setBookiingsList(responseJson);
          }
        })
        .catch((error) => {
          console.log('GET-CHEFS-CATCH-ERROR|ERROR', error);
        });
    }
    fetchBookings();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookingsList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookingsList.length) : 0;

  const filteredUsers = applySortFilter(bookingsList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0 && filterName !== '' && filterName != null;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Bookings
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="/dashboard/add/chef" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Chef
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={bookingsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, chefProfile, bookingCost, bookingDate, bookingPackage, clientInfoDto, numberOfGuests } =
                      row;
                    const isItemSelected = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} selected={isItemSelected} aria-checked={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                              alt={`${clientInfoDto?.name} ${clientInfoDto?.surname}`}
                              src={clientInfoDto?.profilePicture}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {`${clientInfoDto?.name} ${clientInfoDto?.surname}`}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{moment(new Date(bookingDate)).format('dddd, MMMM Do YYYY')}</TableCell>
                        <TableCell align="left">{bookingPackage}</TableCell>
                        <TableCell align="left">{bookingCost}</TableCell>
                        <TableCell align="left">{`${chefProfile?.name} ${chefProfile?.surname}`}</TableCell>
                        <TableCell align="left">{numberOfGuests}</TableCell>

                        <TableCell align="right">
                          <BookingsMoreMenu booking={row} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {bookingsList.length === 0 && (
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper>
                          <Typography gutterBottom align="center" variant="subtitle1">
                            Not Bookings Found
                          </Typography>
                          <Typography variant="body2" align="center">
                            There are currently no bookings. &nbsp;
                         
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
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
    </Page>
  );
}
