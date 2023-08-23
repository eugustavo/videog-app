import { Home, PlusCircle, User } from 'lucide-react-native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Feed } from '@screens/Feed';
import { VideoUpload } from '@screens/VideoUpload';
import { VideoComments } from '@screens/VideoComments';
import { Profile } from '@screens/Profile';

import { tabBar } from '@styles/tabBar'

type AppRoutes = {
  Feed: undefined;
  VideoUpload: undefined;
  VideoComments: {
    videoId: string;
  };
  Profile: {
    userId?: string;
  };
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();
const iconSize = 24;

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#7c3aed",
        tabBarInactiveTintColor: "#fff",
        tabBarHideOnKeyboard: true,
        tabBarStyle: tabBar
      }}
    >
      <Screen 
        name="Feed" 
        component={Feed} 
        options={{
          tabBarIcon: ({ color }) => (<Home color={color} size={iconSize}/>)
        }}
      />

      <Screen
        name="VideoUpload"
        component={VideoUpload}
        options={{
          tabBarIcon: ({ color }) => (<PlusCircle color={color} size={iconSize} />)
        }}  
      />

      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (<User color={color} size={iconSize} />)
        }}
      />

      <Screen
        name="VideoComments"
        component={VideoComments}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  )
}