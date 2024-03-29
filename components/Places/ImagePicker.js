import {Alert, Button, Image, Text, View, StyleSheet} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/color";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {

    const [status, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickerImage] = useState('')

    async function verifyPermissions() {
        if (status.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (status.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission!', 'You need to grant camera permission to use this app.')
            return false;
        }

        return true
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickerImage(image.assets[0].uri)
    }

    let imagePreview = <Text>No image taken yet.</Text>
    if(pickedImage && pickedImage.length > 0) {
        imagePreview = <Image source={{uri: pickedImage}} style={styles.image}/>

    }


    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )

}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})