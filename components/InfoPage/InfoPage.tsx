import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import { ParamText } from "../ParamText/ParamText";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../App";

export const InfoPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const pokemonStats = useSelector((state: RootState) => state.poke);
  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContaiter}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <Image
            style={styles.back}
            source={require("../../assets/back-icon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.introductionContainer}>
        <Image
          style={styles.pokemonImage}
          source={{ uri: pokemonStats.image }}
        />
        <View style={styles.introductionDescription}>
          <Text style={[styles.boldText, styles.introductionText]}>
            {capitalizeFirstLetter(pokemonStats.name)}
          </Text>
          <ParamText title={"Id:"} description={`${pokemonStats.id}`} />
          <ParamText
            title={"Types:"}
            description={String(pokemonStats.types).replace(",", ", ")}
          />
        </View>
      </View>
      <View style={styles.paramethrsContainer}>
        <ParamText title={"Height:"} description={`${pokemonStats.height}`} />
        <ParamText title={"Weight:"} description={`${pokemonStats.weight}`} />
        <ParamText
          title={"Base exp:"}
          description={`${pokemonStats.baseExp}`}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={[styles.boldText, styles.statsText]}>Stats:</Text>
        <Text style={styles.statsText}>HP: {pokemonStats.hp}</Text>
        <Text style={styles.statsText}>ATTACK: {pokemonStats.attack}</Text>
        <Text style={styles.statsText}>DEFENSE: {pokemonStats.defense}</Text>
        <Text style={styles.statsText}>SPEED: {pokemonStats.speed}</Text>
        <Text style={styles.statsText}>
          SPECIAL-ATTACK: {pokemonStats.specialDefense}
        </Text>
        <Text style={styles.statsText}>
          SPECIAL-DEFENSE: {pokemonStats.specialDefense}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  buttonContaiter: {
    width: "100%",
    paddingBottom: 20,
  },
  back: {
    height: 50,
    width: 50,
  },
  introductionContainer: {
    width: "100%",
    height: 152,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  introductionText: {
    fontSize: 20,
  },
  pokemonImage: {
    height: 150,
    width: 150,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 10,
  },
  introductionDescription: {
    height: "100%",
    flex: 1,
    justifyContent: "space-evenly",
  },
  paramethrsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  statsContainer: {
    width: "100%",
  },
  statsText: {
    fontSize: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
});
