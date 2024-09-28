// frontend/src/redux/actions.js
import axios from 'axios';

// Define the base URL for your API
const API_URL = 'http://localhost:5000/api';

/**
 * Action Types
 */
export const SET_DATA = 'SET_DATA';
export const ADD_HABIT = 'ADD_HABIT';
export const UPDATE_HABIT = 'UPDATE_HABIT';
export const DELETE_HABIT = 'DELETE_HABIT';
export const SET_ERROR = 'SET_ERROR';

/**
 * Action Creators
 */

/**
 * fetchData
 * Fetches the initial data (pet and habits) from the backend.
 */
export const fetchData = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/data`);
    dispatch({
      type: SET_DATA,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    dispatch({
      type: SET_ERROR,
      payload: 'Failed to fetch data.',
    });
  }
};

/**
 * addHabit
 * Adds a new habit to the backend and updates the Redux store.
 * @param {Object} habit - The habit to add (e.g., { name: 'Read', frequency: 'Daily' }).
 */
export const addHabit = (habit) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/habits`, habit);
    dispatch({
      type: ADD_HABIT,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding habit:', error);
    dispatch({
      type: SET_ERROR,
      payload: 'Failed to add habit.',
    });
  }
};

/**
 * updateHabit
 * Toggles the completion status of a habit and updates the pet's status accordingly.
 * @param {number} id - The ID of the habit to update.
 * @param {boolean} completed - The new completion status.
 */
export const updateHabit = (id, completed) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/habits/${id}`, { completed });

    // After updating the habit, fetch the updated data
    const updatedData = await axios.get(`${API_URL}/data`);
    dispatch({
      type: SET_DATA,
      payload: updatedData.data,
    });
  } catch (error) {
    console.error('Error updating habit:', error);
    dispatch({
      type: SET_ERROR,
      payload: 'Failed to update habit.',
    });
  }
};

/**
 * deleteHabit
 * Deletes a habit from the backend and updates the Redux store.
 * @param {number} id - The ID of the habit to delete.
 */
export const deleteHabit = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/habits/${id}`);
    dispatch({
      type: DELETE_HABIT,
      payload: id,
    });
  } catch (error) {
    console.error('Error deleting habit:', error);
    dispatch({
      type: SET_ERROR,
      payload: 'Failed to delete habit.',
    });
  }
};
