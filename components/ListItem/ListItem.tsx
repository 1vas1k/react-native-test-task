import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { setPoke } from "../../store/pokemonSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../App";
import { setLoading } from "../../store/loadingSlice";
import { setError } from "../../store/errorSlice";

interface IProps {
  image: string;
  number: number;
  name: string;
}

export const ListItem = ({ image, number, name }: IProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const API_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${number}`;
  const getPokemonInfo = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = {
          error:
            "Unable to fetch data, please check URL of this pokenon or network connectivity",
        };
        dispatch(setError(errorText));
        throw new Error(
          "Unable to fetch data, please check URL of this pokenon or network connectivity"
        );
      }
      const dataJson = await response.json();

      const initialState = {
        image: dataJson.sprites.front_default,
        name: dataJson.forms[0].name,
        id: number,
        types: dataJson.types.map((item: any) => {
          return item.type.name;
        }),
        height: dataJson.height,
        weight: dataJson.weight,
        baseExp: dataJson.base_experience,
        hp: dataJson.stats[0].base_stat,
        attack: dataJson.stats[1].base_stat,
        defense: dataJson.stats[2].base_stat,
        speed: dataJson.stats[5].base_stat,
        specialAttack: dataJson.stats[3].base_stat,
        specialDefense: dataJson.stats[4].base_stat,
      };
      dispatch(setPoke(initialState));
      const notLoading = {
        isLoading: false,
      };
      dispatch(setLoading(notLoading));
      navigation.navigate("Info");
    } catch (error: any) {
      const notLoading = {
        isLoading: false,
      };
      dispatch(setLoading(notLoading));
      const errorText = {
        error: error,
      };
      dispatch(setError(errorText));
    }
  };
  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <TouchableHighlight
      underlayColor={COLORS.BLACK_OPAQUE[10]}
      style={styles.touchContainer}
      onPress={() => {
        getPokemonInfo(API_ENDPOINT);
      }}
    >
      <View style={styles.container}>
        <Image style={styles.imageContainer} source={{ uri: image }} />
        <Text style={styles.textStyles}>{`${number}. ${capitalizeFirstLetter(
          name
        )}`}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  loaderStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 80,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    height: 68,
    width: 68,
    marginLeft: 5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyles: {
    fontSize: 16,
  },
  touchContainer: {
    marginBottom: 15,
    borderRadius: 10,
  },
});
