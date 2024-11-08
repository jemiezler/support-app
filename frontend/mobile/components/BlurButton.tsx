import React, { ReactNode } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

interface BlurButtonProps {
  onPress: () => void;
  children: ReactNode; // Define children prop type
}

const BlurButton: React.FC<BlurButtonProps> = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.blurButton} onPress={onPress}>
      <View style={styles.blurContent}>{children}</View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  blurButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blurContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});

export default BlurButton;
