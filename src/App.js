import InfoBox from './InfoBox'
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core"
import './App.css';
import React,{useState,useEffect} from "react";

// https://disease.sh/v3/covid-19/countries


function App() {
  const [countries,setCountries]= useState([]);
  const [country,setCountry] = useState('worldwide')

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          ))
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = (event)=>{
    const countryCode = event.target.value;
    console.log(`hello ${countryCode}`)
    setCountry(countryCode);
  }
  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid-19-Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}>
              <MenuItem value = "worldwide">WorldWide</MenuItem>
            {
              countries.map((country)=>(
                <MenuItem value ={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title = "coronavirus cases"/>

        
        <InfoBox title="Recovered" />


        <InfoBox title="Deaths" />



      </div>      
    </div>
  );
}

export default App;
