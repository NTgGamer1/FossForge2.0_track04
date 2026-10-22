import { StyleSheet, View } from "react-native";
import { Text } from "../components/Text";

export function MediaScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMd">MediaScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    alignItems: "center",
    justifyContent: "center",
  },
});
