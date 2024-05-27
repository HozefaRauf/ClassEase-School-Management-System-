import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Practice() {
    const [mydata, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData= async()=>{
        try {
            const data=await firestore().collection('testing').doc('f6CaQbsS8hDCpP4qy0Uv').get();
            setData(data._data);
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <View >
          <Text style={{color:"black"}}>Hello</Text>
          <Text style={{color:"black"}}>Name: {mydata ? mydata.name : "Loading...."}</Text>
          <Text style={{color:"black"}}>Age: {mydata ? mydata.age : "Loading...."}</Text>
        </View>
    );
}
