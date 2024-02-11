// Icon button component is here for the icons for reset and save
import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function IconButton({ icon, label, onPress }) {
  return (
    // Pressable button's
    <Pressable style={styles.iconButton} onPress={onPress}>
      {/* Icon */}
      <MaterialIcons name={icon} size={24} color="#fff" />
      {/* Text */}
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

// Styles
const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
