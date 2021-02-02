import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation'
import { ListItem, Text } from 'react-native-elements';

import { Feather } from '@expo/vector-icons';


import firebase from 'firebase';
// import { Touchable } from 'react-native';

const PeopleScreen = ({navigation}) => {

    const [user, setUser] = useState( {} );
    const [people, setPeople] = useState( [] );

    useEffect( () => {
        firebase.auth().onAuthStateChanged( user => {
            if ( user != null ) {
                setUser( user );
                navigation.setParams({userID: user.uid});

                firebase.database().ref(`users/${user.uid}`).on('value', (snapshot) => {
                    let people = [];
                    snapshot.forEach( snap => {
                        const thePerson = { key: snap.ref.path.pieces_[snap.ref.path.pieces_.length -1 ], ...snap.val() }
                        people.push(thePerson);
                    });
                    
                    setPeople(people);
    
                });
            }
        });
    }, []);

    const personItem = ( {item} ) => {

        return (
            <ListItem bottomDivider>
                <TouchableOpacity style={styles.listItem} onPress={() => {navigation.navigate('MedList', { userID: user.uid, person: item }); } }>
                    <ListItem.Content>
                        <ListItem.Title>{ item.name }</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </TouchableOpacity>
            </ListItem>
        );
    }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList style={styles.list} data={ people } keyExtractor={ (item) => item.key } renderItem={ personItem } />
            </View>
        </SafeAreaView>
        
    );

};

PeopleScreen.navigationOptions = ({navigation}) => {
    const userID = navigation.getParam('userID');
    return {
        title: 'MedBase',
        headerRight: () => (
            <TouchableOpacity onPress={ () => {navigation.navigate('CreatePerson', {userID}); } } style={{marginRight: 10}}>
                <Feather name="plus" size={30} />
            </TouchableOpacity>
        )
    }
}
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
      justifyContent: 'flex-start',
    //   borderWidth: 2,
    //   borderColor: '#990000',
    },
    list: {
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    }
  });

export default PeopleScreen;