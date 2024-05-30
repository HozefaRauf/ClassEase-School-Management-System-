import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import Background1 from './Background1';
import Field from './Field';
import Btn from './Btn';

const TeacherDetail = ({ route, navigation }) => {
    const teacher = route.params && route.params.teacher ? route.params.teacher : null;

    if (!teacher) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Teacher data not found</Text>
            </View>
        );
    }

    const [tid, setTid] = useState(teacher.tid.toString());
    const [name, setName] = useState(teacher.name);
    const [email, setEmail] = useState(teacher.email);
    const [password, setPassword] = useState(teacher.password);
    const [classAssigned, setClassAssigned] = useState(teacher.class_assigned);
    const [subjectsTaught, setSubjectsTaught] = useState([]);
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

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const classDoc = await firestore().collection('classes').doc(classAssigned).get();
                if (classDoc.exists) {
                    const { subjects } = classDoc.data();
                    setSubjectsTaught(subjects);
                }
            } catch (error) {
                Alert.alert('Error', 'Could not fetch subjects');
            }
        };
        fetchSubjects();
    }, [classAssigned]);

    const handleUpdate = async () => {
        try {
            const updatedTeacher = {
                tid: parseInt(tid),
                name,
                email,
                password,
                class_assigned: classAssigned,
                subjects_taught: subjectsTaught,
            };

            await firestore().collection('teacher').doc(tid).update(updatedTeacher);

            Alert.alert('Success', 'Teacher updated successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await firestore().collection('teacher').doc(tid).delete();

            Alert.alert('Success', 'Teacher deleted successfully');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <Background1>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Edit Teacher</Text>
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

                    <Text style={styles.label}>Subjects Taught:</Text>
                    {subjectsTaught.map((subject, index) => (
                        <Field key={index} value={subject} editable={false} />
                    ))}

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
        fontSize: 16,
        color: 'A6A6A6',
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 5,
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

export default TeacherDetail;
