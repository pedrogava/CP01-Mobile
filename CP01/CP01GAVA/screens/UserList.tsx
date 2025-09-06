import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { UsersContext, User } from "../screens/UsersContext";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  UserList: undefined;
  UserForm: { user?: User };
};

type UserListProps = {
  navigation: StackNavigationProp<RootStackParamList, "UserList">;
};

export default function UserList({ navigation }: UserListProps) {
  const { users, deleteUser } = useContext(UsersContext);

  function confirmDelete(id: string) {
    Alert.alert("Excluir", "Deseja excluir este usuário?", [
      { text: "Cancelar" },
      { text: "Excluir", onPress: () => deleteUser(id) },
    ]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("UserForm", { user: item })}
            onLongPress={() => confirmDelete(item.id)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("UserForm")}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontWeight: "bold" },
  addBtn: {
    backgroundColor: "#e91e63",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 28 },
});
