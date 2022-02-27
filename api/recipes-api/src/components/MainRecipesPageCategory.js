import React,{ useState,useEffect,useRef, useCallback}  from 'react';
//import mainPage from './mainPage.css';
import RecipeCard from './RecipeCard';
import { BrowserRouter, Route, NavLink, Switch, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { connect } from "react-redux";

import { getRecipes} from "../actions/auth";
import axios from 'axios';

import background from "./images/pot.jpg";
import Button from '@mui/material/Button';

const MainRecipesPageCategory=(props)=> {

    
    const [recipes, setRecipes] = useState([]);
    const [ready, setReady] = useState(false);

    let category=props.location.pathname.substring(1);
    let indexOfSlash=category.indexOf("/");
    category=category.substring(indexOfSlash+1);
   
    const callAPISweets= (category)=>{
        props
            .dispatch(
              getRecipes(category)
            )
            
            .then((res) => {
              
               setRecipes(res.data.recipe.reverse())
               setReady(true);
            })
        
            .catch((err) => {
                console.log(err)
            });  
      }
    
    useEffect(() => {
      let category=props.location.pathname.substring(1);
    let indexOfSlash=category.indexOf("/");
    category=category.substring(indexOfSlash+1);
        callAPISweets(category)

        
    
  }, [props.location.pathname]);


    return (
        <Container>
            {ready ? (
                recipes?(recipes.map((element, k) => {
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
                })):null
            ) : <i className="fas fa-4x fa-spinner fa-spin"></i>}
        </Container>
    )
}
function mapStateToProps(state) {
    const { message } = state.message;

    return {
      message,

    };
  }
  
  export default connect(mapStateToProps)(MainRecipesPageCategory);
