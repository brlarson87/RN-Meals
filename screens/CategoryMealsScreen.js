import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors';
import MealList from "../components/MealList";
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = props => {

    const catId = props.navigation.getParam('categoryId');
    const availableMeals = useSelector(state => state.meals.filteredMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0));

    if(availableMeals.length === 0 || !availableMeals) {
        return <View><DefaultText>No Meals...</DefaultText></View>
    }


    return <MealList {...props} data={availableMeals} />
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId');

    return {
        headerTitle: CATEGORIES.find( cat => cat.id === catId).title,
        headerStyle: {
            backgroundColor: Colors.primaryColor
        },
        headerTintColor: '#fff'
    }
}


export default CategoryMealsScreen;