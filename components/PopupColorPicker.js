import { useState, useRef } from 'react';
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebView } from 'react-native-webview';

import htmlContent from '../assets/webview/html/index';
import cssContent from '../assets/webview/css/style';
import jsContent from '../assets/webview/js/script';

const { width } = Dimensions.get('window');
let canvasWidth = width * 0.8 - 20 - 2;
let canvasHeight = canvasWidth - 30 - 2 - 5;
let modalViewHeight = width * 0.8 + 41;

let newCSS = `${cssContent}`.replace('canvasSize', `${canvasWidth}px;`);
let newJS = `${jsContent}`
  .replace('let canvasHeight;', `let canvasHeight = ${canvasHeight};`)
  .replace('let canvasWidth;', `let canvasWidth = ${canvasWidth};`);

let HTML = htmlContent
  .replace('<style></style>', newCSS)
  .replace('<script></script>', newJS);

function PopupColorPicker({
  label = 'Select color',
  onSelect,
  fontSize,
  selectedColor,
}) {
  let [visible, setVisible] = useState(false);
  let [color, setColor] = useState();

  let webViewRef = useRef();
  if (selectedColor) {
    HTML = HTML.replace('let color;', `let color = '${selectedColor}';`);
    HTML = HTML.replace(
      /let color = 'rgb\(\d{0,3},\s\d{0,3},\s\d{0,3}\)';/,
      `let color = '${selectedColor}';`
    );
  }

  let toggleModal = () => {
    visible ? setVisible(false) : openModal();
  };

  let openModal = () => {
    setVisible(true);
  };

  let onMessage = (event) => {
    let data = event.nativeEvent.data;
    color = data;
  };

  let pickColor = () => {
    setColor(color);
    onSelect(color);
    setVisible(false);
  };

  let renderModal = () => {
    if (visible) {
      return (
        <Modal visible={visible} transparent={true} animationType="fade">
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {}]}>
              <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: HTML }}
                scrollEnabled={false}
                javaScriptEnabled={true}
                onMessage={(event) => onMessage(event)}
              />
              <Button
                title="Применить"
                onPress={() => {
                  pickColor();
                }}
              />
            </View>
          </View>
        </Modal>
      );
    }
  };

  return (
    <TouchableOpacity onPress={toggleModal}>
      {renderModal()}
      <View style={styles.button}>
        <View>
          <Text style={{ fontSize: fontSize }}>{label}</Text>
        </View>
        <View
          style={[
            styles.smallColor,
            { backgroundColor: color, width: fontSize, height: fontSize },
          ]}></View>
      </View>
    </TouchableOpacity>
  );
}

let styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000002a',
  },
  modalView: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 7,
    width: '80%',
    height: modalViewHeight,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  smallColor: {
    width: 14,
    height: 14,
    backgroundColor: 'red',
    borderRadius: 14,
  },
});

export default PopupColorPicker;
