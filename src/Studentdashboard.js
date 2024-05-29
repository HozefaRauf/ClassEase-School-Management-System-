import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import StudentFees from './StudentFees';
import StudentTimetable from './StudentTimetable';
import StudentSyllabus from './StudentSyllabus';

const Dashboard = ({ navigation, route }) => {
    const { email, password } = route.params || {};

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
                        <StudentTimetable/>
                        <Text style={styles.subtitle}>Syllabus</Text>
                        <StudentSyllabus />
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
});

export default Dashboard;
