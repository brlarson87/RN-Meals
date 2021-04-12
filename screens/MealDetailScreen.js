import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';

import { toggleFavorite } from '../store/actions/meals';

import DefaultText from '../components/DefaultText';

import Colors from '../constants/Colors'


const MealDetailScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const meal = useSelector(state => 
                state.meals.meals.find(m => m.id === mealId));
    const currentMealIsFavorite = useSelector((state) => state.meals.favoriteMeals.some((meal) => meal.id === mealId));                

    const dispatch = useDispatch();
    
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler]);

    useEffect(() => {
            props.navigation.setParams({ isFav: currentMealIsFavorite });
        },[ currentMealIsFavorite ]); 

    return (
        <ScrollView>
            <Image source={ {uri: meal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{meal.duration}min</DefaultText>
                <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
                <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
            </View>

            <View style={styles.recipeContain}>
                <Text style={styles.textTitle}>Ingredients</Text>
                {meal.ingredients.map((ingredient, i) => <DefaultText key={i} style={styles.ingredientText}>{ingredient}</DefaultText>)}
            </View>

            <View style={styles.recipeContain}>
                <Text style={styles.textTitle}>Steps</Text>
                {meal.steps.map((step,i) => <DefaultText key={i} style={styles.stepText}>{`${i + 1}. ${step}`}</DefaultText>)}
            </View>
            
        </ScrollView>
    )
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const iconUsed = navigationData.navigation.getParam('isFav') ? 'ios-star' : 'ios-star-outline';
    return {
        headerTitle: navigationData.navigation.getParam('mealTitle'),
        headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title="Favorite" 
                iconName={iconUsed} 
                onPress={toggleFavorite}/>
        </HeaderButtons>
        )
    };
}


const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    textTitle: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        marginBottom: 10,
        textAlign: 'center',
        color: Colors.primaryColor
    },
    image: {
        width: '100%',
        height: 250
    }, 
    recipeContain: {
        width: '80%',
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        marginVertical: 15,
        paddingBottom: 25,
        paddingTop: 15,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.33,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 8,
        elevation: 5
    },
    ingredientText: {
        padding: 5
    },
    stepText: {
        paddingVertical: 8,
        lineHeight: 26
    }
});

export default MealDetailScreen;