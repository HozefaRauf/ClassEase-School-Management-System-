import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background from './Background';

const TeacherCURD = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            firestore().collection('teacher').onSnapshot((snap) => {
                const tempArray = [];
                snap.forEach(item => {
                    tempArray.push(item.data());
                });
                setList(tempArray);
                setTeachers(tempArray);
                setFilteredTeachers(tempArray);
            });
        } catch (error) {
            console.error("Error fetching teacher data: ", error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = teachers.filter(teacher =>
                teacher.tid &&
                teacher.tid.toString().includes(query)
            );
            setFilteredTeachers(filtered);
        } else {
            setFilteredTeachers(teachers);
        }
    };

    const handleTeacherPress = (teacher) => {
        const preparedTeacher = {
            ...teacher,
        };
        navigation.navigate('TeacherDetail', { teacher: preparedTeacher });
    };

    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.stu}>Teacher</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Teacher ID"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        placeholderTextColor='#A6A6A6'
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTeacher')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={{ marginVertical: 20, fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                        All Teachers:
                    </Text>

                    <FlatList
                        data={filteredTeachers}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => handleTeacherPress(item)}
                            >
                                <Text>{item.tid}. {item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Background>
    );
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    stu: {
        color: 'black',
        fontSize: 45,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -5,
        gap: 5,
        marginTop: 40,
    },
    addButton: {
        backgroundColor: 'green',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        paddingHorizontal: 4,
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 16,
        color: 'black',
        borderWidth: 2,
    },
    studentItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    studentText: {
        fontSize: 16,
    },
    cardContainer: {
        marginTop: 50,
        marginBottom: 150,
    },
    card: {
        backgroundColor: '#4F7942',
        width: width - 40,
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
    },
});

export default TeacherCURD;
