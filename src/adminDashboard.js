import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import Background from './Background';
import auth from '@react-native-firebase/auth';
import Btn from './Btn';
import 'firebase/firestore';
import Home from './Home';

const AdminPortal = (props) => {
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

    const handleAddFeeStatus = () => {
        // Handle adding fee status
    };

    const fetchReports = () => {
        // Fetch reports
    };
    const handleLogout = () => {
        // Fetch reports
    };

    const handleUploadTimetable = () => {
        // Handle uploading timetable
    };

    const handleUploadSyllabus = (className) => {
        // Handle uploading syllabus for a specific class
    };
   
    return (
        <Background>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                <Text style={styles.title}>Admin Portal</Text>
                    <View style={styles.buttonRow} >
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("StudentCURD")}>
                            <Image source={require('./assets/graduates.png')} style={styles.smimage} />
                            <Text style={styles.bntText}>Student</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("AdminSyllabus")}>
                            <Image 
                                source={require('./assets/teacher.png')} 
                                style={styles.smimage} 
                            />
                            <Text style={styles.bntText}>Teacher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("AdminSyllabus")}>
                            <Image 
                                source={require('./assets/syllabus.png')} 
                                style={styles.smimage} 
                            />
                            <Text style={styles.bntText}>Syllabus</Text>
                        </TouchableOpacity>
                                              
                    </View>
                    
                    <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("AdminFee")}>
                            <Image 
                                source={require('./assets/fees.png')} 
                                style={styles.smimage} 
                            />
                            <Text style={styles.bntText}>Fees</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("AdminReport")}>
                            <Image 
                                source={require('./assets/report.png')} 
                                style={styles.smimage} 
                            />
                            <Text style={styles.bntText}>Report</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("AdminTimetable")}>
                            <Image 
                                source={require('./assets/timetable.png')} 
                                style={styles.smimage} 
                            />
                            <Text style={styles.bntText}>Timetable</Text>
                        </TouchableOpacity>
                                              
                    </View>
                                        
                    
                    <Btn pad={12} bgColor='green' textColor='white' btnText='Logout' Press={handleLogout} />
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
        justifyContent: 'space-between',
    },
    smimage: {
        width: 80,
        height: 80,
        marginBottom: 10,
        alignSelf: 'center',
        resizeMode: "cover",
    },
    bntText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center',
    }
});

export default AdminPortal;
