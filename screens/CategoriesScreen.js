import React from 'react';
import { StyleSheet, 
         FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton';         

import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummy-data';


const CategoriesScreen = props => {
    const renderGridItem = itemData => {
        return <CategoryGridTile itemData={itemData} onSelect={() => {
            props.navigation.navigate({routeName: 'CategoryMeals',
                                 params: { categoryId: itemData.item.id }});  
        }} />
    }

    return (
        <FlatList keyExtractor={(item, index) => item.id}
                  data={CATEGORIES} 
                  renderItem={renderGridItem} 
                  numColumns={2}
                  />          
    )
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu icon" 
                    iconName={'ios-menu'} 
                    onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>
        )
    };   
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CategoriesScreen;