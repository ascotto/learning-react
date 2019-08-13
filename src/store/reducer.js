import * as actionTypes from "./actions";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
    onion: 0
  },
  totalPrice: 5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // Ovveride dynamically a property
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          // Ovveride dynamically a property
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
