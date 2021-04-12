import React, { useState, useEffect, useCallback } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import DefaultText from '../components/DefaultText';
import CustomHeaderButton from '../components/HeaderButton';

import { setFilters } from '../store/actions/meals';

import Colors from '../constants/Colors';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
                <DefaultText style={styles.label}>{props.label}</DefaultText>
                <Switch
                    trackColor={{ true: Colors.primaryColor }}
                    thumbColor={Colors.accentColor} 
                    value={props.state} 
                    onValueChange={props.stateChange}
                />
            </View>
    )
}


const FiltersScreen = props => {
    const { navigation } = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(
        () => {
            const appliedFilters ={
                glutenFree: isGlutenFree,
                vegan: isVegan,
                lactoseFree: isLactoseFree,
                vegetarian: isVegetarian
            }

            dispatch(setFilters(appliedFilters));
        },
        [isGlutenFree, isVegan, isLactoseFree, isVegetarian, dispatch],
    );

    useEffect(() => {
        navigation.setParams({ save: saveFilters })
    }, [saveFilters]);

    return (
        <View style={styles.screen}>

            <DefaultText style={styles.title}>Available Filters / Restrictions</DefaultText>
            
            <FilterSwitch label={'Gluten Free'} state={isGlutenFree} stateChange={newValue => setIsGlutenFree(newValue)}/>
            <FilterSwitch label={'Vegan'} state={isVegan} stateChange={newValue => setIsVegan(newValue)}/>
            <FilterSwitch label={'Lactose Free'} state={isLactoseFree} stateChange={newValue => setIsLactoseFree(newValue)}/>
            <FilterSwitch label={'Vegetarian'} state={isVegetarian} stateChange={newValue => setIsVegetarian(newValue)}/>

        </View>
    )
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filters',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu icon" 
                    iconName={'ios-menu'} 
                    onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu icon" 
                    iconName={'ios-save'} 
                    onPress={navData.navigation.getParam('save')} />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
        alignItems: 'center'
    }, 
    title: {
        fontSize: 22,
        marginVertical: 30
    },
    label: {
        fontSize: 16
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        minWidth: 200,
        paddingHorizontal: 5,
        marginVertical: 25
    }
});

export default FiltersScreen;