import React, { useState } from 'react';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import firebase from 'firebase';


const CreatePersonScreen = ( {navigation} ) => {

    const incomingPerson = navigation.getParam('person');

    const [ name, setName ] = useState(incomingPerson.name);
    const [ errorMsg, setErrorMsg] = useState(null);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const [ person, setPerson ] = useState({name: incomingPerson.name});

    const userID = navigation.getParam('userID');

    const onAddPress = async () => {
        if ( name !== '' ) {
            // Create new person in Firebase
            setErrorMsg(null);
            const newPerson = {...person, name: name};

            try {
                await firebase.database().ref(`users/${userID}/${incomingPerson.key}`).update({
                    name
                });
                setPerson( newPerson );
                navigation.navigate('People');
            } catch(error) {
                setErrorMsg(error.message);
            }

        } else {
            setErrorMsg('Name is required');
            // display error that name is required!
        }
    };

    const onDeleteConfirm = async () => {

        try {
            const personRef = firebase.database().ref(`users/${userID}/${incomingPerson.key}`);
            await personRef.remove();
            setOverlayVisible(false);
            navigation.navigate('People');
        } catch {
            console.log(error);
        }
        
    }

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };    

    return (
        <View style={styles.container}>
            { errorMsg 
                ? <Input placeholder="Jane Doe" value={ name } onChangeText={ (val) => { setErrorMsg(null); setName(val); }} label="Name" errorMessage={errorMsg} />
                : <Input placeholder="Jane Doe" value={ name } onChangeText={ (val) => { setErrorMsg(null); setName(val); }} label="Name" />
            }
            <Button buttonStyle={{marginHorizontal: 10}} title="Save Person" onPress={ onAddPress }/>
            <Button buttonStyle={{marginHorizontal: 10, marginTop: 20, backgroundColor: 'red' }} title="Delete Person" onPress={ toggleOverlay }/>

            <Overlay isVisible={overlayVisible} onBackdropPress={ () => { toggleOverlay() } } overlayStyle={{ marginHorizontal: 10}}>
                <View style={{padding: 10}}>
                    <Text h4>Are you sure you want to delete this person? This is not undoable.</Text>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={{ paddingHorizontal: 20, backgroundColor: 'red', marginRight: 20 }} title="Yes, Delete" onPress={onDeleteConfirm} />
                        <Button buttonStyle={{ paddingHorizontal: 20 }} title="Cancel" onPress={ ()=> { toggleOverlay() } } />
                    </View>
                </View>
            </Overlay>            

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 20,
    }

});

CreatePersonScreen.navigationOptions = {
    title: 'Edit Person'
};

export default CreatePersonScreen;