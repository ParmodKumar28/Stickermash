// Button component here for choosing photo or use this photo
import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress }) {
  // If theme is primary means for the choose photo button here
  if (theme === "primary") {
    return (
      // Button container
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        {/* Button */}
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
            },
          ]}
          onPress={onPress}
        >
          {/* Icon */}
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          {/* Text */}
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  // Else use this photo button here
  return (
    // Button container
    <View style={styles.buttonContainer}>
      {/* Button */}
      <Pressable style={styles.button} onPress={onPress}>
        {/* Text */}
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    jusityContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
