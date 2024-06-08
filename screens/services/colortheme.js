import { useColorScheme } from 'react-native';

export function primaryColor() {
    const colorScheme = useColorScheme();
    const primaryColor = colorScheme === 'dark' ? '#509DFF' : '#010bff';
    console.log(primaryColor)
    return primaryColor;
}

export function secondaryColor() {
    const colorScheme = useColorScheme();
    const secondaryColor = colorScheme === 'dark' ? '#509DFF' : '#509DFF';
    return secondaryColor;
}