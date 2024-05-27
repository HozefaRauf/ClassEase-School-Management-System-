import React from 'react';
import { Button,StyleSheet, View, Text, ScrollView,TextInput, TouchableOpacity } from 'react-native';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';
import { useState } from 'react';
import { useEffect } from 'react';

const AdminPortal = ({ navigation }) => {
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

    const handleUploadTimetable = () => {
        // Handle uploading timetable
    };

    const handleUploadSyllabus = (className) => {
        // Handle uploading syllabus for a specific class
    };

    return (
        <ScrollView>
            <View>
                <Text>Manage Fee Status</Text>
                <TextInput
                    placeholder="Registration Number"
                    value={feeStatus.registrationNumber}
                    onChangeText={(text) => setFeeStatus({ ...feeStatus, registrationNumber: text })}
                />
                {/* Other input fields for fee status */}
                <Button title="Add Fee Status" onPress={handleAddFeeStatus} />
                <Text>Reports</Text>
                {/* Render reports */}
                <Text>Timetable Management</Text>
                <Button title="Upload Timetable" onPress={handleUploadTimetable} />
                {/* Render timetable if available */}
                <Text>Syllabus Management</Text>
                {classes.map((className, index) => (
                    <View key={index}>
                        <Text>{className}</Text>
                        <Button title="Upload Syllabus" onPress={() => handleUploadSyllabus(className)} />
                        {/* Render syllabus for the specific class */}
                    </View>
                ))}
                {/* Render uploaded syllabus */}
            </View>
        </ScrollView>
    );
};

export default AdminPortal;
