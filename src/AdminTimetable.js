import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Background1 from './Background1';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const AdminTimetable = ({ navigation }) => {
    const classes = ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'];

    const handleUploadTimetable = async (className) => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            const fileUri = result[0].uri;
            const fileName = 'eigth.jpg'; 

            const reference = storage().ref(`Timetable/${className}/${fileName}`);
            const task = reference.putFile(fileUri);

            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });

            task.then(() => {
                Alert.alert('Upload successful', `Timetable for ${className} uploaded successfully.`);
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('User cancelled the document picker');
            } else {
                console.error("Error uploading file:", err);
                Alert.alert('Upload failed', 'An error occurred while uploading the Timetable.');
            }
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Timetable Management</Text>
                    <Text style={styles.subtitle}>Timetable Management</Text>
                    {classes.map((className, index) => (
                        <TouchableOpacity key={index} onPress={() => handleUploadTimetable(className)}>
                            <View style={styles.classContainer}>
                                <Text style={styles.className}>{className}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Background1>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    section: {
        width: '90%',
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
    classContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    className: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default AdminTimetable;
