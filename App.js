import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AllExpensesScreen from './screens/AllExpensesScreen';
import RecentExpensesScreen from './screens/RecentExpensesScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import C from './constants/Colors';
import { Provider, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { store as expenseStore } from './store/store';
import authStore from './store/auth-slice';
import { expenseSlice } from './store/store';
import { authSlice } from './store/auth-slice';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const rootReducer = combineReducers({
  expense: expenseSlice.reducer,
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedTab() {
  return (
    // <NavigationContainer>
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
          title: 'Recent Expenses',
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
          title: 'All Expenses',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

function Navigation() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticaded);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
