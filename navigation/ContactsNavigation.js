import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Contacts from '../pages/Contacts';
import NewContact from '../pages/NewContact';
import Colors from '../constants/Colors';

const ContactsNavigation = createStackNavigator(
  {
    Contacts: Contacts,
    NewContact: NewContact,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ContactsNavigation);
