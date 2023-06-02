import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  CheckBox,
} from "react-native";

export default function App() {
  const [text, setText] = useState(""); // 입력한 텍스트
  const [storeText, setStoreText] = useState(["a"]); // 추가된 텍스트 배열
  const [isSelect, setSelect] = useState(false); // 숫자를 클릭 여부 (숫자를 클릭했는지)
  const [editIndex, setEditIndex] = useState(false); // 수정할 텍스트의 인덱스
  const [isCompleted, setCompleted] = useState(new Array(storeText.length).fill(false)); // 완료 여부

  // 텍스트 추가
  const addTextInput = () => {
    setStoreText([...storeText, text]);
    setCompleted([...isCompleted, false]); // 완료 여부 배열에도 새로운 항목 추가
    setText("");
  };

  // 텍스트 수정
  const editTextInput = (newText) => {
    // storeText를 복사한 후 인덱스 위치의 값을 변경
    const newStoreText = [...storeText];
    newStoreText[editIndex] = newText;
    setStoreText(newStoreText);

    // 수정 후에 false로 지정하여 버튼 사라지게 함
    setEditIndex(false);
    setText("");
  };

  // 텍스트 삭제
  const taskDelete = (position) => {
    const newArray = storeText.filter((num, index) => {
      return position !== index;
    });
    setStoreText(newArray);
    setCompleted(prevState => prevState.filter((value, index) => position !== index)); // 완료 여부 배열에서도 해당 항목 삭제
  };

  // 숫자를 클릭 -> 수정 부분
  const selectTask = (idx) => {
    setSelect(true);
    setEditIndex(idx);
    setText(storeText[idx]);
  };

  // 실시간으로 입력된 텍스트 저장
  const onChangeText = (event) => {
    setText(event);
  };

  // 완료 체크박스 클릭
  const toggleCompletion = (idx) => {
    const newCompleted = [...isCompleted];
    newCompleted[idx] = !newCompleted[idx];
    setCompleted(newCompleted);
  };

  // 항목을 위로 이동시키는 함수
  const moveUp = (idx) => {
    if (idx > 1) {
      const newStoreText = [...storeText];
      const newCompleted = [...isCompleted];

      // 순서 변경
      const temp = newStoreText[idx];
      newStoreText[idx] = newStoreText[idx - 1];
      newStoreText[idx - 1] = temp;

      // 완료 여부도 함께 변경
      const tempCompleted = newCompleted[idx];
      newCompleted[idx] = newCompleted[idx - 1];
      newCompleted[idx - 1] = tempCompleted;

      setStoreText(newStoreText);
      setCompleted(newCompleted);
    }
  };

  // 항목을 아래로 이동시키는 함수
  const moveDown = (idx) => {
    if (idx < storeText.length - 1) {
      const newStoreText = [...storeText];
      const newCompleted = [...isCompleted];

      // 순서 변경
      const temp = newStoreText[idx];
      newStoreText[idx] = newStoreText[idx + 1];
      newStoreText[idx + 1] = temp;

      // 완료 여부도 함께 변경
      const tempCompleted = newCompleted[idx];
      newCompleted[idx] = newCompleted[idx + 1];
      newCompleted[idx + 1] = tempCompleted;

      setStoreText(newStoreText);
      setCompleted(newCompleted);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Todo List {"\n"} Edit : Click the Num {"\n"} Delete : Click the ❌
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Enter your to-do list!"
      />

      {/* isSelect이 True일 때 오른쪽 코드 발동 -> 버튼 생성 */}
      {isSelect && (
        <Button
          title="Edit"
          color="red"
          onPress={() => {
            editTextInput(text);
            setSelect(false);
          }}
        />
      )}

      {/* 수정할 때는 왼쪽 옵션, 평소에는 오른쪽 옵션 */}
      <Button
        title={isSelect ? "Cancel" : "Add"}
        color={isSelect ? "gray" : "black"}
        onPress={isSelect ? () => { setSelect(false); setText(""); } : addTextInput}
      />

      <ScrollView>
        {storeText.map((item, idx) => {
          if (idx === 0) {
            return <Text key={idx}> </Text>;
          } else {
            return (
              <View key={idx}>
                <Text style={[styles.taskText, isCompleted[idx] && styles.completedText]}>
                  <TouchableOpacity onPress={() => moveUp(idx)}>
                    <Text style={styles.moveText}>▲</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => selectTask(idx)}>
                    <Text style={styles.taskIndexText}> {idx} </Text>
                  </TouchableOpacity>
                  {"- "}
                  <Text style={[styles.taskItemText, isCompleted[idx] && styles.completedText]}>
                    {item}
                  </Text>
                  <TouchableOpacity onPress={() => taskDelete(idx)}>
                    <Text style={styles.deleteText}>❌</Text>
                  </TouchableOpacity>
                  <CheckBox
                    style={{ width: 20, height: 23 }}
                    value={isCompleted[idx]}
                    onValueChange={() => toggleCompletion(idx)}
                  />

                  <TouchableOpacity onPress={() => moveDown(idx)}>
                    <Text style={styles.moveText}> ▼ </Text>
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
    backgroundColor: "skyblue",
    fontWeight: "500",
    color: "black",
    padding: 5,
    marginTop: 5,
    fontFamily: "System",
  },
  taskIndexText: {
    fontWeight: "bold",
    color: "black",
  },
  taskItemText: {
    flex: 1,
  },
  deleteText: {
    color: "red",
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  moveText: {
    marginLeft: 10,
  },
});