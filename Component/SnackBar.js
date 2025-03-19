import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/COLORS";

const { width } = Dimensions.get("window");

const CommonPaperSnackbar = ({
  visible = false,
  message = "",
  type = "info", // 'success', 'error', 'info'
  duration = 3000,
  onDismiss = () => {},
  actionText = "Dismiss",
  onActionPress = null,
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timeout = setTimeout(() => {
        dismissSnackbar();
      }, duration);

      return () => clearTimeout(timeout);
    } else {
      dismissSnackbar();
    }
  }, [visible]);

  const dismissSnackbar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return colors.greenBorder;
      case "error":
        return colors.red;
      default:
        return colors.primary;
    }
  };

  const getIconName = () => {
    switch (type) {
      case "success":
        return "check-circle-outline";
      case "error":
        return "alert-circle-outline";
      default:
        return "information-outline";
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY: slideAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name={getIconName()}
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.message}>{message}</Text>
      </View>
      {onActionPress && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            onActionPress();
            dismissSnackbar();
          }}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    maxWidth: width - 32,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  message: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },
  actionButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});

export default CommonPaperSnackbar;
