import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import Background1 from './Background1';
import Field from './Field';
import Btn from './Btn';

const StudentDetail = ({ route, navigation }) => {
    const student = route.params && route.params.student ? route.params.student : null;

    if (!student) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Student data not found</Text>
            </View>
        );
    }

    const [regno, setRegno] = useState(student.registration_number.toString());
    const [name, setName] = useState(student.name);
    const [dob, setDob] = useState(student.dob.split('T')[0]);
    const [gender, setGender] = useState(student.gender);
    const [fatherName, setFatherName] = useState(student.father_name);
    const [caste, setCaste] = useState(student.caste);
    const [occupation, setOccupation] = useState(student.occupation);
    const [residence, setResidence] = useState(student.residence);
    const [email, setEmail] = useState(student.email);
    const [password, setPassword] = useState(student.password);
    const [remarks, setRemarks] = useState(student.remarks);
    const [dateOfAdmission, setDateOfAdmission] = useState(student.date_of_admission.split('T')[0]);
    const [admissionClass, setAdmissionClass] = useState(student.classId);

    const handleUpdate = async () => {
        try {
            const classDocRef = firestore().doc(`classes/${admissionClass}`);
            const updatedStudent = {
                registration_number: parseInt(regno),
                name,
                dob: firestore.Timestamp.fromDate(new Date(dob)),
                gender,
                father_name: fatherName,
                caste,
                occupation,
                residence,
                email,
                password,
                remarks,
                date_of_admission: firestore.Timestamp.fromDate(new Date(dateOfAdmission)),
                class: classDocRef,
            };

            await firestore().collection('students').doc(student.registration_number.toString()).update(updatedStudent);

            Alert.alert('Success', 'Student updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await firestore().collection('students').doc(student.registration_number.toString()).delete();

            Alert.alert('Success', 'Student deleted successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Student</Text>
                    <Field placeholder="Enter Registration Number" keyboardType="numeric" value={regno} onChangeText={setRegno} />
                    <Field placeholder="Enter Name" value={name} onChangeText={setName} />
                    <Field placeholder="Enter Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
                    <Field placeholder="Enter Gender" value={gender} onChangeText={setGender} />
                    <Field placeholder="Enter Father's Name" value={fatherName} onChangeText={setFatherName} />
                    <Field placeholder="Enter Caste" value={caste} onChangeText={setCaste} />
                    <Field placeholder="Enter Occupation" value={occupation} onChangeText={setOccupation} />
                    <Field placeholder="Enter Residence" value={residence} onChangeText={setResidence} />
                    <Field placeholder="Enter Email" value={email} onChangeText={setEmail} />
                    <Field placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry />
                    <Field placeholder="Enter Remarks" value={remarks} onChangeText={setRemarks} />
                    <Field placeholder="Enter Date of Admission (YYYY-MM-DD)" value={dateOfAdmission} onChangeText={setDateOfAdmission} />

                    <View style={styles.inputGroup}>
                        <Picker
                            selectedValue={admissionClass}
                            onValueChange={(itemValue) => setAdmissionClass(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Class" value="" />
                            <Picker.Item label="Nursery" value="nursery" />
                            <Picker.Item label="Prep" value="prep" />
                            <Picker.Item label="Class 1" value="class1" />
                            <Picker.Item label="Class 2" value="class2" />
                            <Picker.Item label="Class 3" value="class3" />
                            <Picker.Item label="Class 4" value="class4" />
                            <Picker.Item label="Class 5" value="class5" />
                            <Picker.Item label="Class 6" value="class6" />
                            <Picker.Item label="Class 7" value="class7" />
                            <Picker.Item label="Class 8" value="class8" />
                        </Picker>
                    </View>

                    <Btn pad={12} bgColor="#4F7942" textColor="white" btnText="Save" Press={handleUpdate} />
                    <Btn pad={12} bgColor="#D22B2B" textColor="white" btnText="Delete" Press={handleDelete} />
                </View>
            </ScrollView>
        </Background1>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 70,
        marginBottom: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 8,
        justifyContent: 'space-between',
        borderRadius: 15, 
        overflow: 'hidden',
        width: 350,
        borderColor: '#A6A6A6', 
    },
    label: {
        fontSize: 14,
        color: 'A6A6A6',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
    },
    picker: {
        flex: 2,
        height: 40,
        backgroundColor: '#A6A6A6',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default StudentDetail;
