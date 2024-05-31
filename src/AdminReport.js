import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Background1 from './Background1';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const AdminReport = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents().then(data => setStudents(data));
    }, []);

    const fetchStudents = async () => {
        try {
            const studentsQuerySnapshot = await firestore().collection('students').get();

            if (studentsQuerySnapshot.empty) {
                Alert.alert('Not Found', 'No students found');
                return [];
            } else {
                return studentsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
        } catch (error) {
            console.error('Error fetching students:', error);
            return [];
        }
    };

    const generateStudentDetails = () => {
        return students.map(student => `
            <div style="background-color: #f0f0f0; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                <p style="font-size: 16px; font-weight: bold; color: black; margin-bottom: 5px;">${student.name}</p>
                <p style="font-size: 14px; color: black;">Reg. Number: ${student.registration_number}</p>
            </div>
        `).join('');
    };

    const generatePDF = async () => {
        const htmlContent = `
            <html>
                <head>
                    <title>Admin Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { color: black; }
                        .studentTile { background-color: #f0f0f0; padding: 10px; margin-bottom: 10px; border-radius: 8px; }
                        .studentName { font-size: 16px; font-weight: bold; color: black; margin-bottom: 5px; }
                        .registrationNumber { font-size: 14px; color: black; }
                    </style>
                </head>
                <body>
                    <h2>Admin Report</h2>
                    ${generateStudentDetails()}
                </body>
            </html>
        `;

        try {
            const options = {
                html: htmlContent,
                fileName: 'Admin_Report',
                directory: 'Documents',
            };
            const pdf = await RNHTMLtoPDF.convert(options);

            Alert.alert('Success', `PDF Report saved to: ${pdf.filePath}`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            Alert.alert('Error', 'Failed to generate PDF Report');
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>                  
                    <Text style={styles.subtitle}>Reports: </Text>
                    {students.map((student, index) => (
                        <View key={index} style={styles.studentTile}>
                            <Text style={styles.studentName}>{student.name}</Text>
                            <Text style={styles.registrationNumber}>Reg. Number: {student.registration_number}</Text>
                            <Text style={styles.registrationNumber}>gender: {student.gender}</Text>
                            <Text style={styles.registrationNumber}>Occupation: {student.occupation}</Text>
                            <Text style={styles.registrationNumber}>Residence: {student.residence}</Text>
                            <Text style={styles.registrationNumber}>Remarks: {student.remarks}</Text>
                            
                            
                        </View>
                    ))}
                </View>
                <TouchableOpacity onPress={generatePDF}>
                    <View style={styles.downloadButton}>
                        <Text style={styles.downloadButtonText}>Download PDF</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </Background1>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    section: {
        marginBottom: 20,
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10,
        color: 'black',
        paddingTop: 20,
        marginBottom: 25,
        marginTop: 10,
    },
    studentTile: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    studentName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    registrationNumber: {
        fontSize: 14,
        color: 'black',
    },
    downloadButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default AdminReport;
