import { ScrollView,
    View, 
    Text,
    StyleSheet

 } from "react-native"
 import React from 'react';
 import Btn from './Btn';
 import Background from './Background';

 import { TextInput, DataTable } from "react-native-paper";


const StudentMarks = (props) => {


    return(
        <Background>
        <View style={styles.container}>
                <DataTable style = {styles.table}>
                    <DataTable.Header style={styles.head}>
                        <DataTable.Title style = {{flex: 4}}> <Text style = {styles.tableTitle}> Subject </Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>First</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Mids</Text></DataTable.Title>
                        <DataTable.Title><Text style = {styles.tableTitle}>Finals</Text></DataTable.Title>
                        
                    </DataTable.Header>

                    <DataTable.Row style= {styles.row}>
                        <DataTable.Cell style = {{flex: 4}}> <Text style = {styles.subjTitle}>Mobile Application Dev</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>20</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>45</Text></DataTable.Cell>
                    </DataTable.Row> 
                    <DataTable.Row style= {styles.row}>
                        <DataTable.Cell style = {{flex: 4}}> <Text style = {styles.subjTitle}>Mobile Application Dev</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>20</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>45</Text></DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style= {styles.row}>
                        <DataTable.Cell style = {{flex: 4}}> <Text style = {styles.subjTitle}>Mobile Application Dev</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>18</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>20</Text></DataTable.Cell>
                        <DataTable.Cell><Text style = {styles.data}>45</Text></DataTable.Cell>
                    </DataTable.Row>

                    
                </DataTable>
                <Btn pad={12} bgColor='green' textColor='white' btnText='Back' Press={() =>props.navigation.navigate("StudentDashboard")}/>
            </View>
            </Background>
        
    );
}

const styles = StyleSheet.create({
    head:{
        backgroundColor: "#8349EA",
        borderRadius : 20
    },

    table:{
        paddingVertical: 40,
        width: 320,
        alignSelf: 'center'

    },

    tableTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: '#000000',
        alignSelf: 'center'
    },



    row: {
        height: 40,
        backgroundColor: 'lavender',
        borderRadius : 10,
        width: 310,
        alignSelf: 'center',
        marginTop: 2
    },

    subjTitle:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12
    },

    data:{
        color: "#000000",
        fontFamily: 'Poppins-Regular',
        fontSize: 12
    }
})

export default StudentMarks;