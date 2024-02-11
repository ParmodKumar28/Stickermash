// Creating Image Viewer component here to show image on home page
import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    // Dynamically changing the selected image 
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;
  return <Image source={imageSource} style={styles.image} />;
}

// Styles
const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
