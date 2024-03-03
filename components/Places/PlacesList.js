import {FlatList, Text, View, StyleSheet} from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({places}) {

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackConatiner}>
                <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
            </View>
        )
    }

    return <FlatList data={places} keyExtractor={(item) => item.id} renderItem={({item}) => <PlaceItem place={item}/>}/>
}

export default PlacesList

const styles = StyleSheet.create({
    fallbackConatiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fallbackText: {
        fontSize: 16
    }
})