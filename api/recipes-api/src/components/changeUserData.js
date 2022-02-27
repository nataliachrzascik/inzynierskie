import React, {useState,useEffect} from "react";
import {Link, Route } from "react-router-dom";
import { connect } from "react-redux";

import { changeMyPesonalData } from "../actions/auth";

import store from '../store';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const ChangeUserData=(props)=> {
  

    const [recipes, setRecipes] = useState([]);
    const [succes, setSucces] = useState(false);

    const [name, setName] = useState("");
    const [sex, setSex] = useState("Kobieta");
    const [city, setCity] = useState("");
    const [descryption, setDescrytpion] = useState("");
    const [file, setFile] = useState("");
  const [fileImage, setFileImage] = useState("");

    const onChangeCity=(e)=> {
        setCity(e.target.value);
      }
    
      const onChangeSex=(e)=> {
        setSex(e.target.value);
      }
      const onChangeDescryption=(e)=> {
        setDescrytpion(e.target.value);
      }
     const onChangeName=(e)=> {
      setName(e.target.value);
      }
      const onChangeFileImg=(e)=> {
        console.log("e.value")
        console.log(e.value)
        setFileImage(e.target.value);
      }

      const dataFromStore = store.getState();
      const activeUser = dataFromStore.auth.user.id;
      
      const handleDataChange=(e)=> {
        e.preventDefault();
        setSucces(false);
        props
            .dispatch(
              changeMyPesonalData(activeUser, name, sex, city,  descryption, file)
            )
            .then(() => {
              setSucces(true);
              window.location.reload();
            })
            .catch(() => {
              setSucces(false)
            });
      }

      function readFile(){
        if (this.files && this.files[0]) {
          
          var FR= new FileReader();
          
          FR.addEventListener("load", function(e) {
            setFile(e.target.result);
            document.getElementById("img").src= e.target.result;
          }); 
          FR.readAsDataURL( this.files[0] );
        }
        
      }

    useEffect(() => {
        document.getElementById("inp").addEventListener("change", readFile);
        
      },[file]);

      const { message } = props;

    return (<>
        <Link to={{ pathname: `/profile`  }}><Button variant="contained">X</Button></Link>
<h1>Zmień swoje dane osobowe</h1>

            <form method="POST" encType="multipart/form-data" onSubmit={handleDataChange} >   
            <TextField label="Imię"  variant="outlined" name="name" placeholder="Imię"  onChange={onChangeName}/><br />
                <p>Wybierz płeć:</p>
                <Select name="sex" onChange={onChangeSex}>
                <MenuItem value="female">Kobieta</MenuItem>
                <MenuItem value="male">Mężczyzna</MenuItem>
                <MenuItem value="other">Inne</MenuItem>
                </Select>
                <br />
                <TextField variant="outlined"  label="Miasto"  name="city" placeholder="Miasto"  onChange={onChangeCity}/><br />
                <TextField className="longLabel" multiline variant="outlined" label="Opis mnie" name="descryption" placeholder="Opis mnie"  onChange={onChangeDescryption}/><br />
                <p>Zdjęcie profilowe:</p>
               <input id="inp" type='file' /><br />
                  <img id="img" height="150" alt="images"></img>
                <br />
                <br />
                <input hidden name="fileValue" value={file}/>
                <Button variant="contained" type="submit">Wyślij zmiany</Button>
                </form>
</>
    )
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(ChangeUserData);
