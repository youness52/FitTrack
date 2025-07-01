import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePickerExpo from 'expo-image-picker';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';

type ImagePickerProps = {
  currentImage?: string;
  onImageSelected: (imageUri: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
};

export default function ImagePicker({ 
  currentImage, 
  onImageSelected, 
  placeholder = "Add Image",
  size = 'medium'
}: ImagePickerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePickerExpo.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to select images.'
        );
        return false;
      }
    }
    return true;
  };

  const showImagePicker = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    if (Platform.OS === 'web') {
      // For web, we'll use a fallback with predefined images
      showWebImageOptions();
      return;
    }

    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Photo Library', onPress: openImageLibrary },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const showWebImageOptions = () => {
    const webImages = [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    ];
    
    const randomImage = webImages[Math.floor(Math.random() * webImages.length)];
    onImageSelected(randomImage);
  };

  const openCamera = async () => {
    setIsLoading(true);
    try {
      const result = await ImagePickerExpo.launchCameraAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open camera');
    } finally {
      setIsLoading(false);
    }
  };

  const openImageLibrary = async () => {
    setIsLoading(true);
    try {
      const result = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open image library');
    } finally {
      setIsLoading(false);
    }
  };

  const getContainerStyle = () => {
    switch (size) {
      case 'small':
        return [styles.container, styles.smallContainer];
      case 'large':
        return [styles.container, styles.largeContainer];
      default:
        return styles.container;
    }
  };

  const getImageStyle = () => {
    switch (size) {
      case 'small':
        return [styles.image, styles.smallImage];
      case 'large':
        return [styles.image, styles.largeImage];
      default:
        return styles.image;
    }
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={showImagePicker}
      disabled={isLoading}
    >
      {currentImage ? (
        <Image
          source={{ uri: currentImage }}
          style={getImageStyle()}
          contentFit="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <ImageIcon size={size === 'small' ? 20 : size === 'large' ? 32 : 24} color={Colors.dark.primary} />
          <Text style={styles.placeholderText}>{placeholder}</Text>
        </View>
      )}
      
      {currentImage && (
        <View style={styles.overlay}>
          <Camera size={16} color={Colors.dark.text} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  smallContainer: {
    width: 60,
    height: 60,
  },
  largeContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  smallImage: {
    borderRadius: 8,
  },
  largeImage: {
    borderRadius: 60,
  },
  placeholder: {
    alignItems: 'center',
    gap: 4,
  },
  placeholderText: {
    fontSize: 10,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});