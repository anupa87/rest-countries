import React from "react";
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import Layout from "./pages/Layout";
import Countries from "./components/Countries";
import CountryDetail from "./components/CountryDetail";

const App= () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route exact path='/' element= {<Layout/>}>
      <Route path='/' element= {<Countries/>}/>
      <Route path='/countries/:country' element= {<CountryDetail/>}/> 
    </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
