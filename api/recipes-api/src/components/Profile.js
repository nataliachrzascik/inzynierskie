import React, {useState,useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {Link, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { getMyRecipes} from "../actions/auth";
import { getMyData} from "../actions/auth";
import { getFavouriteRecipes} from "../actions/auth";
import ChangeUserData from "./changeUserData";
import background from "./images/pot.jpg";
import FavouriteRecipes from './FavouriteRecipes';
import { Button } from "@mui/material";

const Profile =(props)=> {

  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [succes, setSucces] = useState(false);
  const [succesData, setSuccesData] = useState(false);
  const [succesFavourite, setSuccesFavourite] = useState(false);
  let favouriteRecipes = [];

  useEffect(() => {
const nick=currentUser.username;
props
.dispatch(
  getMyRecipes(nick)
)
.then((res) => {
  setRecipes(res.data.recipe);
  setSucces(true);
})
.catch(() => {
  setSucces(false)
});

props
.dispatch(
  getMyData(nick)
)
.then((res) => {
  setData(res.data.data);
  setSuccesData(true);


})
.catch(() => {
  setSuccesData(false)
});



  },[]);




    const { user: currentUser } = props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    const { message } = props;

    return (
      <>
      <div className="container">
        <header className="jumbotron jumbophoto">
          <h3>
            <strong>{currentUser.username}</strong>
          </h3>
        </header>
        {succesData ? (
          <>
        <div className="spaceX" />
        {<img className="profilePhoto" src={data[0].file?data[0].file:background} alt="images"></img>}
        <div className="spaceX" />
        <p>
          <strong>EMAIL:</strong> {currentUser.email}
        </p>
        <p>
          <strong>IMIĘ:</strong>{data[0].name?data[0].name:" nie podano"}
        </p>
        <p>
          <strong>PŁEĆ:</strong>{data[0].sex?data[0].sex:" nie podano"}
        </p>
        <p>
          <strong>MIASTO:</strong>{data[0].city?data[0].city:" nie podano"}
        </p>
        <p>
          <strong>O MNIE:</strong>{data[0].descryption?data[0].descryption:" nie podano"}
          <p>
          <div className="spaceX" />
          <Link style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}} to={{ pathname: `/profile/changeData/${currentUser.username}`  }}><Button variant="outlined">Zmień dane osobowe</Button></Link><br />
          <div className="spaceX" />
      <Route path="/profile/changeData/" component={ChangeUserData}></Route>
          <h1>ZNAJOMI:</h1>
          <div className="spaceX" />
          {
            data[0].friends.length!==0?(
              data[0].friends.map((element, k) => {
                return (
                    <div key={k}>
                            <Link style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}} to={`/userAccount/${element.friendID}`} >
                                <h4>{element.friendID}</h4>
                            </Link>
                    </div>
                )
            })
            ):
            (<h4>Brak znajomych</h4>)
          }
<div className="spaceX" />

      
          <FavouriteRecipes data={data[0].favourite} />
         
          <div className="spaceX" />
        </p>
        </p>
        </>
        ):<i className="fas fa-4x fa-spinner fa-spin"></i>}
         {message && (
              <div className="form-group">
                <div className={ succes ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            
             

        <h1>PRZEPISY DODANE PRZEZE MNIE:</h1>
      </div>
      <Container>
            {succes ? (
                recipes?(recipes.map((element, k) => {
                    return (

                        <div key={k} className="card">
                            <img className="card-img-top" src={element.file ? element.file : background} alt="Card image" />
                            <div className="card-body">
                                <h5 className="card-title">{element.title}</h5>
                                {/*<Link to={`/recipe/${element._id}`} params={{ the: 'query11' }} className="btn btn-primary">*/}
                                <Link style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}} to={{ pathname: `/mainPage/recipe/${element._id}`, query: { recipe: element }  }} >
                                    <Button variant="outlined">Zobacz przepis</Button>
                                </Link>
                            </div>
                        </div>
                    )
                })):<p>Brak przepisów</p>
            ) : <i className="fas fa-4x fa-spinner fa-spin"></i>}
        </Container>
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

export default connect(mapStateToProps)(Profile);