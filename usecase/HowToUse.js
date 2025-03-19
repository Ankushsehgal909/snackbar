import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useContext } from "react";
import BackgroundWrapper from "../../components/Wrapper/BackgroundWrapper";
import BigCircle from "../../components/buttons/circleButtons/BigCircle";
import AntDesign from "react-native-vector-icons/AntDesign";
import TextField from "../../components/textFields/index";
import { useForm } from "react-hook-form";
import FullButton from "../../components/buttons/FullButton";
import COLORS from "../../constants/COLORS";
import { UseLoginUser } from "../../API/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import { useSnackbar } from "../../context/SnackbarContext";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const Login = ({ navigation }) => {
  const { showSnackbar, isConnected } = useSnackbar();
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "vidhigoyal76@gmail.com",
      password: "user@123",
    },
  });
  const { mutate: loginUser, isPending } = UseLoginUser();
  const { user, setUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (isPending || !isValid) return;

    if (!isConnected) {
      showSnackbar("Please check your internet connection.", "error");
      return;
    }

    try {
      loginUser(
        { email: data.email, password: data.password },
        {
          onSuccess: async (response) => {
            showSnackbar(response?.message || "Login successful!", "success");
            if (response?.status) {
              try {
                await AsyncStorage.setItem(
                  "accessToken",
                  response?.data?.accessToken
                );
                const token = await AsyncStorage.getItem("accessToken");
                if (token) setUser(true);
              } catch (storageError) {
                showSnackbar("Failed to save login data.", "error");
                console.error("AsyncStorage error:", storageError);
              }
            }
          },
          onError: (error) => {
            showSnackbar(
              error?.response?.data?.message ||
                "Server is busy, please try again.",
              "error"
            );
          },
        }
      );
    } catch (error) {
      showSnackbar("An unexpected error occurred.", "error");
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <BackgroundWrapper>
        <BigCircle
          onPress={() => navigation.goBack()}
          textStyle={{ width: "33%" }}
          lastTextView={{ width: "33%" }}
          BackButtonVisible={() => (
            <AntDesign name={"arrowleft"} color={"white"} size={25} />
          )}
          title={"Login"}
        />
        <View className={"bg-white flex-1 rounded-tr-3xl rounded-tl-3xl p-6"}>
          <TextField
            color={COLORS.fontBlack}
            title={"Email"}
            name="email"
            control={control}
            placeholder={"Enter email address"}
            rules={{
              required: "Enter Email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid Email",
              },
            }}
          />
          <View className={"mt-3.5"}>
            <TextField
              color={COLORS.fontBlack}
              title={"Password"}
              name="password"
              control={control}
              placeholder={"Enter password"}
              rules={{
                required: "Enter Password",
              }}
              hasEye
            />
          </View>
          {!isConnected && (
            <View style={styles.networkStatusContainer}>
              <Text style={styles.networkStatusText}>
                No Internet Connection
              </Text>
            </View>
          )}
          <View className={"flex-1 justify-end"}>
            <FullButton
              disabled={isPending || !isValid}
              loading={isPending}
              style={{ backgroundColor: COLORS.primary }}
              textStyle={{ color: "white" }}
              title={"Login"}
              onPress={handleSubmit(onSubmit)}
            />
            <View className={"justify-center items-center md:mt-8 sm:mt-6"}>
              <Text className={"text-textGrey md:text-sm sm:text-xs"}>
                By clicking create account you agree to recognates
              </Text>
              <Text className={"text-primary md:text-sm sm:text-xs"}>
                Terms of use and Privacy policy
              </Text>
            </View>
          </View>
        </View>
      </BackgroundWrapper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  networkStatusContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderRadius: 8,
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(3),
    marginVertical: responsiveHeight(1.5),
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  networkStatusText: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 0.3,
  },
});

export default Login;
