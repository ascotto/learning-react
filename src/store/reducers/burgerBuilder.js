import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

// TODO rename reducers to burgerBuilder

const initialState = {
  ingredients: null,
  totalPrice: 5,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.2,
  bacon: 0.7,
  onion: 0.2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedStateAdd = {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

      return updateObject(state, updatedStateAdd);

    case actionTypes.REMOVE_INGREDIENT:
      const updatedStateRem = {
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };

      return updateObject(state, updatedStateRem);

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
          onion: action.ingredients.onion,
          salad: action.ingredients.salad
        },
        totalPrice: 5,
        error: false
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
