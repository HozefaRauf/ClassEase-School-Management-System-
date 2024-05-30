import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import Background1 from './Background1';
import Field from './Field';
import Btn from './Btn';

const AddStudent = () => {
    const [regno, setRegno] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [caste, setCaste] = useState('');
    const [occupation, setOccupation] = useState('');
    const [residence, setResidence] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remarks, setRemarks] = useState('');
    const [dateOfAdmission, setDateOfAdmission] = useState('');
    const [admissionClass, setAdmissionClass] = useState('');

    const handleAddData = async () => {
        if (!regno || !name || !dob || !gender || !fatherName || !caste || !occupation || !residence || !email || !password || !remarks || !dateOfAdmission || !admissionClass) {
            Alert.alert('Missing Information', 'Please fill out all fields');
            return;
        }

        try {
            const classDocRef = firestore().doc(`classes/${admissionClass}`);

            const newStudent = {
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
                class: classDocRef
            };

            await firestore().collection('students').doc(regno).set(newStudent);

            Alert.alert('Success', 'Student added successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.login}>Add Student</Text>
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
                    
                    <Btn pad={12} bgColor='black' textColor='white' btnText='Save' Press={handleAddData} />
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
    login: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 70,
        alignSelf: 'center',
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
    
});

export default AddStudent;
