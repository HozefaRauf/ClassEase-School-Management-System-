import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput,ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import firestore from '@react-native-firebase/firestore';
import Field from './Field';

const TeacherMarks = (props) => {
    const fetchStudentClassByRegNo = async (regNo) => {
        try {
            console.log(`Fetching student with registration number: ${regNo}`);
            const querySnapshot = await firestore().collection('students').where('registrationNumber', '==', regNo).get();
            
            if (querySnapshot.empty) {
                console.log('No student found with this registration number.');
                throw new Error('No student found with this registration number.');
            }
            
            const studentDoc = querySnapshot.docs[0];
            const studentData = studentDoc.data();
            const studentId = studentDoc.id; // Get the student document ID
            
            return { studentData, studentId };
        } catch (error) {
            console.error("Error fetching student class:", error);
            throw error;
        }
    };

    const fetchFirstTermMarks = async (studentId) => {
        try {
            const marksDoc = await firestore().collection('students').doc(studentId).collection('English').doc('first').get();
            
            if (!marksDoc.exists) {
                throw new Error('No marks found for this student.');
            }
            
            const marksData = marksDoc.data();
            return marksData;
        } catch (error) {
            console.error("Error fetching first term marks:", error);
            throw error;
        }
    };

    const fetchMidTermMarks = async (studentId) => {
        try {
            const marksDoc = await firestore().collection('students').doc(studentId).collection('English').doc('mid').get();
            
            if (!marksDoc.exists) {
                throw new Error('No marks found for this student.');
            }
            
            const marksData = marksDoc.data();
            return marksData;
        } catch (error) {
            console.error("Error fetching mid term marks:", error);
            throw error;
        }
    };

    const fetchFinalTermMarks = async (studentId) => {
        try {
            const marksDoc = await firestore().collection('students').doc(studentId).collection('English').doc('final').get();
            
            if (!marksDoc.exists) {
                throw new Error('No marks found for this student.');
            }
            
            const marksData = marksDoc.data();
            return marksData;
        } catch (error) {
            console.error("Error fetching final term marks:", error);
            throw error;
        }
    };

    const updateFirstTermMarks = async (studentId, marks) => {
        try {
            await firestore().collection('students').doc(studentId).collection('English').doc('first').set({ marks });
            Alert.alert('First term marks updated successfully!');
        } catch (error) {
            console.error("Error updating first term marks:", error);
            Alert.alert('Error updating first term marks: ', error.message);
        }
    };

    const updateMidTermMarks = async (studentId, marks) => {
        try {
            await firestore().collection('students').doc(studentId).collection('English').doc('mid').set({ marks });
            Alert.alert('Mid term marks updated successfully!');
        } catch (error) {
            console.error("Error updating mid term marks:", error);
            Alert.alert('Error updating mid term marks: ', error.message);
        }
    };

    const updateFinalTermMarks = async (studentId, marks) => {
        try {
            await firestore().collection('students').doc(studentId).collection('English').doc('final').set({ marks });
            Alert.alert('Final term marks updated successfully!');
        } catch (error) {
            console.error("Error updating final term marks:", error);
            Alert.alert('Error updating final term marks: ', error.message);
        }
    };

    const [registrationNumber, setRegistrationNumber] = useState('');
    const [studentInfo, setStudentInfo] = useState(null);
    const [firstTermMarks, setFirstTermMarks] = useState('');
    const [midTermMarks, setMidTermMarks] = useState('');
    const [finalTermMarks, setFinalTermMarks] = useState('');

    const handleLookup = async () => {
        try {
            const { studentData, studentId } = await fetchStudentClassByRegNo(parseInt(registrationNumber));
            const firstTermMarksData = await fetchFirstTermMarks(studentId);
            const midTermMarksData = await fetchMidTermMarks(studentId);
            const finalTermMarksData = await fetchFinalTermMarks(studentId);
            setStudentInfo({ ...studentData, studentId });
            setFirstTermMarks(firstTermMarksData.marks.toString());
            setMidTermMarks(midTermMarksData.marks.toString());
            setFinalTermMarks(finalTermMarksData.marks.toString());
        } catch (error) {
            Alert.alert(error.message);
            setStudentInfo(null);
            setFirstTermMarks('');
            setMidTermMarks('');
            setFinalTermMarks('');
        }
    };

    const handleUpdateFirstTermMarks = async () => {
        const newMarks = parseInt(firstTermMarks);
        if (isNaN(newMarks) || newMarks > 50 || newMarks < 0) {
            Alert.alert('Marks should be a number between 0 and 50');
            return;
        }
        try {
            await updateFirstTermMarks(studentInfo.studentId, newMarks);
        } catch (error) {
            console.error('Error updating first term marks:', error);
        }
    };

    const handleUpdateMidTermMarks = async () => {
        const newMarks = parseInt(midTermMarks);
        if (isNaN(newMarks) || newMarks > 50 || newMarks < 0) {
            Alert.alert('Marks should be a number between 0 and 50');
            return;
        }
        try {
            await updateMidTermMarks(studentInfo.studentId, newMarks);
        } catch (error) {
            console.error('Error updating mid term marks:', error);
        }
    };

    const handleUpdateFinalTermMarks = async () => {
        const newMarks = parseInt(finalTermMarks);
        if (isNaN(newMarks) || newMarks > 100 || newMarks < 0) {
            Alert.alert('Marks should be a number between 0 and 50');
            return;
        }
        try {
            await updateFinalTermMarks(studentInfo.studentId, newMarks);
        } catch (error) {
            console.error('Error updating final term marks:', error);
        }
    };

    const handleMarksChange = (text, field) => {
        const newMarks = parseInt(text);
        if (!isNaN(newMarks) && newMarks <= 50) {
            switch (field) {
                case 'first':
                    setFirstTermMarks(text);
                    break;
                case 'mid':
                    setMidTermMarks(text);
                    break;
                case 'final':
                    setFinalTermMarks(text);
                    break;
                default:
                    break;
            }
        } else if (text === '') {
            switch (field) {
                case 'first':
                    setFirstTermMarks('');
                    break;
                case 'mid':
                    setMidTermMarks('');
                    break;
                case 'final':
                    setFinalTermMarks('');
                    break;
                default:
                    break;
            }
        } else {
            Alert.alert('Marks cannot be greater than 50');
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
                {studentInfo && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultText}>Student Name: {studentInfo.name}</Text>
                        <Text style={styles.resultText}>Current Class: {studentInfo.class}</Text>
                        <Text style={styles.resultText}>First Term Marks: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First Term Marks"
                            keyboardType="numeric"
                            value={firstTermMarks}
                            onChangeText={(text) => handleMarksChange(text, 'first')}
                        />
                        <Btn pad={12} bgColor='green' textColor='white' btnText='Update First Term Marks' Press={handleUpdateFirstTermMarks} />

                        <Text style={styles.resultText}>Mid Term Marks: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mid Term Marks"
                            keyboardType="numeric"
                            value={midTermMarks}
                            onChangeText={(text) => handleMarksChange(text, 'mid')}
                        />
                        <Btn pad={12} bgColor='green' textColor='white' btnText='Update Mid Term Marks' Press={handleUpdateMidTermMarks} />

                        <Text style={styles.resultText}>Final Term Marks: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Final Term Marks"
                            keyboardType="numeric"
                            value={finalTermMarks}
                            onChangeText={(text) => handleMarksChange(text, 'final')}
                        />
                        <Btn pad={12} bgColor='green' textColor='white' btnText='Update Final Term Marks' Press={handleUpdateFinalTermMarks} />
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
        textAlign: 'center',
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
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
    },
});

export default TeacherMarks;

