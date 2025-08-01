import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="uploadimages"
        options={{
          title: 'add images',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="image" color={color} />,
        }}
      />
    </Tabs>
  );
}
