import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {initializeCountries, search} from "../features/countries/countriesSlice";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Countries = () => {
  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);
  return (
    <div>Countries</div>
  )
}

export default Countries