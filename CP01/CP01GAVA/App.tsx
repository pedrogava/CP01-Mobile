import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import UsersProvider from "../CP01GAVA/screens/UsersContext";
import UserList from "../CP01GAVA/screens/UserList";
import UserForm from "../CP01GAVA/screens/UserForm";
import { User } from "../CP01GAVA/screens/UsersContext";

export type RootStackParamList = {
  UserList: undefined;
  UserForm: { user?: User };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={{ title: "Lista de Usuários" }}
          />
          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{ title: "Formulário de Usuários" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
}
