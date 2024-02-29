import { ReactNode } from "react";
import { TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/styles/colors"

type InputProps = {
    children: ReactNode
}

function Input({ children }: InputProps) {
    return (
    <View className="w-full h-14 bg-gray-800 rounded-lg p-4 flex-row items-center gap-4 mt-6">
        {children}
    </View>)
}

function InputField({ ...rest }: TextInputProps) {
    return (
    <TextInput className="flex-1 font-normal text-base text-white" 
        placeholderTextColor={colors.gray[400]}
        {...rest} />
    )
}

Input.Field = InputField

export { Input }