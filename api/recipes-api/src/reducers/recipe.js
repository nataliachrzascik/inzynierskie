import {
    ADD_RECIPE,
    GET_RECIPES,
    GET_ITEM_RECIPE,
    GET_MY_RECIPES,
    GET_MY_DATA,
    CHANGE_MY_PERSONAL_DATA,
    GET_USER_PROFILE,
    IS_FRIEND
  } from "../actions/types";
  
  //const user = JSON.parse(localStorage.getItem("user"));
  
  /*const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
    */
   const initialState={
     paylooad:""
   };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_RECIPE:
        return {
          ...state,
        };
        case CHANGE_MY_PERSONAL_DATA:
        return {
          ...state,
        };
      case GET_RECIPES:
        return {
          ...state,
          paylooad:payload.data.recipe
        };
        case GET_ITEM_RECIPE:
        return {
          ...state,
          paylooad:payload.data.recipe
        };
        case GET_MY_RECIPES:
          return {
            ...state,
            paylooad:payload.data.recipe
          };
          case GET_MY_DATA:
          return {
            ...state,
            paylooad:payload.data.data
          };
          case GET_USER_PROFILE:
            console.log(payload.data)
            return {
              ...state,
              paylooad:payload.data.data
            };
      default:
        return state;
    }
  } 