import { ElectronAPI } from '@electron-toolkit/preload'
import * as DomainConfig from '@/main/config/index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    DomainConfig: typeof DomainConfig
  }
}
