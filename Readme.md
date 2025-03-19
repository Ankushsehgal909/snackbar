



# 🌟 CommonPaperSnackbar

A sleek, reusable **React Native snackbar** component powered by React Native Paper and the Animated API. Perfect for delivering stylish, animated notifications to your users! 🎉

---

## ✨ Features

- **Notification Styles** 🎨: Choose from `info`, `success`, or `error` types, each with unique colors and icons.
- **Smooth Animations** 🚀: Enjoy slide-in and fade-in/out effects for a polished look.
- **Fully Customizable** ⚙️: Tweak messages, durations, action buttons, and styles to fit your app.
- **Auto-Dismiss** ⏳: Disappears automatically after a set time.
- **Action Button** 🖱️: Add an optional button with custom text and functionality.
- **Responsive Design** 📱: Adapts beautifully to any screen size with a max-width limit.
- **Material Magic** 🌈: Elevation and shadow effects for that modern Material Design vibe.

---

## 🛠️ Installation

1. Install the required dependencies:
   ```bash
   npm install react-native-vector-icons react-native-paper
   ```

2. Drop `CommonPaperSnackbar.js` into your `components` folder.

3. Import your color constants:
   ```javascript
   import colors from "../../constants/COLORS";
   ```

---

## 🚀 Usage

### Basic Example
```javascript
import CommonPaperSnackbar from './components/CommonPaperSnackbar';

function MyComponent() {
  return (
    <CommonPaperSnackbar
      visible={true}
      message="Operation completed successfully! 🎉"
      type="success"
    />
  );
}
```

### With Context Provider
Manage your snackbar like a pro with `SnackbarProvider`:
```javascript
import { SnackbarProvider, useSnackbar } from './context/SnackbarContext';

function App() {
  return (
    <SnackbarProvider>
      <YourApp />
    </SnackbarProvider>
  );
}

function MyComponent() {
  const { showSnackbar } = useSnackbar();

  const handleAction = () => {
    showSnackbar("Network error! 😢", "error", 3000, "Retry", () => {
      // Retry logic here
    });
  };

  return <Button onPress={handleAction}>Show Snackbar</Button>;
}
```

---

## 📋 Props

| Prop            | Type     | Default      | Description                                     |
|-----------------|----------|--------------|-------------------------------------------------|
| `visible`       | boolean  | `false`      | Show or hide the snackbar.                     |
| `message`       | string   | `""`         | The text to display.                           |
| `type`          | string   | `"info"`     | `info`, `success`, or `error` style.           |
| `duration`      | number   | `3000`       | Time (ms) before auto-dismiss.                 |
| `onDismiss`     | function | `() => {}`   | Callback when snackbar hides.                  |
| `actionText`    | string   | `"Dismiss"`  | Action button text.                            |
| `onActionPress` | function | `null`       | Action button callback.                        |

---

## 🌐 Context API

With `SnackbarProvider`, you get these handy tools via `useSnackbar`:

- **`showSnackbar(message, type, duration, actionText, onActionPress)`**  
  Pop up a snackbar with your custom settings!  
- **`hideSnackbar()`**  
  Hide it manually whenever you want.  
- **`isConnected`**  
  Check network status with this boolean.

---

## 🎨 Styling

Pre-built with flair:
- **Position**: Anchored 20px from the screen bottom.
- **Shadow**: Material Design elevation for depth.
- **Corners**: Smooth 12px border radius.
- **Colors**: Dynamic based on `type` (from `colors` constants).
- **Icons**: Powered by `MaterialCommunityIcons`.
- **Width**: Responsive, maxing out at `screen width - 32px`.

### Customize It! ✂️
Tweak the `styles` object or `getBackgroundColor` to change:
- Colors 🌈
- Spacing 📏
- Fonts ✍️
- Shadows ☁️
- Animation speed ⏱️

---

## 📦 Dependencies

- `react`
- `react-native`
- `react-native-vector-icons/MaterialCommunityIcons`
- `react-native-paper` (via `PaperProvider`)

---

## 🌟 Real-World Example

Check out how it shines in the `Login` component:
```javascript
const { showSnackbar, isConnected } = useSnackbar();

const onSubmit = async (data) => {
  if (!isConnected) {
    showSnackbar("No internet! 📡", "error");
    return;
  }
  // Login logic
  showSnackbar("Logged in! 🎉", "success");
};
```

Displays:
- Network alerts 🚨
- Success messages ✅
- Error feedback ❌

---

## 💡 Notes

- Uses native drivers for silky-smooth animations. 🏎️
- Cleans up timeouts on unmount automatically. 🧹
- Needs a `colors` file for background styles. 🎨
- Plays nice with React Native Paper theming. 🤝

---

Enjoy adding this beautiful snackbar to your app! Let it notify your users in style! ✨
