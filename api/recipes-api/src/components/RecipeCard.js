import React, {useState,useEffect,} from 'react';

import { BrowserRouter, Route, NavLink, Switch, Link, Redirect } from "react-router-dom";
import AddRecipe from "./AddRecipe";
import MainRecipesPage from "./MainRecipesPage";
import { connect } from "react-redux";
import { getItemRecipe} from "../actions/auth";

import { addComment } from "../actions/auth";
import { addToFavourites } from "../actions/auth";

import store from '../store';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';



const RecipeCard=(props)=> {

const [recipes, setRecipes] = useState([]);
const [ready, setReady] = useState(false);

const [comment, setComment] = useState("");
const [succes, setSucces] = useState(false);


let tableContent;

const dataFromStore = store.getState();

const activeUser = dataFromStore.auth.user.username;


const onChangeComment=(e)=> {
    setComment(e.target.value);
  }

  const handleComment=(e)=> {
    e.preventDefault();
    const id=props.location.pathname.substring(17);
    props
        .dispatch(
          addComment(comment,id,activeUser)
        )
        .then(() => {
          setSucces(true)
          setComment("");
        })
        .catch(() => {
          setSucces(false)
        });

        window.location.reload();
  }


useEffect(() => {
   let isWritten=props.location.hasOwnProperty('query');
    let locationRecipe;
    isWritten?locationRecipe=props.location.query.recipe:locationRecipe=null
    
if(locationRecipe){
    //if it is render from button get recipe from props and don't need ask database
    setRecipes(props.location.query.recipe)
    setReady(true)
}
else{
    //ask database for recipe when somebody write a link on your own
    const path=props.location.pathname.substring(17);
    props
    .dispatch(
      
      getItemRecipe(path)
    )
    
    .then((res) => {
       setRecipes(res.data.recipe[0])
      setReady(true);
    })

    .catch((err) => {
        console.log("err in RecipeCard")
        console.log(err)
    });  

}
},[]);



const addToFavouritesRecipe=()=>{
  const userID=store.getState().auth.user.id;
  const recipePath=props.location.pathname.substring(17);
    props
        .dispatch(
          addToFavourites(recipePath,userID)
        )
        .then(() => {
          setSucces(true)
          setComment("");
        })
        .catch(() => {
          setSucces(false)
        });
        
}


const { user: currentUser } = props;
if (!currentUser) {
  return <Redirect to="/login" />;
}

const { message } = props;
    
    return (
        <>
        {ready?(
            < div classname="recipeText">
           <Button variant="outlined" className=" favourite" onClick={addToFavouritesRecipe}>Dodaj do ulubionych</Button>

           {message && (
              <div className="form-group">
                <div className={ succes ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            
            <p><span clasName="recipeTitles">NAZWA DANIA:</span> {recipes.title}</p>
            <p><span clasName="recipeTitles">KATEGORIA:</span> {recipes.category}</p>
            <p><span clasName="recipeTitles">SKŁADNIKI:</span></p>
            {
            tableContent=recipes.ingredients.split(";"),
            tableContent.map((one, k) => {
                return (
                <p key={k}>{one}</p>
                )
                })
            }
                                
            <p><span clasName="recipeTitles">SPOSÓB PRZYGOTOWANIA:</span><br /> {recipes.descryption}</p>
            <p><span clasName="recipeTitles">O DANIU:</span> {recipes.name}</p>
            <img className="recipeImg" src={recipes.file} alt="dish"/>
            <div className="spaceX" />
            <p><span clasName="recipeTitles">NAZWA UŻYTKOWNIKA:</span> {recipes.nick}</p>
            <Link style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}} to={`/userAccount/${recipes.nick}`}><Button variant="outlined">Zobacz profil</Button></Link>
            <div className="spaceX" />
            <div>
                <h1><span clasName="recipeTitles">SEKCJA KOMENTARZY</span></h1>
                <div className="spaceX" />

                <form method="POST" encType="multipart/form-data" onSubmit={handleComment} >
                
               <TextField
          id="commentInput"
          label="Komentarz"
          multiline
          fullWidth
          defaultValue="Napisz komentarz.."
          onChange={onChangeComment}
          value={comment}
        /> <br /><br />
       
                <Button variant="contained" className="sendComment" type="submit">Prześlij komentarz</Button>
               
                </form>
                <div className="spaceX" />

                {recipes.comments?(
              recipes.comments.map((element, k) => (
            <div className="commentBlock" key={k}>
                <NavLink style={{color: 'grey', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}} to={`/mainPage/users/${element.nick}`}><div className="commentNick">{element.nick}</div></NavLink>
              <div style={{display: "inline-block"}}>{element.text}</div>
            </div>
                    ))
                ):null}
            </div>

            </div >

        ):<i className="fas fa-4x fa-spinner fa-spin"></i>
        }
        <div className="spaceX" />
        </>

      
    )
}

function mapStateToProps(state) {
  const { user } = state.auth;
    const { message } = state.message;

    return {
      message,
      user

    };
  }
  
  export default connect(mapStateToProps)(RecipeCard);