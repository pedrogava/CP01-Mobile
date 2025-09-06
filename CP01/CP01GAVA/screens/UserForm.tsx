import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";
import { UsersContext, User } from "../screens/UsersContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type RootStackParamList = {
  UserList: undefined;
  UserForm: { user?: User };
};

type UserFormProps = {
  navigation: StackNavigationProp<RootStackParamList, "UserForm">;
  route: RouteProp<RootStackParamList, "UserForm">;
};

export default function UserForm({ navigation, route }: UserFormProps) {
  const { addUser, updateUser } = useContext(UsersContext);
  const user = route.params?.user;

  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [avatar, setAvatar] = useState(user ? user.avatar : "");

  function handleSave() {
    if (!name || !email || !avatar) {
      Alert.alert("Ops!", "Todos os campos devem ser preenchidos!");
      return;
    }

    if (user) {
      updateUser({ id: user.id, name, email, avatar });
    } else {
      addUser({ name, email, avatar });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="URL do Avatar"
        style={styles.input}
        value={avatar}
        onChangeText={setAvatar}
      />
      <Button title="Salvar" onPress={handleSave} color="#e91e63" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});
