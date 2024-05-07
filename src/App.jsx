import './App.css'
import { AppBar, Toolbar, Typography } from "@mui/material"
import CustomerList from './Components/CustomerList'
import TrainingList from './Components/TrainingList';
import { Link, Outlet } from 'react-router-dom';


function App() {

  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Training</Typography>
          <nav>
            <Link to={"/CustomerList"}>Customers</Link>
            <Link to={"/TrainingList"}>Trainings</Link>
            <Link to={"/Calendar"}>Calendar</Link>
            <Link to={"./TrainingCharts"}>Training Charts</Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default App
