import './App.css'
import { AppBar, Toolbar, Typography } from "@mui/material"
import CustomerList from './Components/CustomerList'
import TrainingList from './Components/TrainingList';


function App() {

  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Training</Typography>
        </Toolbar>
      </AppBar>
      <TrainingList />
      <CustomerList />
    </>
  );
}

export default App
