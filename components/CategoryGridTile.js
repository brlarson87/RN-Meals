import React from 'react';
import { View, 
         TouchableOpacity, 
         Text, 
         StyleSheet,
         Platform,
         TouchableNativeFeedback } from 'react-native';

const CategoryGridTile = (props) => {
    const { itemData:{item: {color, title}}, onSelect } = props;
    let Touch = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >= 21) {
        Touch = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <Touch style={{flex: 1}}onPress={onSelect} >
                <View style={{...styles.conatiner, backgroundColor: color }}>
                    <Text style={styles.text} numberOfLines={2}>{title}</Text>
                </View>
            </Touch>
        </View>
    )
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5,
    },
    conatiner: {
        flex: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.43,
        shadowOffset: { width: -2, height: 2 },
        shadowRadius: 2,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }, 
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'right'
    }
})

export default CategoryGridTile;