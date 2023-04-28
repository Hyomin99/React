import {useState} from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';


export default function App() {

  const [text, setText] = useState('') //내가 입력한 텍스트
  const [storeText, setStoreText] = useState(['a']) // 추가하는 텍스트저장하는 용도

  const AddTextInput = () => {
    setStoreText([...storeText,text])
  } // 썼던 텍스트 저장하기

  const onChangeText = (event) =>{
    setText(event)
  } //실시간으로 바뀌는 글자
  
  return (
    <View >
      <Text //맨 위 Todo List 글씨 처리
        style = {{
          fontSize : 30,
          textAlign : 'center',
          backgroundColor: 'skyblue',
          fontWeight : 900,
          fontFamily : 'System'
        }}> Todo List {'\n'}  Edit : Click the Num {'\n'}Delete : Click the X </Text> 

      <TextInput //입력하는 텍스트 박스
        style = {styles.input}
        onChangeText = {onChangeText}
        value = {text}
        placeholder = "Enter your to-do list."
      /> 

      <Button // 일정 추가 버튼
        title = 'Add'
        color = 'black'
        onPress = {AddTextInput}
        /> 
      

      <ScrollView>{/*추가한 텍스트들을 모아와서 차례대로 출력해주는 기능*/} 
        {storeText.map((item,idx)=>{
          if (idx === 0) {
            return (
              <Text> </Text>
            )
          } else {
              return (
                <Text style = {{    
                  fontSize:30,
                  backgroundColor: 'skyblue',
                  fontWeight : 500,
                  color : 'black',
                  padding:5,
                  marginTop:5,
                  fontFamily : 'System'}}> <TouchableOpacity> {idx} </TouchableOpacity> - {item}
                    <TouchableOpacity >
                    <Text style = {{
                      color : 'red'
                    }}> X </Text>
                    </TouchableOpacity> 
                  </Text>
              
              )
            }
        })}
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  input : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
  }
})

