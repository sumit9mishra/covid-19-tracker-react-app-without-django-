import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core"
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Covid-19-Tracker</h1>

      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="sumit">
          <MenuItem value ="WorldWide">WorldWide</MenuItem>
          <MenuItem value="WorldWide">One</MenuItem>
          <MenuItem value="WorldWide">Two</MenuItem>
          <MenuItem value="WorldWide">Three</MenuItem>

        </Select>
      </FormControl>

      

    </div>
  );
}

export default App;
