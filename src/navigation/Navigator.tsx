import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { PermissionScreen } from '../screens/PermissionScreen';
import { PermissionsContext } from '../context/PermissionContext';
import { LoadingScreen } from '../screens/LoadingScreen';

export type RootStackParams = {
    MapScreen: undefined,
    PermissionScreen: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator = () =>  {

  const { permissions } = useContext(PermissionsContext);

  if ( permissions.locationStatus === 'unavailable' ) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
        //initialRouteName="PermissionScreen"
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white',
            },
        }}
    >
      {
        permissions.locationStatus === 'granted'
          ? <Stack.Screen name="MapScreen" component={ MapScreen } />
          : <Stack.Screen name="PermissionScreen" component={ PermissionScreen } />
      }
    </Stack.Navigator>
  );
};
