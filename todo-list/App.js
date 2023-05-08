import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [text, setText] = useState(""); // 입력한 텍스트
  const [storeText, setStoreText] = useState(["a"]); // 추가된 텍스트 배열
  const [isSelect, setSelect] = useState(false);
  const [editIndex, setEditIndex] = useState(false); // 수정할 텍스트의 인덱스

  // 텍스트 추가
  const addTextInput = () => {
    
    setStoreText([...storeText, text]);
    setText("");
  };

  // 텍스트 수정
  const editTextInput = (newText) => {
    // storeText를 복사한 후 인덱스 위치의 값을 변경
    const newStoreText = [...storeText];
    newStoreText[editIndex] = newText;
    setStoreText(newStoreText);

    // 수정 모드 종료
    setEditIndex(false);
    setText("");
  };

  // 텍스트 삭제
  const taskDelete = (position) => {
    const newArray = storeText.filter((num, index) => {
      return position !== index;
    });
    setStoreText(newArray);
  };

  // 텍스트 선택 (수정 모드로 변경)
  const selectTask = (idx) => {
    setSelect(true);
    setEditIndex(idx);
    setText(storeText[idx]);
  };

  // 실시간으로 입력된 텍스트 저장
  const onChangeText = (event) => {
    setText(event);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Todo List {"\n"} Edit : Click the Num {"\n"} Delete : Click the X
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter your to-do list."
      />

      {/* 수정 모드일 때만 보이는 버튼 */}
      {isSelect && (
        <Button
          title="Edit"
          color="red"
          onPress={() => {editTextInput(text), setSelect(false)}}
        />
      )}
      
      {/*수정할때는 왼쪽 옵션, 평소에는 오른쪽 옵션 */}
      <Button 
        title={isSelect ? 'Cancel' : 'Add'}
        color={isSelect ? 'gray' : 'black'}
        onPress={isSelect ? () => {setSelect(false), setText("")} : addTextInput}
      />

      <ScrollView>
        {storeText.map((item, idx) => {
          if (idx === 0) {
            return <Text key={idx}> </Text>;
          } else {
            return (
              <View key={idx}>
                <Text style={styles.taskText}>
                  <TouchableOpacity onPress={() => selectTask(idx)}>
                    <Text style={styles.taskIndexText}> {idx} </Text>
                  </TouchableOpacity>
                  {"-"}
                  {item}
                  <TouchableOpacity onPress={() => taskDelete(idx)}>
                    <Text style={styles.deleteText}> X </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "skyblue",
    fontWeight: "900",
    fontFamily: "System",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  taskText: {
    fontSize: 30,
    backgroundColor: 'skyblue',
    fontWeight: '500',
    color: 'black',
    padding: 5,
    marginTop: 5,
    fontFamily: 'System',
  },
  taskIndexText: {
    fontWeight: 'bold',
    color: 'black',
  },
  deleteText: {
    color: 'red',
  },
});

