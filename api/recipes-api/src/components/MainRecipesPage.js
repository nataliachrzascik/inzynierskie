import React,{ useState,useEffect,useRef, useCallback}  from 'react';
import RecipeCard from './RecipeCard.js';

import MainRecipesPageCategory from "./MainRecipesPageCategory.js";

import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";

import { connect } from "react-redux";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
const MainRecipesPage =(props)=>{
  const { message } = props;
        return (
          <>
            <div id="main" >
                <div className="blog">
                    <div className="showRecipesMenu">
                    <ButtonGroup size="large" aria-label="large button group">

                        <NavLink to="/mainPage/soups" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}}>
                          <Button variant="outlined" className="recipeCategory" >zupy</Button>
                          </NavLink>
                        <NavLink to="/mainPage/dishes" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}}><Button variant="outlined" className="recipeCategory" >główne</Button></NavLink>
                        <NavLink to="/mainPage/sweets" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}}><Button variant="outlined" className="recipeCategory" id="sweet" >słodkości</Button></NavLink>
                        <NavLink to="/mainPage/salads" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}}><Button variant="outlined" className="recipeCategory">sałatki</Button></NavLink>
                   </ButtonGroup>
                    </div>
                   
                    
            
            <Switch>
                
                <Route exact path="/mainPage/soups" component={MainRecipesPageCategory}></Route>
                <Route exact path="/mainPage/dishes" component={MainRecipesPageCategory}></Route>
                <Route exact path="/mainPage/sweets" component={MainRecipesPageCategory}></Route>
                <Route exact path="/mainPage/salads" component={MainRecipesPageCategory}></Route>

                <Route exact path="/mainPage" component={MainRecipesPageCategory}></Route>

               
            </Switch>
                </div>
            </div >
         </>
        )
    }




function mapStateToProps(state) {
    const { message } = state.message;

    return {
      message,

    };
  }
  
  export default connect(mapStateToProps)(MainRecipesPage);