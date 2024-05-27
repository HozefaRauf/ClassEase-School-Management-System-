import React from 'react';
import { StyleSheet, View , Text} from 'react-native';

const TeacherDashboard = () => {
    return (
        <View>
            <Text style={styles.text1}>Teacher Dashboard</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text1:{
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        marginTop: 50,
    },
})

export default TeacherDashboard;
