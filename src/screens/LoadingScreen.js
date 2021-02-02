import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

const LoadingScreen = ( {navigation} ) => {

    useEffect( () => {
        firebase.auth().onAuthStateChanged( user => {
            if ( user ) {
                navigation.navigate('App');
            } else {
                navigation.navigate('SignUp');
            }
        });
    }, []);

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    )

};

export default LoadingScreen;