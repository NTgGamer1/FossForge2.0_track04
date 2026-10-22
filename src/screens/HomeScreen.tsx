import { StyleSheet, View } from "react-native";
import { Text } from "../components/Text";

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMd">HomeScreen</Text>
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
