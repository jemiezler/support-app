import { Stack } from "expo-router";

export default function SupportLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disables the header
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
