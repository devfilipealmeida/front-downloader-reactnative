import { Input } from '@/components/input'
import { Button, Text, TouchableOpacity, View } from 'react-native'

export default function Home() {
    return (
        <View className='flex-1 bg-gray-900 justify-center items-center px-10'>
            <Text className='text-white font-heading text-lg' >
                Digite o Código!
            </Text>
            <Text className='text-white font-subtitle text-base' >
                Tudo o que você precisa está aqui!
            </Text>
            <Input>
                <Input.Field keyboardType='numeric' placeholder='000000' />
            </Input>
            <TouchableOpacity 
                className='rounded-full mt-6'
                style={{ backgroundColor: 'green', padding: 10 }}
                onPress={() => { /* Manipulador de evento onPress */ }}
            >
                <Text style={{ color: 'white' }}>Pesquisar</Text>
            </TouchableOpacity>
        </View>
        )
}