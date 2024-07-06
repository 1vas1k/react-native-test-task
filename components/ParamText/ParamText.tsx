import { StyleSheet, Text } from "react-native";

interface IProps {
  title: string;
  description: string;
}

export const ParamText = ({ title, description }: IProps) => {
  return (
    <Text style={styles.descriptionText}>
      <Text style={styles.boldText}>{title} </Text>
      {description}
    </Text>
  );
};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 20,
  },
});
