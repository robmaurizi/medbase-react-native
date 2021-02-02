import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation'
import { ListItem, Text, Button } from 'react-native-elements';
// import { Feather } from '@expo/vector-icons'; 

import firebase from 'firebase';

const MedListScreen = ( {navigation} ) => {

    const userID = navigation.getParam('userID');
    const person = navigation.getParam('person');
    const [meds, setMeds] = useState([]);

    useEffect( () => {
        firebase.database().ref(`users/${userID}/${person.key}/meds/`).on('value', (snapshot) => {
            let meds = [];
            snapshot.forEach( snap => {
                const theMed = { key: snap.ref.path.pieces_[snap.ref.path.pieces_.length -1 ], ...snap.val() }
                meds.push(theMed);
            });
            
            setMeds(meds);
        })
    }, []);

    const renderMed = ({item}) => {
        const subTitle = `${item.strength} ${item.frequencyAmt}x ${item.frequencyUnit}`;
        return (
            <ListItem bottomDivider>
                <TouchableOpacity style={styles.listItem} onPress={ () => navigation.navigate('MedDetail', {med: item, person, userID}) }>
                    <ListItem.Content>
                        <ListItem.Title>{ item.name }</ListItem.Title>
                        <ListItem.Subtitle>{ subTitle } </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </TouchableOpacity>
            </ListItem>
        );
    };

    return (
        <View>
            <FlatList data={meds} keyExtractor={ (item) => item.key } renderItem={ renderMed } />
            <Button style={{marginTop: 20, marginHorizontal: 20 }} title="Add a Medication" onPress={() => navigation.navigate('AddMedication', {userID, person}) }/>
        </View>
    );

}

MedListScreen.navigationOptions = ( {navigation} ) => {
    const person = navigation.getParam('person');
    const userID = navigation.getParam('userID');

    return {
        title: person.name,
        headerRight: () => (
            <Button type="clear" title="Edit" style={{marginRight: 10}} onPress={ () => { navigation.navigate('EditPerson', {userID, person}); } } />
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        flexDirection: 'row',
    }
});

export default MedListScreen;