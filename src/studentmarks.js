import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import Background from './Background';
import firestore from '@react-native-firebase/firestore';

const StudentMarks = (props) => {
    const { email, password } = props;
    const [marksInfo, setMarksInfo] = useState(null);

    useEffect(() => {
        const fetchStudentMarks = async () => {
            try {
                const usersRef = firestore().collection('students');
                const querySnapshot = await usersRef.where('email', '==', email).where('password', '==', password).get();

                if (querySnapshot.empty) {
                    throw new Error('No user found with this email and password.');
                }

                const userDoc = querySnapshot.docs[0];
                const studentId = userDoc.id;

                const marksRef = firestore().collection('students').doc(studentId).collection('English');
                const marksData = {};

                // Fetch marks for first term
                const firstTermDoc = await marksRef.doc('first').get();
                if (firstTermDoc.exists) {
                    marksData.firstTerm = firstTermDoc.data();
                }

                // Fetch marks for mid term
                const midTermDoc = await marksRef.doc('mid').get();
                if (midTermDoc.exists) {
                    marksData.midTerm = midTermDoc.data();
                }

                // Fetch marks for final term
                const finalTermDoc = await marksRef.doc('final').get();
                if (finalTermDoc.exists) {
                    marksData.finalTerm = finalTermDoc.data();
                }

                setMarksInfo(marksData);
            } catch (error) {
                Alert.alert(error.message);
                setMarksInfo(null);
            }
        };

        fetchStudentMarks();
    }, [email, password]);

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {marksInfo && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.title}>Marks</Text>
                            <Text style={styles.subtitle}>First Term:</Text>
                            <Text style={styles.markText}>Marks: {marksInfo.firstTerm ? marksInfo.firstTerm.marks : 'N/A'}</Text>
                            <Text style={styles.subtitle}>Mid Term:</Text>
                            <Text style={styles.markText}>Marks: {marksInfo.midTerm ? marksInfo.midTerm.marks : 'N/A'}</Text>
                            <Text style={styles.subtitle}>Final Term:</Text>
                            <Text style={styles.markText}>Marks: {marksInfo.finalTerm ? marksInfo.finalTerm.marks : 'N/A'}</Text>
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
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
    },
    markText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
});

export default StudentMarks;
