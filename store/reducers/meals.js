import { MEALS } from '../../data/dummy-data'
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
};

const mealsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === payload);
            if(existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return {
                    ...state,
                    favoriteMeals: updatedFavMeals
                }
            } else {
                const meal = state.meals.find(meal => meal.id === payload)
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(meal)
                }
            }
        case SET_FILTERS: 
            const appliedFilters = payload;
            const filterMeals = state.meals.filter(m => {
                if(appliedFilters.glutenFree && !m.isGlutenFree) {
                    return false;
                }
                if(appliedFilters.lactoseFree && !m.isLactoseFree) {
                    return false;
                }
                if(appliedFilters.vegetarian && !m.isVegetarian) {
                    return false;
                }
                if(appliedFilters.vegan && !m.isVegan) {
                    return false;
                }

                return true;
            })
            return {
                ...state,
                filteredMeals: filterMeals
            }    
        default:
            return state;
    }
}

export default mealsReducer;