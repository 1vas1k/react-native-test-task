import { MainPage } from "./components/MainPage/MainPage";
import { InfoPage } from "./components/InfoPage/InfoPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParams = {
  Main: any;
  Info: any;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStack.Navigator initialRouteName="Main">
          <RootStack.Screen
            name="Main"
            component={MainPage}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Info"
            component={InfoPage}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
