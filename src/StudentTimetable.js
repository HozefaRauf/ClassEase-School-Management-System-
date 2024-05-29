import { ScrollView,
    View, 
    Text,
    StyleSheet,
    Image

 } from "react-native"
 import Btn from './Btn';
 import Background from './Background';


const StudentTimetable = (props) => {


    return(
      <Background>
       <View>
         <Image source={require('./assets/timetable.jpeg')} style={styles.pic} />
         <Btn pad={12} bgColor='green' textColor='white' btnText='Back' Press={() =>props.navigation.navigate("StudentDashboard")}/>
       </View>
       
       </Background>

        
    );
}

const styles = StyleSheet.create({
    pic: {
        width: 340,
        height: 220,
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 7,
        marginTop: 70,
      },
})

export default StudentTimetable