// TeacherMarks.js

import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import firestore from '@react-native-firebase/firestore';
import Field from './Field';

const TeacherMarks = (props) => {
    const fetchMarks = async (registrationNumber, term) => {
        try {
            const marksDoc = await firestore().collection('marks').doc(registrationNumber.toString()).get();

            if (!marksDoc.exists) {
                throw new Error(`No marks found for registration number ${registrationNumber}.`);
            }

            const marksData = marksDoc.data()[term] || [];
            return marksData;
        } catch (error) {
            console.error(`Error fetching ${term} term marks:`, error);
            throw error;
        }
    };

    const updateMarks = async (registrationNumber, term, marks) => {
        try {
            await firestore().collection('marks').doc(registrationNumber.toString()).update({ [term]: marks });
            Alert.alert(`${term} term marks updated successfully!`);
        } catch (error) {
            console.error(`Error updating ${term} term marks:`, error);
            Alert.alert(`Error updating ${term} term marks: `, error.message);
        }
    };

    const deleteMarks = async (registrationNumber, term) => {
        try {
            await firestore().collection('marks').doc(registrationNumber.toString()).update({ [term]: firestore.FieldValue.delete() });
            Alert.alert(`${term} term marks deleted successfully!`);
        } catch (error) {
            console.error(`Error deleting ${term} term marks:`, error);
            Alert.alert(`Error deleting ${term} term marks: `, error.message);
        }
    };

    const [registrationNumber, setRegistrationNumber] = useState('');
    const [firstTermMarks, setFirstTermMarks] = useState([]);
    const [midTermMarks, setMidTermMarks] = useState([]);
    const [finalTermMarks, setFinalTermMarks] = useState([]);

    const handleLookup = async () => {
        try {
            const firstTermMarksData = await fetchMarks(parseInt(registrationNumber), 'first');
            const midTermMarksData = await fetchMarks(parseInt(registrationNumber), 'midterm');
            const finalTermMarksData = await fetchMarks(parseInt(registrationNumber), 'finalterm');

            setFirstTermMarks(firstTermMarksData);
            setMidTermMarks(midTermMarksData);
            setFinalTermMarks(finalTermMarksData);
        } catch (error) {
            Alert.alert(error.message);
            setFirstTermMarks([]);
            setMidTermMarks([]);
            setFinalTermMarks([]);
        }
    };

    const handleUpdateMarks = async (term) => {
        let marks;
        switch (term) {
            case 'first':
                marks = firstMarks;
                break;
            case 'mid':
                marks = midTermMarks;
                break;
            case 'final':
                marks = finalTermMarks;
                break;
            default:
                return;
        }

        try {
            await updateMarks(parseInt(registrationNumber), term, marks);
        } catch (error) {
            console.error(`Error updating ${term} term marks:`, error);
        }
    };

    const handleMarksChange = (text, index, term) => {
        const newMarks = parseInt(text);
        if (!isNaN(newMarks) && newMarks <= 100) {
            let updatedMarks;
            switch (term) {
                case 'first':
                    updatedMarks = [...firstTermMarks];
                    updatedMarks[index] = text;
                    setFirstTermMarks(updatedMarks);
                    break;
                case 'mid':
                    updatedMarks = [...midTermMarks];
                    updatedMarks[index] = text;
                    setMidTermMarks(updatedMarks);
                    break;
                case 'final':
                    updatedMarks = [...finalTermMarks];
                    updatedMarks[index] = text;
                    setFinalTermMarks(updatedMarks);
                    break;
                default:
                    break;
            }
        } else if (text === '') {
            let updatedMarks;
            switch (term) {
                case 'first':
                    updatedMarks = [...firstTermMarks];
                    updatedMarks[index] = '';
                    setFirstTermMarks(updatedMarks);
                    break;
                case 'mid':
                    updatedMarks = [...midTermMarks];
                    updatedMarks[index] = '';
                    setMidTermMarks(updatedMarks);
                    break;
                case 'final':
                    updatedMarks = [...finalTermMarks];
                    updatedMarks[index] = '';
                    setFinalTermMarks(updatedMarks);
                    break;
                default:
                    break;
            }
        } else {
            Alert.alert('Marks cannot be greater than 100');
        }
    };

    const handleDeleteMarks = async (term) => {
        try {
            await deleteMarks(parseInt(registrationNumber), term);
        } catch (error) {
            console.error(`Error deleting ${term} term marks:`, error);
        }
    };

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Student Class Lookup</Text>
                    <Field
                        placeholder="Enter Registration Number"
                        keyboardType="numeric"
                        value={registrationNumber}
                        onChangeText={setRegistrationNumber}
                    />
                    <Btn pad={12} bgColor='black' textColor='white' btnText='Lookup' Press={handleLookup} />
                    {firstTermMarks.length > 0 && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>First Term Marks: </Text>
                            {firstTermMarks.map((mark, index) => (
                                <View key={index}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Subject ${index + 1}`}
                                        keyboardType="numeric"
                                        value={mark}
                                        onChangeText={(text) => handleMarksChange(text, index, 'first')}
                                    />
                                </View>
                            ))}
                            <View style={styles.buttonContainer}>
                                <Btn pad={12} bgColor='green' textColor='white' btnText='Update' Press={() => handleUpdateMarks('first')} />
                                <Btn pad={12} bgColor='red' textColor='white' btnText='Delete' Press={() => handleDeleteMarks('first')} />
                            </View>
                        </View>
                    )}
                    {midTermMarks.length > 0 && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>Mid Term Marks: </Text>
                            {midTermMarks.map((mark, index) => (
                                <View key={index}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Subject ${index + 1}`}
                                        keyboardType="numeric"
                                        value={mark}
                                        onChangeText={(text) => handleMarksChange(text, index, 'mid')}
                                    />
                                </View>
                            ))}
                            <View style={styles.buttonContainer}>
                                <Btn pad={12} bgColor='green' textColor='white' btnText='Update' Press={() => handleUpdateMarks('mid')} />
                                <Btn pad={12} bgColor='red' textColor='white' btnText='Delete' Press={() => handleDeleteMarks('mid')} />
</View>
</View>
)}
{finalTermMarks.length > 0 && (
<View style={styles.resultContainer}>
<Text style={styles.resultText}>Final Term Marks: </Text>
{finalTermMarks.map((mark, index) => (
<View key={index}>
<TextInput
style={styles.input}
placeholder={'Subject ${index + 1}'}
keyboardType="numeric"
value={mark}
onChangeText={(text) => handleMarksChange(text, index, 'final')}
/>
</View>
))}
<View style={styles.buttonContainer}>
<Btn pad={12} bgColor='green' textColor='white' btnText='Update' Press={() => handleUpdateMarks('final')} />
<Btn pad={12} bgColor='red' textColor='white' btnText='Delete' Press={() => handleDeleteMarks('final')} />
</View>
</View>
)}
</View>
</ScrollView>
</Background>
);
};

const styles = StyleSheet.create({
scrollViewContainer: {
flexGrow: 1,
},
container: {
padding: 20,
flexGrow: 1,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
color: 'black',
textAlign: 'center',
},
resultContainer: {
marginTop: 20,
alignItems: 'center',
fontWeight: 'bold',
},
resultText: {
fontSize: 18,
marginBottom: 10,
color: 'black',
fontWeight: 'bold',
alignSelf: 'flex-start',
},
input: {
borderWidth: 1,
borderColor: 'gray',
padding: 10,
borderRadius: 5,
marginBottom: 10,
width: '80%',
textAlign: 'center',
color: 'black',
fontWeight: 'bold',
},
buttonContainer: {
flexDirection: 'column',
justifyContent: 'space-between',
width: '40%',
marginBottom: 10,
},
});

export default TeacherMarks;
