import axios from 'axios';
import { Platform } from 'react-native';

export const api = axios.create({
  baseURL: Platform.OS === 'ios' ? 'http://localhost:3333' : 'http://192.168.0.122:3333'
})