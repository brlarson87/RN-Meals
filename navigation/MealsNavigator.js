import React from 'react';
import{createAppContainer} from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import {Ionicons} from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Favorites from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen'

import Colors from '../constants/Colors';


let defaultHeaderOptions = {
    headerStyle: {
        backgroundColor: Colors.primaryColor
    },
    headerTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: '#fff'
}

//**************** MEALS STACK*****************//
const MealsNavigator = createStackNavigator({
    Categories: { screen: CategoriesScreen },
    CategoryMeals: { screen: CategoryMealsScreen },
    MealDetail: { screen: MealDetailScreen }
}, {
    defaultNavigationOptions: defaultHeaderOptions
});

//**************** FAVORITES STACK*****************//
const FavNavigator = createStackNavigator({
    Favorites: Favorites,
    MealDetail: MealDetailScreen
}, { defaultNavigationOptions: defaultHeaderOptions });

//**************** BOTTOM TABS*****************//
const MealsFavTabNavigator = createBottomTabNavigator({
    Meals: { screen: MealsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor}/>
        }
    }},
    Favorites: { screen: FavNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor}/>
        }
    } }
}, {
   tabBarOptions: {
       labelStyle: {
            fontFamily: 'open-sans-bold'
       },
       activeTintColor: Colors.accentColor
   } 
});

//**************** FILTER STACK*****************//
const FilterNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultHeaderOptions
})

//**************** MAIN DRAWER*****************//
const MainNavigator = createDrawerNavigator({
    MealFavs: { 
        screen: MealsFavTabNavigator, 
        navigationOptions: {
            drawerLabel: 'Meals'
        } 
    },
    Filters: FilterNavigator 
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});


export default createAppContainer(MainNavigator);