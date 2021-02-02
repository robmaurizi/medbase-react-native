import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import firebase from 'firebase';


const CreatePersonScreen = ( {navigation} ) => {

    const [ name, setName ] = useState('');
    const [ errorMsg, setErrorMsg] = useState(null);
    const [ person, setPerson ] = useState({name: '', meds: [] });

    const userID = navigation.getParam('userID');

    const onAddPress = async () => {
        if ( name !== '' ) {
            // Create new person in Firebase
            setErrorMsg(null);

            const newPerson = {...person, name: name};

            try {
                const newPersonRef = firebase.database().ref(`users/${userID}`).push();
                await newPersonRef.set( newPerson );
                setPerson( newPerson );
                navigation.pop();
            } catch(error) {
                setErrorMsg(error.message);
            }

        } else {
            setErrorMsg('Name is required');
            // display error that name is required!
        }
    };

    return (
        <View style={styles.container}>
            { errorMsg 
                ? <Input placeholder="Jane Doe" value={ name } onChangeText={ (val) => { setErrorMsg(null); setName(val); }} label="Name" errorMessage={errorMsg} />
                : <Input placeholder="Jane Doe" value={ name } onChangeText={ (val) => { setErrorMsg(null); setName(val); }} label="Name" />
            }
            <Button style={{marginHorizontal: 10}} title="Add Person" onPress={ onAddPress }/>
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
    }
});

CreatePersonScreen.navigationOptions = {
    title: 'Add Person'
};

export default CreatePersonScreen;