import React, { useState } from 'react';
import {Grid} from '@material-ui/core/'
import './App.css';
import "normalize.css"; // needed for blueprint
import BugForm from './components/bugs/BugForm';
import EditBug from './components/bugs/EditBug';
import Navhead from './components/shared/Navhead';
import Footer from './components/footer/Footer';
import Home from './components/shared/Home';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Container, Row, Col } from 'reactstrap';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#000000',
      dark: '#000000',
      contrastText: '#000000',
    },
    secondary: {
      light: '#0046383a',
      main: '#0046383a',
      dark: '#0046383a',
      contrastText: '#0046383a',
    }
  },
});

const App = () => {
  
  const [ counter, setCounter ] = useState(0);

  function setToValue(value) {
      return () => setCounter(value);
   }
  
  return (
      <Router>
        <ThemeProvider theme={theme}>
          <Navhead />
          <Container className="content">
            <Row>
                <Col>
                  <Switch>
                    <Route path="/" exact children={<Home />} />
                    <Route path="/bug/:id" children={<EditBug />} />                  
                  </Switch>
                </Col>  
            </Row>
          </Container>
          <Footer />
          </ThemeProvider>
      </Router>
  )
}

export default App;

{/* <Router>
<ThemeProvider theme={theme}>
<Grid container>
  <Grid container>
    <Nav />
  </Grid>
  <Grid container  direction="column" justify="flex-start" alignItems="flex-start" className="content">
    <Switch>
      <Route path="/" exact children={<Home />} />
      <Route path="/bug/:id" children={<EditBug />} />                  
    </Switch>
  </Grid>
  <Grid container direction="column" alignItems="center" justify="center" className="footer">
    <Footer />
  </Grid>
</Grid>
</ThemeProvider>
</Router> */}