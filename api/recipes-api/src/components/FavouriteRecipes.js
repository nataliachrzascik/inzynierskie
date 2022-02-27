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
import Button from '@mui/material/Button';

const FavouriteRecipes =(props)=> {
    console.log(props.data);

    const [succesFavourite, setSuccesFavourite] = useState(false);
    const [favouriteRecipes, setFavouriteRecipes] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
   

    useEffect(() => {

            console.log("succes data");
            props
            .dispatch(
              getFavouriteRecipes(props.data)
            )
            .then((res) => {
              console.log("resssss");
              setFavouriteRecipes(res.data.recipe);
             if(res.data.recipe===[]){
                setIsEmpty(true);
             }
              setSuccesFavourite(true);
            })
            .catch(() => {
              setSuccesFavourite(false)
            });


        },[]);
        

        return (
            <>
             <h1>ULUBIONE PRZEPISY:</h1>
             
          {succesFavourite ? (
        isEmpty?(
          favouriteRecipes.map((element, k) => {
            return (
              <div key={k} className="card">
              <img className="card-img-top" src={element.file ? element.file : background} alt="Card image" />
             <div className="card-body">
              <h5 className="card-title">{element.title}</h5>
             
              <Link to={{ pathname: `/mainPage/recipe/${element._id}`, query: { recipe: element }  }}>
                  <Button variant="outlined">Zobacz przepis</Button>
              </Link>
             </div>
          </div>
        )})
 ):(<h1>Brak ulubionych przepisów</h1>)
        ):
          (
            <i className="fas fa-4x fa-spinner fa-spin"></i>
          )
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
          
export default connect(mapStateToProps)(FavouriteRecipes);