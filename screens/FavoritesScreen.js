import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';

import DefaultText from '../components/DefaultText';


const FavoritesScreen = props => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

    if(favoriteMeals.length === 0 || !favoriteMeals) {
        return (<View style={styles.screen}>
                    <DefaultText>You have no favorites selected...</DefaultText>
                </View>)
    }

    return <MealList {...props} data={favoriteMeals} />
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Favorites',
        headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Menu icon" 
                iconName="ios-menu" 
                onPress={() => navData.navigation.toggleDrawer()}/>
        </HeaderButtons>
        )
    };  
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default FavoritesScreen;