import InfoBox from './InfoBox';
import Table from './Table';
import Map from './Map';
import {sortData} from "./util";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import './App.css';
import React,{useState,useEffect} from "react";

// https://disease.sh/v3/covid-19/countries
// https://disease.sh/v3/covid-19/all



function App() {
  const [countries,setCountries]= useState([]);
  const [country,setCountry] = useState('worldwide')
  const [countryInfo,setCountryInfo]= useState({})
  const [tableData,setTableData]=useState([])

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all' )
    .then(response => response.json())
    .then(data=>{
      setCountryInfo(data);
    })

  },[])
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
          const sortedData = sortData(data)
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

      });
  };
  console.log("country info",countryInfo)
  return (
    <div className="app">
      <div className="app__left">      
      <div className="app__header">
        <h1>Covid-19-Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            onChange={onCountryChange}
            value={country}>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
        <div className="app__stats">
          <InfoBox title="coronavirus cases" cases = {countryInfo.todayCases} total = {countryInfo.cases}/>


          <InfoBox title="Recovered" cases = {countryInfo.todayRecovered} total = {countryInfo.recovered}/>


          <InfoBox title="Deaths"  cases= {countryInfo.todayDeaths} total = {countryInfo.deaths}/>



        </div>
        <Map />  
        </div>
        <Card className="app__right">
          <CardContent>
          <h3>Live cases by Country</h3>
          <Table countries={tableData}></Table>
          <h3>WorldWide New Case</h3>
          <LineGraph/>
        </CardContent>

        </Card>

    </div>
  );
}

export default App;
