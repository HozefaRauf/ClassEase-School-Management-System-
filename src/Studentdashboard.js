import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Alert,ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Background from './Background';
import Btn from './Btn';
import StudentFees from './StudentFees';

const Dashboard = ({ navigation, route }) => {
    const { email, password, classes, registrationNumber } = route.params || {};
    const [timetableUrl, setTimetableUrl] = useState(null);
    const [syllabusUrl, setSyllabusUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading1, setLoading1] = useState(false);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                setLoading1(true);
                // Fetch the student document from Firestore based on email and password
                const studentRef = firestore().collection('students').where('email', '==', email).where('password', '==', password);
                const snapshot = await studentRef.get();
                if (snapshot.empty) {
                    setError('Student not found');
                    return;
                }
    
                // Assuming there's only one student document matching the email and password
                const studentDoc = snapshot.docs[0];
                const studentData = studentDoc.data();
                
                // Access the class reference from student data
                const studentClassRef = studentData.class;
    
                // Fetch the class document from Firestore using the reference
                const classDocSnapshot = await studentClassRef.get();
    
                if (classDocSnapshot.exists) {
                    // Retrieve the class name from the class document
                    const className = classDocSnapshot.data().name;
                    const timetableFileName = 'eigth.jpg'; // Assuming the timetable filename is constant
                    const reference = storage().ref(`Timetable/${className}/${timetableFileName}`);
                    const url = await reference.getDownloadURL();
                    setTimetableUrl(url);
                } else {
                    setError('Class information not found for this student');
                }
            } catch (err) {
                console.error("Error fetching timetable:", err);
                setError('Error fetching timetable');
            } finally {
                setLoading(false);
                setLoading1(false);
            }
            if (loading1) {
                return (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                );
            } 
        };

        const fetchSyllabus = async () => {
            try {
                // Fetch the student document from Firestore based on email and password
                const studentRef = firestore().collection('students').where('email', '==', email).where('password', '==', password);
                const snapshot = await studentRef.get();
                if (snapshot.empty) {
                    setError('Student not found');
                    return;
                }
    
                // Assuming there's only one student document matching the email and password
                const studentDoc = snapshot.docs[0];
                const studentData = studentDoc.data();
                
                // Access the class reference from student data
                const studentClassRef = studentData.class;
    
                // Fetch the class document from Firestore using the reference
                const classDocSnapshot = await studentClassRef.get();
    
                if (classDocSnapshot.exists) {
                    // Retrieve the class name from the class document
                    const className = classDocSnapshot.data().name;
                    const syllabusFileName = 'eigth.jpg'; // Assuming the syllabus filename is constant
                    const reference = storage().ref(`syllabus/${className}/${syllabusFileName}`);
                    const url = await reference.getDownloadURL();
                    setSyllabusUrl(url);
                } else {
                    setError('Class information not found for this student');
                }
            } catch (err) {
                console.error("Error fetching syllabus:", err);
                setError('Error fetching syllabus');
            } finally {
                setLoading(false);
            }
        };
    
        fetchTimetable();
        fetchSyllabus();
    }, [email, password]);

    return (
        <Background>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Student Portal</Text>
                        <Text style={styles.subtitle}>Marks</Text>
                        <Btn pad={12} bgColor='green' textColor='white' btnText='Marks' Press={() => navigation.navigate("StudentMarks", { registrationNumber: registrationNumber })} />
                        <Text style={styles.subtitle}>Fee Status</Text>
                        <StudentFees email={email} password={password} />
                        <Text style={styles.subtitle}>Timetable</Text>
                        <View style={styles.container1234}>
                            {loading ? (
                                <Text>Loading...</Text>
                            ) : error ? (
                                <Text>{error}</Text>
                            ) : (
                                timetableUrl ? (
                                    <Image source={{ uri: timetableUrl }} style={styles.pic1234} />
                                ) : (
                                    <Text>No timetable found.</Text>
                                )
                            )}
                        </View>
                        <Text style={styles.subtitle}>Syllabus</Text>
                        <View style={styles.container1234}>
                            {loading ? (
                                <Text>Loading...</Text>
                            ) : error ? (
                                <Text>{error}</Text>
                            ) : (
                                syllabusUrl ? (
                                    <Image source={{ uri: syllabusUrl }} style={styles.pic1234} />
                                ) : (
                                    <Text>No syllabus found.</Text>
                                )
                            )}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.logoutButton}>
                    <Btn pad={12} bgColor='green' textColor='white' btnText='Logout' onPress={() => navigation.navigate("StudentLogin")} />
                </View>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        marginBottom: 20,
        paddingBottom: 100, // Add padding to make space for the logout button
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
        paddingBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
        paddingTop: 20,
    },
    logoutButton: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    container1234: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pic1234: {
        width: 340,
        height: 220,
        borderRadius: 10,
        elevation: 7,
        marginTop: 70,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Dashboard;
