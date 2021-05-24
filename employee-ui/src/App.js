import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from './components/LoginComponent/LoginComponent';
import AdminComponent from './components/AdminComponent/AdminComponent';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import EmployeeComponent from './components/EmployeeComponent/EmployeeComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {
  return (
    <div className="App">
  
      <div className="container-fluid">
      <Router>
        <Switch>
          <Route exact path="/">
            <LoginComponent></LoginComponent>
          </Route>
          <Route  path="/login">
            <LoginComponent></LoginComponent>
          </Route>
          <Route  path="/adminPage">
            <HeaderComponent></HeaderComponent>
            <AdminComponent></AdminComponent>
          </Route>
          <Route  path="/employeePage">
            <HeaderComponent></HeaderComponent>
            <EmployeeComponent></EmployeeComponent>
          </Route>
        </Switch>
      </Router>
        </div>
        
        </div>
  );
}

export default App;
