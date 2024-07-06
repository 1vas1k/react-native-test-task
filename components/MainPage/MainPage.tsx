import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  Button,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { ListItem } from "../ListItem/ListItem";
import { filter } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setError } from "../../store/errorSlice";
import { setLoading } from "../../store/loadingSlice";

interface IPkemonItem {
  image: string;
  name: string;
  index: number;
}

export const MainPage = () => {
  const loading = useSelector((state: RootState) => state.loading);
  const error = useSelector((state: RootState) => state.error);
  const dispatch = useDispatch();

  const [data, setData] = useState<IPkemonItem[]>([]);
  const [fullData, setFullData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const handleSearch = (text: string) => {
    setSearchText(text);
    const formattedText = text.toLowerCase();
    const filterData = filter(fullData, (pokemon) => {
      return pokemon.name.toLowerCase().includes(formattedText);
    });
    setData(filterData);
  };
  const API_ENDPOINT = `https://pokeapi.co/api/v2/pokemon?limit=151`;

  const getDataFromAPI = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = {
          error:
            "Unable to fetch data, pleacse check URL or network connectivity",
        };
        dispatch(setError(errorText));
        throw new Error(
          `Unable to fetch data, pleacse check URL or network connectivity`
        );
      }
      const dataJson = await response.json();
      try {
        const newData = dataJson.results.map((item: any, index: number) => {
          const uniqueId = Number(item.url.split("/")[6]);
          return {
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
            name: item.name,
            index: uniqueId,
          };
        });
        setFullData(newData);
        setData(newData);
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
      const notLoading = {
        isLoading: false,
      };
      dispatch(setLoading(notLoading));
      return data;
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

  useEffect(() => {
    const loadingNow = {
      isLoading: true,
    };
    dispatch(setLoading(loadingNow));
    getDataFromAPI(API_ENDPOINT);
  }, []);

  if (loading.isLoading || error.error) {
    if (error.error) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ marginBottom: 15, fontSize: 20 }}>
            Oops... have a poblem: {error.error}
          </Text>
          <Button
            onPress={() => {
              const errorText = {
                error: null,
              };
              dispatch(setError(errorText));
            }}
            title="Go back"
          />
        </View>
      );
    }
    if (loading.isLoading) {
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator style={styles.loaderStyles} size={80} />
      </View>;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        clearButtonMode="always"
        autoCapitalize="none"
        onChangeText={(prev) => handleSearch(prev)}
        autoCorrect={false}
      />
      <FlatList
        style={styles.listContainet}
        data={data}
        keyExtractor={(item: any) => item.index}
        renderItem={({ item }) => (
          <ListItem image={item.image} number={item.index} name={item.name} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderStyles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: "center",
  },
  title: {
    paddingTop: 40,
    paddingBottom: 30,
    fontSize: 20,
    color: COLORS.RED,
    fontWeight: "bold",
  },
  input: {
    height: 60,
    width: "80%",
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    color: COLORS.BLACK,
    marginBottom: 30,
  },
  listContainet: {
    width: "100%",
  },
});
