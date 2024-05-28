import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Background from './Background';
import Field from './Field';
import Btn from './Btn';

const Dashboard = (props) => {
    return (
        <Background>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.title}>Student Portal</Text>
                    <Text style={styles.subtitle}>Marks</Text>
                    <Btn pad={12} bgColor='green' textColor='white' btnText='Marks' Press={() =>props.navigation.navigate("studentMarks")}/>
                    {/* {marks.map((mark, index) => (
                        <View key={index}>
                            <Text style={styles.markText}>{mark.subject} ({mark.term}): {mark.marksObtained}</Text>
                        </View>
                    ))} */}
                    <Text style={styles.subtitle}>Fee Status</Text>
                    <Btn pad={12} bgColor='green' textColor='white' btnText='Fee Status' Press={() =>props.navigation.navigate("Dashboard")}/>
                    {/* {feeStatus.map((fee, index) => (
                        <View key={index}>
                            <Text style={styles.feeText}>{fee.amountDue} - {fee.amountPaid} - {fee.payableAmount} - {fee.paymentDate}</Text>
                        </View>
                    ))} */}
                    <Text style={styles.subtitle}>Timetable</Text>
                    <Btn pad={12} bgColor='green' textColor='white' btnText='TimeTable' Press={() =>props.navigation.navigate("Dashboard")}/>
                    {/* {timetable && (
                        <Image source={{ uri: timetable }} style={styles.image} />
                    )} */}
                    <Text style={styles.subtitle}>Syllabus</Text>
                    <Btn pad={12} bgColor='green' textColor='white' btnText='Syllabus' Press={() =>props.navigation.navigate("Dashboard")}/>
                    {/* {syllabus.map((syl, index) => (
                        <View key={index}>
                            <Text style={styles.syllabusText}>{syl.className}</Text>
                            <Image source={{ uri: syl.url }} style={styles.image} />
                        </View>
                    ))} */}
                </View>
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
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
    markText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    feeText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    syllabusText: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});

export default Dashboard;
