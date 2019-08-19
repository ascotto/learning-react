import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders"

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngridients = () =>{
    return dispatch => {
        
    axios
    .get("/ingredients.json")
    .then(r => {
      //this.setState({ ingredients: r.data });
        dispatch(setIngredients(r.data));
    })
    .catch(err => {
      //this.setState({ error: true });
        dispatch(fetchIngredientsFailed());
    });
    }
}
