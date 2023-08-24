/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionsContext } from '../context/PermissionContext';
import { BlackButton } from '../components/BlackButton';

export const PermissionScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionsContext);

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>
                Es necsario el uso del GPS para usar esta App
            </Text>

            <BlackButton
                title="Permiso"
                onPress={ askLocationPermission }
            />

            <Text style={{ marginTop: 20 }}>
                { JSON.stringify(permissions, null, 5) }
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
});
