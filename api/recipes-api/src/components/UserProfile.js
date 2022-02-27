import React, {useState,useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {Link, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { getUserProfile} from "../actions/auth";
import { getMyRecipes} from "../actions/auth";

import background from "./images/pot.jpg";
import user from "./images/user.png";
import { Button } from "@mui/material";

const UserProfile =(props)=> {


  const [succes, setSucces] = useState(false);
  const [profileData, setProfileData] = useState([]);

  const [recipes, setRecipes] = useState([]);
  const [recipeSucces, setRecipeSucces] = useState(false);

  useEffect(() => {
const path= props.location.pathname.slice(16);
props
.dispatch(
  getUserProfile(path)
)
.then((res) => {
  setProfileData(res.data.data[0]);
  setSucces(true);
})
.catch(() => {
  setSucces(false)
});

props
.dispatch(
    getMyRecipes(path)
  )
.then((res) => {
  setRecipes(res.data.recipe);
  setRecipeSucces(true);
})
.catch(() => {
  setRecipeSucces(false)
});


  },[]);

    const { user: currentUser } = props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    const { message } = props;

    return (
        <>
      <h1>hejoo</h1>
      {succes?(
          <div>
          <h1>Nick: {profileData.username}</h1>
          {profileData.file?<img src={profileData.file}></img>:<img src={user}></img>}
          {profileData.name?<h5>Imię: {profileData.name}</h5>:null}
          {profileData.sex?<h5>Płeć: {profileData.sex}</h5>:null}
          {profileData.city?<h5>Miasto: {profileData.city}</h5>:null}
          {profileData.descryption?<h5>O mnie: {profileData.descryption}</h5>:null}
        </div>
      ): <i className="fas fa-4x fa-spinner fa-spin"></i>}
<h1>Dodane przepisy</h1>
      {recipeSucces?(
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
      )): <p>Brak</p>}
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