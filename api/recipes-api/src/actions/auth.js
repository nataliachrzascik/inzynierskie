import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    ADD_RECIPE,
    ADD_RECIPE_FAIL,
    GET_RECIPES,
    GET_RECIPES_FAIL,
    GET_ITEM_RECIPE,
    GET_ITEM_RECIPE_FAIL,
    ADD_COMMENT,
    ADD_COMMENT_FAIL,
    GET_MY_RECIPES,
    GET_MY_RECIPES_FAIL,
    CHANGE_MY_PERSONAL_DATA,
    CHANGE_MY_PERSONAL_DATA_FAIL,
    GET_MY_DATA,
    GET_MY_DATA_FAIL,
    GET_USER_PROFILE,
    GET_USER_PROFILE_FAIL,
    ADD_TO_FAVOURITE,
    ADD_TO_FAVOURITE_FAIL,
    ADD_TO_FRIENDS,
    ADD_TO_FRIENDS_FAIL,
    GET_FAVOURITE_RECIPES,
    GET_FAVOURITE_RECIPES_FAIL
  } from "./types";
  
  import AuthService from "../services/authService";
  import AddRecipe from "../services/addRecipe";
  import GetRecipes from "../services/getRecipes";
  import GetItemRecipe from "../services/getItemRecipe";
  import AddComment from "../services/addComment";
  import GetMyRecipes from "../services/getMyRecipes";
  import ChangeMyPersonalData from "../services/changeMyPersonalData";
  import GetMyData from "../services/getMyData";
  import GetProfileData from "../services/getProfileData";
  import AddToFavourite from "../services/addToFavourites";
  import AddToFriends from "../services/addToFriends";
  import GetFavouriteRecipes from "../services/getFavouriteRecipes";
  
  export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };

  export const add = (nick, title, category, ingredients, descryption, name, file) => (dispatch) => {
    return AddRecipe.add(nick, title, category, ingredients, descryption, name, file).then(
      (response) => {
        dispatch({
          type: ADD_RECIPE,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADD_RECIPE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

 




  export const getRecipes = (category) => (dispatch) => {
    return GetRecipes.getRecipes(category).then(
      (response) => {
        
        dispatch({
          type: GET_RECIPES,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_RECIPES_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };


  export const getItemRecipe = (id) => (dispatch) => {
    console.log("GetItemRecipe in client auth.js")
    return GetItemRecipe.getItemRecipe(id).then(
      console.log("resposne"),
      
      (response) => {
        console.log(response)
        dispatch({
          type: GET_ITEM_RECIPE,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_ITEM_RECIPE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };


  export const addComment = (comment,id,activeUser) => (dispatch) => {
    return AddComment.addComment(comment,id,activeUser).then(
      (response) => {
        dispatch({
          type: ADD_COMMENT,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADD_COMMENT_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  
  export const addToFavourites = (path,id) => (dispatch) => {
    return AddToFavourite.addToFavourite(path,id).then(
      (response) => {
        dispatch({
          type: ADD_TO_FAVOURITE,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADD_TO_FAVOURITE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

    
  export const addToFriends = (myID,friendsID) => (dispatch) => {
    return AddToFriends.addToFriends(myID,friendsID).then(
      (response) => {
        dispatch({
          type: ADD_TO_FRIENDS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADD_TO_FRIENDS_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };


  export const getMyRecipes = (nick) => (dispatch) => {
    return GetMyRecipes.getMyRecipes(nick).then(
      (response) => {
        
        dispatch({
          type: GET_MY_RECIPES,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_MY_RECIPES_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const changeMyPesonalData = (activeUser, name, sex, city,  descryption, file) => (dispatch) => {
    return ChangeMyPersonalData.changeMyPersonalData(activeUser, name, sex, city,  descryption, file).then(
      (response) => {
        dispatch({
          type: CHANGE_MY_PERSONAL_DATA,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: CHANGE_MY_PERSONAL_DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const getMyData = (nick) => (dispatch) => {
    return GetMyData.getMyData(nick).then(
      (response) => {
        
        dispatch({
          type: GET_MY_DATA,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_MY_DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const getUserProfile = (nick) => (dispatch) => {
    return GetProfileData.getProfileData(nick).then(
      (response) => {
        
        dispatch({
          type: GET_USER_PROFILE,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_USER_PROFILE_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

  export const getFavouriteRecipes = (tableID) => (dispatch) => {
    return GetFavouriteRecipes.getFavouriteRecipes(tableID).then(
      (response) => {
        
        dispatch({
          type: GET_FAVOURITE_RECIPES,
          payload: response,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: GET_FAVOURITE_RECIPES_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

 