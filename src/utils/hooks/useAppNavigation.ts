import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';

export default function useAppNavigation() {
  return useNavigation<NavigationProp<RootStackProps>>();
}
