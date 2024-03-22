import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import PopupColorPicker from './components/PopupColorPicker';

const App = () => {
  let [selected, setSelected] = useState();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PopupColorPicker
          label="Выберите цвет"
          selectedColor={selected}
          onSelect={setSelected}
          style={styles.dropdown}
          fontSize={20}
        />
        <Text>{selected}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    height: '100%',
    padding: 5,
  },
  dropdown: {
    fontSize: 20,
  },
});

export default App;
