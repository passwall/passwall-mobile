import { useEffect } from 'react';
import { StatusBar, StatusBarStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function useStatusBar(
  theme: StatusBarStyle = 'default',
  animated: boolean = false,
) {
  const navigation = useNavigation();

  useEffect(() => {
    const uns = navigation.addListener('focus', () => {
      StatusBar.setBarStyle(theme, animated);
    });
    return uns;
  }, [navigation, theme, animated]);
}
