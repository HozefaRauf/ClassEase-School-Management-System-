import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background1 from './Background1';

const FeeCURD = ({ navigation }) => {
    const [list, setList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [fees, setFees] = useState([]);
    const [filteredFees, setFilteredFees] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            firestore().collection('fee').onSnapshot((snap) => {
                const tempArray = [];
                snap.forEach(item => {
                    tempArray.push(item.data());
                });
                setList(tempArray);
                setFees(tempArray);
                setFilteredFees(tempArray);
            });
        } catch (error) {
            console.error("Error fetching fee data: ", error);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = fees.filter(fee =>
                fee.registration_number &&
                fee.registration_number.toString().includes(query)
            );
            setFilteredFees(filtered);
        } else {
            setFilteredFees(fees);
        }
    };

    const handleFeePress = (fee) => {
        navigation.navigate('FeeDetail', { fee });
    };

    return (
        <Background1>
            <View style={styles.container}>
                <Text style={styles.stu}>Fee</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by Registration Number"
                        value={searchQuery}
                        onChangeText={handleSearch}
                        placeholderTextColor='#A6A6A6'
                    />
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddFee')}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={{ marginVertical: 20, fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                        All Fees:
                    </Text>

                    <FlatList
                        data={filteredFees}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => handleFeePress(item)}
                            >
                                <Text>{item.registration_number}. {item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Background1>
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

export default FeeCURD;
