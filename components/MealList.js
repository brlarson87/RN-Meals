import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealGridTile from './MealGridTile';

const MealList = (props) => {
    let { data } = props;
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    

    const renderMealItem = itemData => {
        const { item } = itemData;
        const isFavorite = favoriteMeals.some(meal => meal.id === item.id);
        return <MealGridTile 
                    item={item} 
                    onSelectMeal={() => props.navigation.navigate({ 
                        routeName: 'MealDetail', 
                        params: { mealId: item.id, 
                                  mealTitle: item.title,
                                  isFav: isFavorite }})}/>
    }

    return (
        <View style={styles.list}>
            <FlatList 
                keyExtractor={(item, index) => item.id}
                data={data}
                renderItem={renderMealItem}
                style={{width: '100%'}}
            />
        </View>    
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    }
});

export default MealList;