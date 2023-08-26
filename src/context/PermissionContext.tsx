/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, check, request, openSettings } from 'react-native-permissions';

export interface PermissionsState {
    locationStatus: PermissionStatus;
    //camaraStatus...
}

export const permissionsInitState: PermissionsState = {
    locationStatus: 'unavailable',
    //camaraStatus...
};

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

// Context
export const PermissionsContext = createContext({} as PermissionsContextProps);

// Provider
export const PermissionProvider = ({ children }: any ) => {

    const [ permissions, setPermissions ] = useState(permissionsInitState);

    useEffect(() => {
        checkLocationPermission();

        AppState.addEventListener('change', state => {
            if ( state !== 'active' ) { return; }

            checkLocationPermission();
        });

        /* return () => {
            AppState.removeEventListener('change'); -> Practica
        } */
    }, []);

    const askLocationPermission = async () => {

        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios' ) {
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else {
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        if ( permissionStatus === 'blocked') {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus,
        });

    };


    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios' ) {
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else {
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus,
        });
    };


    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
        }}>
            { children }
        </PermissionsContext.Provider>
    );

};
