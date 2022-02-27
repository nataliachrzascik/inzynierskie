import React, { useState,useEffect }  from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
//import addRecipe from "./addRecipe.css";
import { connect } from "react-redux";
import { add } from "../actions/auth";
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import store from '../store';

const AddRecipe =(props)=>{
        
  const [nick, setNick] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("sweets");
  const [ingredients, setIngredients] = useState("");
  const [descryption, setDescrytpion] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [succes, setSucces] = useState("");

  const dataFromStore = store.getState();
  const activeUser = dataFromStore.auth.user.username;

  
    
  useEffect(() => {
    document.getElementById("inp").addEventListener("change", readFile);
    setNick(activeUser);

    
  },[file]);
        
      
      

    
    
      const onChangeTitle=(e)=> {
        setTitle(e.target.value);
      }
    
      const onChangeCategory=(e)=> {
        setCategory(e.target.value);
      }
      const onChangeIngredients=(e) =>{
        setIngredients(e.target.value);
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
      
    
      const handleRegister=(e)=> {
        e.preventDefault();
        setSucces(false);
        props
            .dispatch(
              add(nick, title, category, ingredients, descryption, name, file)
            )
            .then(() => {
              setSucces(true)
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
  const { message } = props;

       
    return (
        <div id="add">
<h1>Dodawanie przepisu</h1>


            <form method="POST" encType="multipart/form-data" onSubmit={handleRegister} >
              <p>Nazwa potrawy:</p>
                <TextField className="longLabel" label="Nazwa potrawy" variant="outlined"  type="text" name="title"  onChange={onChangeTitle}/><br />
                <p>Wybierz kategorię:</p>
                <Select name="category" id="cat" onChange={onChangeCategory}>
                    <MenuItem value="sweets">Słodkości</MenuItem>
                    <MenuItem value="dishes">Dania główne</MenuItem>
                    <MenuItem value="soups">Zupy</MenuItem>
                    <MenuItem value="salads">Sałatki</MenuItem>
                </Select>
                <br />
                <p>Składniki (oddzielone średnikami np. woda;sól):</p>
                <TextField
          label="Składniki"
          name="ingredients"
          className="longLabel"
          multiline
          fullWidth
          onChange={onChangeIngredients}
        /><br />
                
                <p>Opis przygotowania:</p>
                <TextField
          label="Opis przygotowania"
          className="longLabel"
          name="descryption"
          multiline
          fullWidth
          onChange={onChangeDescryption}
        />
                <br />
                <p>Opis zdjęcia:</p>
                <TextField  label="Opis zdjęcia" className="longLabel"  variant="outlined" name="name"   onChange={onChangeName}/><br />
                <p>Zdjęcie potrawy :</p>
               <input id="inp" type='file' /><br />
                  <img id="img" height="150" alt="images"></img>
                <br />
                <br />
                <input hidden name="fileValue" value={file}/>
                <Button variant="contained" type="submit">Wyślij przepis</Button>

                {message && (
              <div className="form-group">
                <div className={ succes ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            </form>

        </div>
    );
}


function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(AddRecipe);