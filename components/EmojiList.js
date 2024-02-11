// Emoji list component is here to show all emoji's
import { useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

export default function EmojiList({ onSelect, onCloseModal }) {
  // Creating the emoji array useing use state hook
  const [emoji] = useState([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  return (
    // Flatlist for the horizontal list to show all emoji's
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        // Emoji's with pressable behavior here
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
        >
          {/* Emoji */}
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

// Styles
const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
