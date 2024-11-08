import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  Button,
  Input,
  ScrollView,
  Stack,
  Text,
  View,
  XGroup,
  XStack,
} from "tamagui";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { ArrowLeft, Search } from "@tamagui/lucide-icons";
import { Href, useRouter } from "expo-router";
import CategoryButtons from "@/components/home/CategoryButtons";
import BlurButton from "@/components/BlurButton";
import { Collapsible } from "@/components/Collapsible";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter();
  const categories = [
    {
      id: 1,
      icon: "🔔", // Icon for Getting Started
      title: "Question about",
      text: "Getting Started",
      route: "/chat" as Href<string>, // Route for chat
      backgroundColor: "#536493", // Background color for this category
    },
    {
      id: 2,
      icon: "📱", // Icon for How to contact
      title: "Question about",
      text: "How to contact",
      route: "/department" as Href<string>, // Route for department
      backgroundColor: "#629584", // Background color for this category
    },
    {
      id: 3,
      icon: "💳", // Icon for Payments
      title: "Question about",
      text: "Payments",
      route: "/payment" as Href<string>, // Route for payments
      backgroundColor: "#C96868", // Background color for this category
    },
  ];

  return (
    <>
      <LinearGradient
        colors={[
          isDarkMode
            ? Colors.dark.backgroundgradientStart
            : Colors.light.backgroundGradientStart,
          isDarkMode
            ? Colors.dark.backgroundgradientEnd
            : Colors.light.backgroundgradientEnd,
        ]}
        style={styles.background}
      >
        <SafeAreaView>
          {/* Header */}
          <XStack
            style={{
              marginVertical: 24,
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 12,
            }}
          >
            <Button
              style={{ padding: 0 }}
              icon={<ArrowLeft size="$2" />}
              chromeless
            ></Button>
            <Text style={styles.title}>Help Center</Text>
            <View style={{ width: 24 }} />
          </XStack>
          {/* Scroll Content */}
          <ScrollView
            style={{
              gap: 12,
            }}
          >
            <Stack style={{ gap: 16 }}>
              {/* Search Box */}
              <XGroup
                size="$5"
                style={{
                  backgroundColor: isDarkMode ? "white" : "black",
                  marginHorizontal: 12,
                }}
              >
                <XGroup.Item>
                  <Input
                    borderWidth={0}
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      color: isDarkMode ? "black" : "white",
                    }}
                    placeholder="How can we help you?"
                  />
                </XGroup.Item>
                <XGroup.Item>
                  <Button
                    icon={Search}
                    scaleIcon={1.5}
                    chromeless
                    style={{
                      color: isDarkMode ? "black" : "white",
                      paddingVertical: 0,
                    }}
                  />
                </XGroup.Item>
              </XGroup>

              {/* Quick Button */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 8 }}
              >
                <CategoryButtons categories={categories} />
              </ScrollView>

              {/* Chat History */}
              <View style={{ marginHorizontal: 12 }}>
                <Text style={styles.sectionTitle}>Chat History</Text>
              </View>
            </Stack>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
  overlay: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: "#000",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  icon1: {
    fontSize: 20,
    textAlign: "left",
    marginHorizontal: 5,
  },
  icon2: {
    fontSize: 20,
    textAlign: "left",
    marginHorizontal: 5,
  },
  icon3: {
    fontSize: 20,
    textAlign: "left",
    marginHorizontal: 5,
  },
  categoryButton1: {
    backgroundColor: "#536493",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  categoryButton2: {
    backgroundColor: "#629584",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  categoryButton3: {
    backgroundColor: "#C96868",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  titleText1: {
    color: "white",
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  titleText2: {
    color: "white",
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  titleText3: {
    color: "white",
    textAlign: "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  categoryText1: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  categoryText2: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  categoryText3: {
    color: "white",
    textAlign: "left",
    fontWeight: "bold",
    paddingHorizontal: 10,
  },

  // navigate to department button
  departmentButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "row", // จัดให้อยู่ในแนวนอน
    justifyContent: "space-between", // กระจายพื้นที่ระหว่างข้อความและไอคอน
    alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
  },
  departmentContent: {
    flexDirection: "row", // จัดให้อยู่ในแนวนอน
    justifyContent: "space-between", // กระจายพื้นที่ระหว่างข้อความกับไอคอน
    alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
    flex: 1, // ใช้ flex เพื่อให้ข้อความขยายเต็มที่
  },
  departmentText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // จัดข้อความให้อยู่ทางซ้าย
  },
  icon4: {
    fontSize: 20,
    color: "white", // สีของไอคอนเป็นสีขาว
    textAlign: "right", // จัดไอคอนให้อยู่ทางขวา
  },

  // header for chat history
  sectionHeader: {
    flexDirection: "row", // จัดให้อยู่ในแถวเดียวกัน
    justifyContent: "space-between", // กระจายพื้นที่ระหว่าง Chat History และ View All
    width: "100%", // จัดให้ข้อความอยู่ในแนวกลางแนวตั้ง
  },
  // title of chat history , top question
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  // text for view all
  viewAllText: {
    color: "#C96868", // สีของ View All
    fontSize: 14,
    fontWeight: "bold",
  },
  viewAllText2: {
    color: "#C96868", // สีของ View All
    fontSize: 14,
    fontWeight: "bold",
  },

  chatHistoryContainer: {
    marginBottom: 20,
  },
  // box in chat history
  chatItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    minWidth: 250, // กำหนดความกว้างขั้นต่ำ
    minHeight: 10, // กำหนดความสูงขั้นต่ำ
    justifyContent: "center",
    marginBottom: 10,
  },
  chatItemText: {
    color: "#fff",
    fontWeight: "bold",
  },
  chatItemDetails: {
    color: "#a1aab8",
    fontSize: 12,
    marginTop: 5,
  },
  chatButton: {
    backgroundColor: "#1b5695",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    textAlign: "center",
  },
  chatText: {
    color: "white",
    fontSize: 18,
  },
});
