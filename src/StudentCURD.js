import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background from './Background';

const StudentCURD = ({ navigation,props }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData= async()=>{
        try {
            firestore().collection('students').onSnapshot((snap)=>{
                console.log(snap);
            })
        } catch (error) {
            
        }
    }

    // const handleSearch = (query) => {
    //     setSearchQuery(query);
    //     if (query) {
    //         const filtered = students.filter(student => student.registrationNumber.includes(query));
    //         setFilteredStudents(filtered);
    //     } else {
    //         setFilteredStudents(students);
    //     }
    // };

    return (
        <Background>
            <View style={styles.container}>
                <Text style={styles.stu}>Student</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Registration Number"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        placeholderTextColor='#A6A6A6'
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddStudent')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredStudents}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.studentItem}>
                            <Text style={styles.studentText}>Reg No: {item.registrationNumber}</Text>
                            <Text style={styles.studentText}>Name: {item.studentName}</Text>
                            {/* Add more fields as needed */}
                        </View>
                    )}
                />
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    stu:{
        color: 'black',
        fontSize: 45,
        fontWeight: 'bold',
        alignSelf:'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -5,
        gap:5,
        marginTop:40,
        
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
});

export default StudentCURD;


