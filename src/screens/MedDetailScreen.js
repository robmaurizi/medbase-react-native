import React, {useState} from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';

import firebase from 'firebase';

const MedDetailScreen = ( {navigation} ) => {

    const med = navigation.getParam('med');
    const userID = navigation.getParam('userID');
    const person = navigation.getParam('person');
    
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const onDeleteConfirm = async () => {

        try {
            const newMedRef = firebase.database().ref(`users/${userID}/${person.key}/meds/${med.key}`);
            await newMedRef.remove();
            setOverlayVisible(false);
            navigation.navigate('MedList', { userID, person });
        } catch {
            console.log(error);
        }
        
    }

    const toggleOverlay = () => {
        setOverlayVisible(!overlayVisible);
    };

    return (
        <ScrollView>
            <Text style={{...styles.textRow, fontWeight: 'bold', marginTop: 50, }} h2>{ med.name }</Text>
            <Text style={styles.textRow} h4><Text style={styles.label}>Strength:</Text> { med.strength }</Text>
            <Text style={styles.textRow} h4><Text style={styles.label}>Frequency:</Text> { `${med.frequencyAmt}x ${med.frequencyUnit}` }</Text>
            <Text style={styles.textRow} h4><Text style={styles.label}>Prescribing Physician:</Text> { med.doctor }</Text>
            <Text style={styles.textRow} h4><Text style={styles.label}>Notes:</Text> { med.notes }</Text>
            <Button buttonStyle={styles.deleteButton} title="Delete Medication" onPress={ toggleOverlay }/>

            <Overlay isVisible={overlayVisible} onBackdropPress={ () => { toggleOverlay() } } overlayStyle={{ marginHorizontal: 10}}>
                <View style={{padding: 10}}>
                    <Text h4>Are you sure you want to delete this medication? This is not undoable.</Text>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={{ paddingHorizontal: 20, backgroundColor: 'red', marginRight: 20 }} title="Yes, Delete" onPress={onDeleteConfirm} />
                        <Button buttonStyle={{ paddingHorizontal: 20 }} title="Cancel" onPress={ ()=> { toggleOverlay() } } />
                    </View>
                </View>
            </Overlay>            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
    },
    textRow: {
        margin: 10,
    },
    deleteButton: {
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 20,
    }
});

MedDetailScreen.navigationOptions = ({navigation}) => {

    const person = navigation.getParam('person');
    const userID = navigation.getParam('userID');
    const med = navigation.getParam('med');

    return {
        title: 'Medication Details',
        headerRight: () => (
            <Button type="clear" title="Edit" style={{marginRight: 10}} onPress={ () => { navigation.navigate('AddMedication', {med, userID, person, isEditing: true}); } } />
        ),
    };
}

export default MedDetailScreen;