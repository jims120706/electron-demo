import { ElectronAPI } from '@electron-toolkit/preload'
import * as DomainConfig from '@/main/config/index'
import Login from '@/main/util/index'
import events from '@/main/config/event'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    DomainConfig: typeof DomainConfig
    loginManager: typeof Login
    events: typeof events
  }
}
