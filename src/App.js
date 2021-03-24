
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar, Nav, Container,
} from 'react-bootstrap';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import RequestPark from "./RequestPark"
import Report from "./Report"

function App() {
  return (
    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand><Link to="/">SPR System</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link><Link to="/request">Request</Link></Nav.Link>
            <Nav.Link><Link to="/report">Report</Link></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="#memes">
              Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Route path="/request">
          <RequestPark />
        </Route>
        <Route path="/report">
          <Report />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <Container>
      <br />
      <h1>Welcome to SMV Parking Request System</h1><br />
      <h2>Apitsara Choppradit ID: 5710497</h2>
    </Container>
  )
}

export default App;
