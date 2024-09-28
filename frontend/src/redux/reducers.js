// frontend/src/redux/reducers.js
import {
    SET_DATA,
    ADD_HABIT,
    UPDATE_HABIT,
    DELETE_HABIT,
    SET_ERROR,
  } from './actions';
  
  const initialState = {
    pet: {
      name: 'Dragon',
      level: 1,
      health: 100,
      happiness: 100,
    },
    habits: [],
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DATA:
        return {
          ...state,
          pet: action.payload.pet,
          habits: action.payload.habits,
          error: null,
        };
      case ADD_HABIT:
        return {
          ...state,
          habits: [...state.habits, action.payload],
          error: null,
        };
      case UPDATE_HABIT:
        // Not used in actions.js as SET_DATA is dispatched after updating
        return {
          ...state,
          habits: state.habits.map((habit) =>
            habit.id === action.payload.id ? action.payload : habit
          ),
          error: null,
        };
      case DELETE_HABIT:
        return {
          ...state,
          habits: state.habits.filter((habit) => habit.id !== action.payload),
          error: null,
        };
      case SET_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;