import { Input } from '@/components/input'
import { useState } from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity, View, Modal, Platform, Linking } from 'react-native'
import * as FileSystem from "expo-file-system"
import * as Sharing from "expo-sharing"
import * as IntentLauncher from 'expo-intent-launcher'
import * as Updates from 'expo-updates'
import axios from 'axios'


const APK_NAME = "app.apk"

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [codApp, setCodApp] = useState(0)
    const [urlDownload, setUrlDownload] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const [progressPercentage, setProgressPercentage] = useState(0)

    const handleInputChange = (text: string) => {
        const codeNumber = parseInt(text)
        setCodApp(codeNumber);
    }

    const handleSearchCod = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`https://dowloader-api-cvpkx5fp3q-uc.a.run.app/storeapp/download/${codApp}`)
            setUrlDownload(response.data.urlFile)
            setIsLoading(false)
            setModalVisible(true)
        } catch (error) {
            Alert.alert("Download", "Não foi possível realizar o download.")
            console.error(error)
            setIsLoading(false)
        }
    }

    function onDownloadProgress({totalBytesWritten, totalBytesExpectedToWrite}: FileSystem.DownloadProgressData) {
        const percentage = (totalBytesWritten / totalBytesExpectedToWrite) * 100
        setProgressPercentage(percentage)
    }

    async function handleDownload() {
        try {
            setIsDownloading(true)
            const fileUri = FileSystem.documentDirectory + APK_NAME
            const downloadResumable = FileSystem.createDownloadResumable(
                urlDownload,
                fileUri,
                {},
                onDownloadProgress
            )

            const downloadResponse = await downloadResumable.downloadAsync()

            if (downloadResponse?.uri) {
                // await fileSave(downloadResponse.uri, APK_NAME)
                setProgressPercentage(0)
                setIsDownloading(false)
                // await openDownloadedApk(fileUri)
            }
        } catch (error) {
            Alert.alert("Download", "Não foi possível realizar o download.")
            console.error(error)
        }
    }

    async function fileSave(uri: string, filename: string) {
        if (Platform.OS === "android") {
          const directoryUri = FileSystem.cacheDirectory + filename

          const base64File = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          })
    
          await FileSystem.writeAsStringAsync(directoryUri, base64File, {
            encoding: FileSystem.EncodingType.Base64,
          })
    
          await Sharing.shareAsync(directoryUri)
        } else {
          Sharing.shareAsync(uri)
        }
      }

      

    //   async function openDownloadedApk(fileUri: string) {
    //     if (Platform.OS === "android") {
    //         // Verificar se o APK já foi baixado com sucesso
    //         const apkExists = await FileSystem.getInfoAsync(fileUri);
    //         if (apkExists.exists) {
    //             await Linking.openURL(fileUri);
    //         } else {
    //             Alert.alert("Erro", "O APK não foi encontrado.");
    //         }
    //     } else {
    //         Alert.alert("Erro", "Este recurso só é suportado em dispositivos Android.");
    //     }
    // }

    return (
        <View className='flex-1 bg-gray-900 justify-center items-center px-10'>
            <Text className='text-white font-heading text-lg' >
                Digite o Código!
            </Text>
            <Text className='text-white font-subtitle text-base'>
                Tudo o que você precisa está aqui!
            </Text>
            <Input>
                <Input.Field keyboardType='numeric' placeholder='000000' onChangeText={handleInputChange} />
            </Input>
            <TouchableOpacity 
                className='rounded-full mt-6'
                style={{ backgroundColor: 'green', padding: 10 }}
                onPress={handleSearchCod}
            >
            {isLoading ? (<ActivityIndicator />) : (<Text style={{ color: 'white' }}>Pesquisar</Text>)}
            </TouchableOpacity>
            <Modal animationType='slide' transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View className="flex-1 justify-center items-center bg-gray-900 bg-opacity-75">
                    <View className="bg-white p-8 rounded-lg">
                        <Text>Aplicativo encontrado.</Text>
                        <TouchableOpacity 
                            className="rounded-full mt-6"
                            style={{ backgroundColor: 'green', padding: 10 }}
                            onPress={handleDownload}
                        >
                            {isDownloading ? (<ActivityIndicator />) : (<Text style={{ color: 'white', alignSelf: 'center' }}>Download</Text>)}
                        </TouchableOpacity>
                        {progressPercentage > 0 && (
                            <Text style={{ color: 'black', alignSelf: 'center' }}>
                            {progressPercentage.toFixed(1)}% baixado...
                            </Text>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
        )
}