import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import Background1 from './Background1';
import Field from './Field';
import Btn from './Btn';

const AddTeacher = () => {
    const [tid, setTid] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classAssigned, setClassAssigned] = useState('');
    const [allClasses, setAllClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classSnapshot = await firestore().collection('classes').get();
                const classData = classSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllClasses(classData);
            } catch (error) {
                Alert.alert('Error', 'Could not fetch classes');
            }
        };
        fetchClasses();
    }, []);

    const handleAddData = async () => {
        if (!tid || !name || !email || !password || !classAssigned) {
            Alert.alert('Missing Information', 'Please fill out all fields');
            return;
        }

        try {
            const classDoc = await firestore().collection('classes').doc(classAssigned).get();
            if (!classDoc.exists) {
                Alert.alert('Error', 'Selected class does not exist');
                return;
            }

            const { subjects } = classDoc.data();
            const newTeacher = {
                tid: parseInt(tid),
                name,
                email,
                password,
                class_assigned: classAssigned,
                subjects_taught: subjects,
            };

            await firestore().collection('teacher').doc(tid).set(newTeacher);

            Alert.alert('Success', 'Teacher added successfully');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.login}>Add Teacher</Text>
                    <Field placeholder="Enter Teacher ID" keyboardType="numeric" value={tid} onChangeText={setTid} />
                    <Field placeholder="Enter Name" value={name} onChangeText={setName} />
                    <Field placeholder="Enter Email" value={email} onChangeText={setEmail} />
                    <Field placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry />

                    <View style={styles.inputGroup}>
                        <Picker
                            selectedValue={classAssigned}
                            onValueChange={(itemValue) => setClassAssigned(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Class" value="" />
                            {allClasses.map(cls => (
                                <Picker.Item key={cls.id} label={cls.name} value={cls.id} />
                            ))}
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
        color: '#A6A6A6',
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

export default AddTeacher;
