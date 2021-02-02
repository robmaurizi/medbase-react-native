import React, {useState} from 'react';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import firebase from 'firebase';

const AddMedicationScreen = ({navigation}) => {

    const userID = navigation.getParam('userID');
    const person = navigation.getParam('person');

    const isEditing = navigation.getParam('isEditing');
    const med = navigation.getParam('med');

    const freqUnits = ['Daily','Weekly','Monthly','As Needed'];

    if ( med ) {
        medFU = med.frequencyUnit;
        medSelectedIndex = freqUnits.findIndex( unit => {
            if ( unit === medFU ) {
                return unit;
            }
        });
    } else {
        medSelectedIndex = 0;
    }

    const [freqUnitIndex, setFreqUnitIndex] = useState( medSelectedIndex );

    const [medName, setMedName] = useState( med ? med.name : '');
    const [medStrength, setMedStrength] = useState(med ? med.strength : '');
    const [medFreqAmt, setMedFreqAmt] = useState( med ? med.frequencyAmt : '');
    const [medFreqUnit, setMedFreqUnit] = useState(freqUnits[freqUnitIndex]);
    const [medDoctor, setMedDoctor] = useState( med ? med.doctor : '' );
    const [medNotes, setMedNotes] = useState( med ? med.notes : '' );

    const emptyMed = {name: '', strength: '', frequencyAmt: '', frequencyUnit: freqUnits[0], doctor: '', notes: ''};

    const onFreqUnitPress = (index) => {
        setFreqUnitIndex(index);
        setMedFreqUnit(freqUnits[index]);
    }

    const onSavePress = async () => {
        const theMed = {name: medName, strength: medStrength, frequencyAmt: medFreqAmt, frequencyUnit: medFreqUnit, doctor: medDoctor, notes: medNotes };

        if ( isEditing ) {
            const newMedRef = await firebase.database().ref(`users/${userID}/${person.key}/meds/${med.key}`).update(theMed);
            navigation.navigate('MedList', { userID, person });
        } else {
            const newMedRef = firebase.database().ref(`users/${userID}/${person.key}/meds`).push();
            await newMedRef.set(theMed);
            navigation.navigate('MedList', { userID, person });
        }

    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.row}>
                <Input value={medName} onChangeText={setMedName} label="Medication Name" />
            </View>
            <View style={styles.row}>
                <Input value={medStrength} onChangeText={setMedStrength} label="Strength" />
            </View>
            <View style={styles.freqRow}>
                <Input containerStyle={{ flex: .125 }} value={medFreqAmt} onChangeText={setMedFreqAmt} label="Freq." />
                <ButtonGroup containerStyle={{ flex: 1, height: 40, borderRadius: 5 }} selectedIndex={freqUnitIndex} onPress={onFreqUnitPress} buttons={ freqUnits } />
            </View>
            <View style={styles.row}>
                <Input value={medDoctor} onChangeText={setMedDoctor} label="Doctor" />
            </View>
            <View style={styles.row}>
                <Input value={medNotes} onChangeText={setMedNotes} label="Notes" />
            </View>
            <View style={styles.row}>
                <Button title="Save Medication" onPress={onSavePress} />
            </View>
        </KeyboardAwareScrollView>
    );

}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    freqRow: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

AddMedicationScreen.navigationOptions = ({navigation}) => {

    const isEditing = navigation.getParam('isEditing');

    return {
        title: isEditing ? 'Edit Medication' : 'Add Medication',
    }
};

export default AddMedicationScreen;