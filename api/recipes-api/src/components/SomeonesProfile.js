import React, {useState,useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {Link, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { getUserProfile} from "../actions/auth";
import { getMyRecipes} from "../actions/auth";
import {addToFriends} from "../actions/auth";
import {isFriends} from "../actions/auth";
import {getMyData} from "../actions/auth";

import background from "./images/user.png";
import store from '../store';
import { Button } from "@mui/material";

const UserProfile =(props)=> {


  const [succes, setSucces] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [recipeSucces, setRecipeSucces] = useState(false);

  const [isExist, setIsExist] = useState(true);
  const [buttonAddToFriends, setButtonAddToFriends] = useState(true);
  //moze sekcja- dodaj do znajomych

  useEffect(() => {
     const nick= props.location.pathname.slice(props.location.pathname.lastIndexOf('/')+1);
     const yourNick=store.getState().auth.user.username;
     if(nick===yourNick){
        setButtonAddToFriends(false);
     }
     const myID = store.getState().auth.user.id;

props
.dispatch(
  getMyData(yourNick)
    //zarzuc tu  getMyData(nick) i porowaj sobie czy sa takie nicki - do favourites tez
)
.then((res) => {
  const friends= res.data.data[0].friends;
  const found = friends.find(element => element.friendID===nick);
  if(found!==undefined){
    setButtonAddToFriends(false);
  }
})
.catch(() => {
 console.log("error in friend");
});
     

props
.dispatch(
  getUserProfile(nick)
)
.then((res) => {
    if(res.data.data.length===0){
        setIsExist(false);
    }
  setProfileData(res.data.data[0]);
  setSucces(true);
})
.catch(() => {
  setSucces(false)
});

props
.dispatch(
    getMyRecipes(nick)
  )
.then((res) => {
  setRecipes(res.data.recipe);
  setRecipeSucces(true);
})
.catch(() => {
  setRecipeSucces(false)
});



  },[]);

  const functionFriends=()=>{
    const myID=store.getState().auth.user.id;
    const friendName=props.location.pathname.substring(props.location.pathname.lastIndexOf('/')+1);

    props
    .dispatch(
        addToFriends(myID,friendName)
    )
    .then(() => {
        console.log("dodano do przyjaciół");
    })
    .catch(() => {
        console.log("nie dodano do przyjaciół");
    });

      
  }

    const { user: currentUser } = props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    const { message } = props;

    return (
        <>
         {isExist?(
      succes?(
        <div>
        <h1>Nick: {profileData.username}</h1>
        {buttonAddToFriends && (
          <>
        <Button onClick={functionFriends}>Dodaj do znajomych</Button>
        {message && (
              <div className="form-group">
                <div className={ succes ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
        </>
        )
        }
        {profileData.file?<img className="profilePhoto" src={profileData.file} />:<img className="profilePhoto" src={background} />}
        {profileData.name?<h5>Imię: {profileData.name}</h5>:<h5>IMIĘ: Nie podano</h5>}
        {profileData.sex?<h5>Płeć: {profileData.sex}</h5>:<h5>PŁEĆ: Nie podano</h5>}
        {profileData.city?<h5>Miasto: {profileData.city}</h5>:<h5>MIASTO: Nie podano</h5>}
        {profileData.descryption?<h5>O mnie: {profileData.descryption}</h5>:<h5>O MNIE: Nie podano</h5>}
      </div>
    ): (<i className="fas fa-4x fa-spinner fa-spin"></i>)
         ):(
        <h1>Konto zostało usunięte</h1>
         )
        }
         {isExist && <h1>DODANE PRZEPISY</h1>}
         {isExist && (
     recipeSucces?(
        recipes.map((element, k) => {
                    return (
                        <div key={k} className="card">
                            <img className="card-img-top" src={element.file ? element.file : background} alt="Card image" />
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                <Link style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}} to={{ pathname: `/mainPage/recipe/${element._id}`, query: { recipe: element }  }} >
                                    <Button variant="outlined">Zobacz przepis</Button>
                                </Link>
                            </div>
                        </div>
                    )
                }
      )): <p>Brak</p> )
        }
     </>
    );
    
  }


function mapStateToProps(state) {
  const { user } = state.auth;
  const { message } = state.message;
  return {
    user,
    message
  };
}

export default connect(mapStateToProps)(UserProfile);