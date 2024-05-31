import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Background1 from './Background1';

const StudentMarks = ({ route }) => {
    const { registrationNumber } = route.params || {};
    
    const [marks, setMarks] = useState({
        first: [],
        midterm: [],
        finalterm: []
    });
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchMarks = async () => {
            try {
                setLoading(true);
                // Fetch marks data from Firestore based on the registration number
                const marksRef = firestore().collection('marks').doc(registrationNumber);
                const doc = await marksRef.get();

                if (doc.exists) {
                    const marksData = doc.data();
                    setMarks(marksData);
                } else {
                    console.log("No marks data found for registration number:", registrationNumber);
                }
            } catch (error) {
                console.error("Error fetching marks:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, [registrationNumber]);
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" />
            </View>
        );
    } 

    return (
        <Background1>
        <View style={styles.container}>
            <Text style={styles.title}>Marks</Text>
            <View style={styles.marksContainer}>
                <View style={styles.termContainer}>
                    <Text style={styles.termTitle}>First Term</Text>
                    {marks.first.map((mark, index) => (
                        <Text key={index} style={styles.mark}>{mark}</Text>
                    ))}
                </View>
                <View style={styles.termContainer}>
                    <Text style={styles.termTitle}>Midterm</Text>
                    {marks.midterm.map((mark, index) => (
                        <Text key={index} style={styles.mark}>{mark}</Text>
                    ))}
                </View>
                <View style={styles.termContainer}>
                    <Text style={styles.termTitle}>Final Term</Text>
                    {marks.finalterm.map((mark, index) => (
                        <Text key={index} style={styles.mark}>{mark}</Text>
                    ))}
                </View>
            </View>
        </View>
        </Background1>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 110,
        alignSelf: 'center',
        marginBottom: 20,
    },
    marksContainer: {
        marginTop: 20,
        flexDirection: 'column',
        gap:30,
        justifyContent: 'space-around',
    },
    termContainer: {
        alignItems: 'center',
    },
    termTitle: {
        color: '#8696A6',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    mark: {
        color: '#A6A6A6',
        fontSize: 16,
        marginBottom: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StudentMarks;
