import React from 'react';
import { View, 
         TouchableOpacity, 
         Text, 
         StyleSheet,
         Platform,
         TouchableNativeFeedback,
         ImageBackground } from 'react-native';
         
import DefaultText from '../components/DefaultText';         

const CategoryGridTile = (props) => {
    const { item:{ title, 
                   affordability, 
                   complexity, 
                   imageUrl, 
                   duration } } = props;
    let Touch = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        Touch = TouchableNativeFeedback;
    }

    return (
        <View style={styles.mealItem}>
            <Touch onPress={props.onSelectMeal}>
                <View>
                   <View style={{...styles.mealRow, ...styles.mealHeader}}>
                       <ImageBackground source={{uri: imageUrl}} style={styles.bgImage}>
                           <View style={styles.titleContainer}>
                                <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                            </View>
                       </ImageBackground>
                   </View>
                   <View style={{...styles.mealRow, ...styles.mealDetails}}>
                        <DefaultText>{duration}min</DefaultText>
                        <DefaultText>{complexity.toUpperCase()}</DefaultText>
                        <DefaultText>{affordability.toUpperCase()}</DefaultText>
                   </View>
                </View>
            </Touch>
        </View>
    )
};

const styles = StyleSheet.create({
    mealItem: {
        height: 225,
        backgroundColor: '#f5f5f5',
        width: '100%',
        marginVertical: 15,
        borderRadius: 8,
        overflow: 'hidden'
    }, 
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '86%'
    },
    mealDetails: {
        height: '14%',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,.5)',
        paddingVertical: 5,
        paddingHorizontal: 12
    },
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    }
})

export default CategoryGridTile;