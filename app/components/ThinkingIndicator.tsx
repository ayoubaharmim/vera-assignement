import { View, Text, StyleSheet } from "react-native";

export function ThinkingIndicator() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>💭 Thinking...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eef2f5",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  text: {
    color: "#6b7a89",
    fontWeight: "500",
  },
});

