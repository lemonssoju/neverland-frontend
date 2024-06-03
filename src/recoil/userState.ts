import { atom } from 'recoil';
import { UserProps } from '../components/Home/Settings/SettingsHome';

export const userState = atom<UserProps>({
  key: 'userState',
  default: {
    nickname: '',
    profileImage: '',
  },
});
