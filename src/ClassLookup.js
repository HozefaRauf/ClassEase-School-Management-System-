import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import firestore from '@react-native-firebase/firestore';
import Field from './Field';

const ClassLookup = (props) => {
    const fetchStudentByRegNo = async (regNo) => {
        try {
            console.log(`Fetching student with registration number: ${regNo}`);
            const querySnapshot = await firestore().collection('students').where('registrationNumber', '==', regNo).get();
    
            if (querySnapshot.empty) {
                console.log('No student found with this registration number.');
                throw new Error('No student found with this registration number.');
            }
    
            const studentDoc = querySnapshot.docs[0];
            const studentData = studentDoc.data();
            const { name, class: currentClass } = studentData; // Destructure the data
            return [{ name, currentClass }];
        } catch (error) {
            console.error("Error fetching student:", error);
            throw error;
        }
    };

    const fetchStudentsByClass = async (classInput) => {
        try {
            console.log(`Fetching students in class: ${classInput}`);
            const querySnapshot = await firestore().collection('students').where('class', '==', classInput).get();

            if (querySnapshot.empty) {
                console.log('No students found in this class.');
                throw new Error('No students found in this class.');
            }

            const students = [];
            querySnapshot.forEach((doc) => {
                const studentData = doc.data();
                students.push({ name: studentData.name, currentClass: studentData.class });
            });

            return students;
        } catch (error) {
            console.error("Error fetching students:", error);
            throw error;
        }
    };

    const [searchOption, setSearchOption] = useState('registrationNumber');
    const [searchInput, setSearchInput] = useState('');
    const [studentList, setStudentList] = useState([]);

    const handleLookup = async () => {
        try {
            let data;
            if (searchOption === 'registrationNumber') {
                data = await fetchStudentByRegNo(parseInt(searchInput));
            } else {
                data = await fetchStudentsByClass(searchInput);
            }
            setStudentList(data);
        } catch (error) {
            Alert.alert(error.message);
            setStudentList([]);
        }
    };

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Student Lookup</Text>
                    <View style={styles.searchOptionContainer}>
                        <Text style={styles.optionText}>Search by:</Text>
                        <Btn
                            pad={12}
                            bgColor={searchOption === 'registrationNumber' ? 'black' : 'gray'}
                            textColor='white'
                            btnText='Reg No'
                            Press={() => setSearchOption('registrationNumber')}
                        />
                        <Btn
                            pad={12}
                            bgColor={searchOption === 'class' ? 'black' : 'gray'}
                            textColor='white'
                            btnText='Class'
                            Press={() => setSearchOption('class')}
                        />
                    </View>
                    <Field
                        placeholder={searchOption === 'registrationNumber' ? 'Enter Registration Number' : 'Enter Class'}
                        value={searchInput}
                        onChangeText={setSearchInput}
                        keyboardType={searchOption === 'registrationNumber' ? 'numeric' : 'default'}
                    />
                    <Btn pad={12} bgColor='black' textColor='white' btnText='Lookup' Press={handleLookup} />
                    {studentList.length > 0 && (
                        <View style={styles.resultContainer}>
                            {studentList.map((student, index) => (
                                <View key={index} style={styles.studentInfo}>
                                    <Text style={styles.resultText}>Student Name: {student.name}</Text>
                                    <Text style={styles.resultText}>Current Class: {student.currentClass}</Text>
                                </View>
                            ))}
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
    searchOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    optionText: {
        fontSize: 18,
        marginRight: 10,
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
        studentInfo: {
        marginBottom: 20,
        color: 'black',
        fontWeight: 'bold',
        },
        });
        
        export default ClassLookup;
