import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {initializeCountries} from "../features/countries/countriesSlice";
import Header from "../components/Header";

import { Box, CircularProgress } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ImageListItem from "@mui/material/ImageListItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);
  console.log(countriesList);

  const columns = [
    { id: 'flag', label: 'Flag', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'region', label: 'Region', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 100,
      // align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'languages',
      label: 'Languages',
      minWidth: 100,
      // align: 'right',
    },
    {
      id: "detail",
      label: "Detail",
      minWidth: 100,
      //   align: "right",
    },
  ];

  const rows =
    countriesList &&
    countriesList
      .filter((row) => {
        if (
          row.name.common
            .toLowerCase()
            .includes(searchInput.toLowerCase().trim())
        ) {
          return createData(row);
        }
      })
      .sort((a, b) => {
        let na = a.name.common;
        let nb = b.name.common;
        if (na < nb) {
          return -1;
        }
        if (na > nb) {
          return 1;
        }
        return 0;
      })

      .map((row) => createData(row));

      const handleCountryDetail = (row) => {
        const country = row.name.common;
        navigate(`/countries/${country}`);
        return row;
      };

  function createData(row) {
    const flag = (
      <ImageListItem sx={{ width: 80, hight: 45 }}>
        <img src={row.flags.png} alt={row.fifa} loading="lazy" />
      </ImageListItem>
    );
    const detail = (
      <Tooltip title="See more">
        <IconButton onClick={() => handleCountryDetail(row)}>
            <ChevronRightIcon sx={{ fontSize: 20, color: "black" }} />   
        </IconButton>
      </Tooltip>
    );
    const languages = Object.values(row.languages || {}).map((language) => (
      <div key={language}>
        <li>{language} </li>
      </div>
    ));

    return {
      flag,
      name: row.name.common,
      region: row.region,
      population: row.population,
      languages,
      detail,
    };
  }
   
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isLoading) {
    return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
       <Header />
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow 
                  hover 
                  role="checkbox" 
                  tabIndex={-1} 
                  key={row.code}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}



export default Countries;