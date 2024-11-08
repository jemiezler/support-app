import { Href, useRouter } from "expo-router";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";

interface Category {
  id: number;
  icon: string;
  title: string;
  text: string;
  route: Href;
  backgroundColor: string;
}

interface CategoryButtonsProps {
  categories: Category[];
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories }) => {
    const router = useRouter();

  return (

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={{ ...styles.Button, backgroundColor: category.backgroundColor }}
            onPress={() => router.push(category.route)}
          >
            <Text style={styles.Icon}>{category.icon}</Text>
            <Text style={styles.titleText}>{category.title}</Text>
            <Text style={styles.categoryText}>{category.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

  );
};

const styles = {
  categoryContainer: {
    flexDirection: "row" as "row",
    justifyContent: "space-between" as "space-between",
  },
  categoryScrollContainer: {
    // Add styles for the horizontal scroll container
    paddingVertical: 8, // Optional padding
  },
  Icon: {
    fontSize: 20,
    textAlign: "left" as "left",
    marginHorizontal: 5,
  },
  Button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  titleText: {
    color: "white",
    textAlign: "left" as "left",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  categoryText: {
    color: "white",
    textAlign: "left" as "left",
    fontWeight: "bold" as "bold",
    paddingHorizontal: 10,
  },
};

export default CategoryButtons;
