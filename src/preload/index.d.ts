import { ElectronAPI } from '@electron-toolkit/preload'
import Login from '../main/utils/login'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    Urls: unknown
    Login: typeof Login
  }
}
