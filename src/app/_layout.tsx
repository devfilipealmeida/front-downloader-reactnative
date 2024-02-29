import "@/styles/global.css"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

import {
    useFonts, 
    Roboto_400Regular, 
    Roboto_500Medium, 
    Roboto_700Bold 
} from "@expo-google-fonts/roboto"

export default function Layout() {
    const [ fontsLoaded ] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    })

    if (!fontsLoaded) {
        return
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Slot />
        </GestureHandlerRootView>
    )
}