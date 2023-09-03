import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import C from "./constants/Colors";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveBackgroundColor: C.mainBackGround,
            tabBarInactiveBackgroundColor: C.secBackGround,
            tabBarActiveTintColor: C.mainTint,
            headerTintColor: C.mainTint,
            headerStyle: {
              backgroundColor: C.mainBackGround,
            },
          }}
        >
          <Tab.Screen
            name="RecentExpeneses"
            component={RecentExpensesScreen}
            tabBarActiveBackgroundColor="red"
            options={{
              title: "Recent Expenses",
              headerTintColor: C.mainTint,
              tabBarIcon: ({ size, color }) => (
                <Feather name="clock" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="AllExpenses"
            component={AllExpensesScreen}
            options={{
              title: "All Expenses",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="attach-money" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
