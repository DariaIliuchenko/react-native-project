import { useFonts } from 'expo-font';

import LoginScreen from "./src/Screens/auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/Screens/auth/RegistrationScreen/RegistrationScreen";

export default function App() {

  const [loaded] = useFonts({
    'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <RegistrationScreen/>
  );
}

