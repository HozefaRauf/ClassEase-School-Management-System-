import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Background from './Background';
import Btn from './Btn';

const AdminSyllabus = ({ navigation,props }) => {
    const [feeStatus, setFeeStatus] = useState({
        registrationNumber: '',
        studentName: '',
        amountDue: '',
        amountPaid: '',
        payableAmount: '',
        paymentDate: '',
        lateFees: false,
        remarks: '',
    });

    const [reports, setReports] = useState([]);
    const [timetable, setTimetable] = useState(null);
    const [syllabus, setSyllabus] = useState([]);
    const classes = ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'];

    useEffect(() => {
        // Fetch initial data
        //fetchReports(); // Uncomment if reports are to be fetched initially
    }, []);
    
    const handleUploadSyllabus = (className) => {
        // Handle uploading syllabus for a specific class
    };

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                <Text style={styles.title}>Syllabus Management</Text>
                                      
                    <Text style={styles.subtitle}>Syllabus Management</Text>
                    {classes.map((className, index) => (
                        <View key={index}>
                            <Text style={styles.classText}>{className}</Text>
                            <Btn pad={12} bgColor='green' textColor='white' btnText='Upload Syllabus' Press={() => handleUploadSyllabus(className)} />
                            {/* Render syllabus for the specific class here */}
                        </View>
                    ))}
                    {/* Render uploaded syllabus */}
                </View>
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1, // Ensures the content can grow and scroll if needed
    },
    section: {
        marginBottom: 20,
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
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: 'black',
    },
    classText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    markText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    feeText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    syllabusText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    button: {
        width: 100,
        height: 100,
        display: 'flex',
        marginBottom: 30,
    },
    buttonRow: {
        flexDirection: 'row',
    },
    smimage: {
        width: 80,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center',
    },
    bntText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
    }
});

export default AdminSyllabus;