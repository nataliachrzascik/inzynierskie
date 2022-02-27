import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import AddRecipe from "./AddRecipe";
import MainRecipesPage from "./MainRecipesPage";

import RecipeCard from './RecipeCard.js';
import UserProfile from './UserProfile';
import MainRecipesPageCategory from "./MainRecipesPageCategory.js";
import Button from '@mui/material/Button';


const LoggedIn = (props) => {

    return (
        
<>
            <div id='menu'>
                <NavLink to="/addRecipe" style={{color: 'white', textDecoration: 'none'}} activeStyle={{color: 'rgb(212, 212, 212)', textDecoration: 'none'}}>
                    <div className="menuItem"><Button variant="outlined">Dodaj przepis</Button></div>
                </NavLink>
                
            </div>

            <Switch>
                <Route path="/addRecipe" component={AddRecipe}></Route>
                <Route path="/mainPage" component={MainRecipesPage}></Route>
                
            </Switch>
            <Switch>
            <Route path="/mainPage/recipe/" component={RecipeCard}></Route>
            </Switch>

            <Switch>
            <Route path="/mainPage/users/" component={UserProfile}></Route>
            </Switch>
 </>

    );

};

export default LoggedIn;
