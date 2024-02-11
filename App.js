import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Platform,
} from "react-native";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";

import PlaceholderImage from "./assets/images/background-image.png";
import { useRef, useState } from "react";
import IconButton from "./components/IconButtons";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export default function App() {
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOtions, setShowAppOtions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  // For permission to save photo on device
  const [status, requestPermission] = MediaLibrary.usePermissions();
  // Ref for the image and emoji to save photo
  const imageRef = useRef();

  // Granting permission
  if (status === null) {
    requestPermission();
  }

  // Event handler's
  // Picking image from the photo's
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOtions(true);
      // console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  // On reset to hide emoji and icons
  const onReset = () => {
    setShowAppOtions(false);
  };

  // On add sticker to open modal for emoji's
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  // On save image async to save image on device
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await DomToImage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  // On modal close to hide emoji's modal
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    // Gesture handler root to handle gesture here
    <GestureHandlerRootView style={styles.container}>
      {/* Image container */}
      <View style={styles.imageContainer}>
        {/* Image view */}
        <View ref={imageRef} collapsable={false}>
          {/* ImageViewer component to display image */}
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {/* Conditionally showing Picked emoji on photo */}
          {pickedEmoji && (
            // Emoji Sticker component with props
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>

      {/* Conditionally showing the buttons here for rest emoji picker save and footer button's choose a photo and use this photo button's */}
      {showAppOtions ? (
        // Option's container
        <View style={styles.optionsContainer}>
          {/* Option's row */}
          <View style={styles.optionsRow}>
            {/* Reset button */}
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            {/* Emoji picker button */}
            <CircleButton onPress={onAddSticker} />
            {/* Save button */}
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          {/* Choose a photo here*/}
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          {/* Use this photo button here */}
          <Button
            label="Use this photo"
            onPress={() => setShowAppOtions(true)}
          />
        </View>
      )}

      {/* EmojiPicker component */}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* Emoji list componenet is here */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      {/* Status bar */}
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 60,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
