import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const AdminSyllabus = ({ navigation }) => {
    const classes = ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'];

    const handleUploadSyllabus = async (className) => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            const fileUri = result[0].uri; // Ensure that the URI is correctly extracted from the result
            const fileName = 'eigth.jpg'; // Rename file to eigth.jpg

            // Upload file to Firebase Storage
            const reference = storage().ref(`syllabus/${className}/${fileName}`);
            const task = reference.putFile(fileUri);

            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            task.then(() => {
                Alert.alert('Upload successful', `Syllabus for ${className} uploaded successfully.`);
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the document picker');
            } else {
                console.error("Error uploading file:", err);
                Alert.alert('Upload failed', 'An error occurred while uploading the syllabus.');
            }
        }
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
    classText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
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
});

export default AdminSyllabus;
