import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import CommonPaperSnackbar from "../components/CommonPaperSnackbar";

const SnackbarContext = createContext();
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const SnackbarProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "info",
    duration: 3000,
    actionText: "OK",
    onActionPress: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const wasConnected = isConnected;
      setIsConnected(state.isConnected);

      if (!state.isConnected) {
        showSnackbar("No internet connection!", "error");
      } else if (!wasConnected && state.isConnected) {
        showSnackbar("✅ Back online!", "success");
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

  const showSnackbar = (
    message,
    type = "info",
    duration = 2000,
    actionText = "OK",
    onActionPress = null
  ) => {
    setSnackbar({
      visible: true,
      message,
      type,
      duration,
      actionText,
      onActionPress: onActionPress || (() => hideSnackbar()),
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, visible: false }));
  };

  return (
    <SnackbarContext.Provider
      value={{ showSnackbar, hideSnackbar, isConnected }}
    >
      {children}
      <CommonPaperSnackbar
        visible={snackbar.visible}
        message={snackbar.message}
        type={snackbar.type}
        duration={snackbar.duration}
        onDismiss={hideSnackbar}
        actionText={snackbar.actionText}
        onActionPress={snackbar.onActionPress}
      />
    </SnackbarContext.Provider>
  );
};
