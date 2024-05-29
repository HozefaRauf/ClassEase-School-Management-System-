import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import StudentFees from './StudentFees';
import StudentSyllabus from './StudentSyllabus';

const Dashboard = ({ navigation, route }) => {
    const { email, password, classes } = route.params || {};

    // Function to get the image source based on the class
    const getTimetableImage = (classes) => {
        switch (classes) {
            case 'nursery':
                return require('./assets/timetable/nursery.jpeg');
            case 'prep':
                return require('./assets/timetable/prep.jpeg');
            case 'first':
                return require('./assets/timetable/first.jpeg');
            case 'second':
                return require('./assets/timetable/second.jpeg');
            case 'third':
                return require('./assets/timetable/third.jpeg');
            case 'fourth':
                return require('./assets/timetable/fourth.jpeg');
            case 'fifth':
                return require('./assets/timetable/fifth.jpeg');
            case 'sixth':
                return require('./assets/timetable/sixth.jpeg');
            case 'seventh':
                return require('./assets/timetable/seventh.jpeg');  
            case 'eighth':
                return require('./assets/timetable/eigth.jpeg');                          
            default:
                return require('./assets/timetable/first.jpeg'); //  if class is not matched
        }
    };
    const getSyllabusImage = (classes) => {
        switch (classes) {
            case 'nursery':
                return require('./assets/syllabus/nursery.jpg');
            case 'prep':
                return require('./assets/syllabus/prep.jpg');
            case 'first':
                return require('./assets/syllabus/first.jpg');
            case 'second':
                return require('./assets/syllabus/second.jpg');
            case 'third':
                return require('./assets/syllabus/third.jpg');
            case 'fourth':
                return require('./assets/syllabus/fourth.jpg');
            case 'fifth':
                return require('./assets/syllabus/fifth.jpg');
            case 'sixth':
                return require('./assets/syllabus/sixth.jpg');
            case 'seventh':
                return require('./assets/syllabus/seventh.jpg');  
            case 'eighth':
                return require('./assets/syllabus/eigth.jpg');                          
            default:
                return require('./assets/syllabus/first.jpg'); //  if class is not matched
        }
    };

    return (
        <Background>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Student Portal</Text>
                        <Text style={styles.subtitle}>Marks</Text>
                        <Btn pad={12} bgColor='green' textColor='white' btnText='Marks' onPress={() => navigation.navigate("StudentMarks")} />
                        <Text style={styles.subtitle}>Fee Status</Text>
                        <StudentFees email={email} password={password} />
                        <Text style={styles.subtitle}>Timetable</Text>
                        <View style={styles.container1234}>
                            <Image source={getTimetableImage(classes)} style={styles.pic1234} />
                         </View>
                        <Text style={styles.subtitle}>Syllabus</Text>
                        <View style={styles.container1234}>
                            <Image source={getSyllabusImage(classes)} style={styles.pic1234} />
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
});

export default Dashboard;
