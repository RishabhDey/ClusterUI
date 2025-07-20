import { Colors, ThemedStyles } from '..constants/Colors';
import { createContext, useEffect } from "react";
import { Appearance } from "react-native";



export const ThemeContext = createContext({});

export const ClusterThemeProvider = ({ children }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());


  const [theme, setTheme] = useState(colorScheme === 'dark' ? Colors.clusterDark : Colors.clusterLight);
  const [defaultStyles, setDefaultStyles] = useState(ThemedStyles(theme));

  useEffect(()=> {
    setTheme(colorScheme === 'dark' ? Colors.clusterDark : Colors.clusterLight);
    setDefaultStyles(ThemedStyles(theme));
  }, [colorScheme]);


  
  return(
    <ThemeContext.Provider value = {{colorScheme, setColorScheme, theme, defaultStyles}}>
      {children}
    </ThemeContext.Provider>
  )
}
