import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./App.css";

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "@material-ui/core";

const countriesURL = "https://restcountries.eu/rest/v2/all";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const classes = useStyles();

  const getCountriesWithAxios = async () => {
    const response = await axios.get(countriesURL);
    console.log(response)
    setCountriesData(response.data);
    setCountriesData(response.data);
  };

  useEffect(() => {
    getCountriesWithAxios();
  }, []);

  const [state, setState] = React.useState();
  const [specific_data, setCon] = React.useState({});
  const [border, setBor] = React.useState([]);
  const [language, setLan] = React.useState([]);

  const toggleDrawer = (open, cont) => (event) => {
    setState(open);
    setCon(cont);
    if (open === true) {
      setBor(cont.borders);
      setLan(cont.languages);
    }
  };

  const list = (data) => (
    <div
      role="presentation"
      onClick={toggleDrawer(false,{})}
      onKeyDown={toggleDrawer(false,{})}
    >
      <List>
          <ListItem button> <ListItemText>Country : {data.name} </ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Country Flag : <img src={data.flag} alt="" width="32px" /></ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Capital : {data.capital}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Alpha 2 Code : {data.alpha2Code}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Alpha 3 Code : {data.alpha3Code}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Calling Code : {data.callingCodes}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Capital : {data.capital}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Region : {data.region}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Subregion : {data.subregion}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Area : {data.area}</ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Area Timezone : {data.timezones}  </ListItemText></ListItem>
          <Divider />
          <ListItem button> <ListItemText>Total Population : {data.population}</ListItemText></ListItem>
          <Divider />
          <ListItem button>
          <ListItemText primary="Borders" />
          </ListItem>
          {border.map((text, i) => (
          <ListItem button className={classes.nested} key={"text-" + i}>
            {text}
          </ListItem>
          ))}
          <Divider />
          <ListItem button>
          <ListItemText primary="Languages" />
          </ListItem>
          {language.map((text, index) => (
          <ListItem button className={classes.nested} key={index}>
            <ListItemText secondary={text.name} />
          </ListItem>
          ))}

      </List>
    </div>
  );

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Flag</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Capital</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Population</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Region</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countriesData.map((country) => (
                  <TableRow>
                    
                    <TableCell component="th" scope="row">
                      <div>
                        <Link onClick={toggleDrawer(true,country)}>
                          {country.name}
                        </Link>
                      </div>
                      
                    </TableCell>
                    
                    <TableCell align="right">
                      <img src={country.flag} alt="" width="32px" />
                    </TableCell>
                    <TableCell align="right" >{country.capital}</TableCell>
                    <TableCell align="right">{country.population}</TableCell>
                    <TableCell align="right">{country.region}</TableCell>
                  </TableRow>
                ))}
                 <Drawer
                  anchor={"right"}
                  open={state}
                  onClose={toggleDrawer(false,{})}
                  >
                  {list(specific_data)}
                  </Drawer>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
    
  );
}
 

export default App;



