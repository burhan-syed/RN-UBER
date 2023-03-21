import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";
const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text style={tw`text-red-500`}>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
