import React, { useState, useEffect } from 'react';
import "@blueprintjs/core/lib/css/blueprint.css";
import {Navbar, Nav, NavItem} from "reactstrap";
import { Link } from "react-router-dom";
import '../../App.css';

const Navhead = () => 
{
    return (
    <Navbar className="navBar fixed-top">
      
      <Nav>
      <div style={{alignItems: 'center', justifyContent: 'center'}}>
      <Link to="/" className="bugularLogo" id="bugularTitle">
        Bugular
      </Link>
      
      <Link to="/" className="bugularLogo">
        <img src={'../../bugicon.ico'} alt="React Logo" />
      </Link>
        
   
        </div>
        </Nav>
        
      {/*<Input type='text' id='desc_query' value={bugDescQuery} onChange={handleInput}/>
      <Button type='submit' id='idQuerySubmit' onClick={handleSubmit} variant='outlined' size="small">
          Submit
      </Button>*/}
    </Navbar>)
    
}

export default Navhead