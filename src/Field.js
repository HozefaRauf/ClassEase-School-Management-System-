import React from 'react';
import { TextInput} from 'react-native';

const Field = (props) => {
    return (
        <TextInput 
        {...props}
        style={{
            borderRadius: 15, color: 'black', paddingHorizontal: 10, marginVertical: 10, width: 350, paddingVertical: 10,
            borderColor: '#A6A6A6', borderWidth: 2, alignSelf: 'center'
        }}
        placeholderTextColor='#A6A6A6'
        >
        
        </TextInput>
    );
}


export default Field;
