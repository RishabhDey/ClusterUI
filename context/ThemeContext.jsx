import { Colors, ThemedStyles } from '..constants/Colors';
import { createContext } from "react";
import { Appearance } from "react-native";



export const ThemeContext = createContext({});

export const ClusterThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const theme = colorScheme === 'dark' ? Colors.clusterDark : Colors.clusterLight;
  const defaultStyles = ThemedStyles(theme);
  return(
    <ThemeContext.Provider value = {{colorScheme, setColorScheme, theme, defaultStyles}}>
      {children}
    </ThemeContext.Provider>
  )
}
