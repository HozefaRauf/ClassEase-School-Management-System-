import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Background from './Background';

const StudentSyllabus = ({ route }) => {
    const { studentId } = route.params; // Assuming you are passing the studentId via route params
    const [className, setClassName] = useState(null);
    const [timetableUrl, setTimetableUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentClass = async () => {
            try {
                const studentDoc = await firestore().collection('students').doc(studentId).get();
                if (studentDoc.exists) {
                    const studentData = studentDoc.data();
                    const classRef = studentData.class;
                    const classDoc = await classRef.get();
                    setClassName(classDoc.id);
                    fetchTimetable(classDoc.id);
                } else {
                    setError('Student not found');
                }
            } catch (err) {
                console.error("Error fetching student class:", err);
                setError('Error fetching student class');
            }
        };

        const fetchTimetable = async (className) => {
            try {
                const fileName = 'eigth.jpg'; // Assuming the timetable file is named eigth.jpg
                const reference = storage().ref(`syllabus/${className}/${fileName}`);
                const url = await reference.getDownloadURL();
                setTimetableUrl(url);
            } catch (err) {
                console.error("Error fetching timetable:", err);
                setError('Error fetching timetable');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentClass();
    }, [studentId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <Background>
            <View style={styles.container}>
                {timetableUrl ? (
                    <Image
                        style={styles.image}
                        source={{ uri: timetableUrl }}
                        resizeMode='contain'
                    />
                ) : (
                    <Text>No timetable found.</Text>
                )}
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#123456',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#123456',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        flex: 1,
        backgroundColor: '#123456',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default StudentSyllabus;
