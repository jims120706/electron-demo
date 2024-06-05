import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import events from '@/main/config/event'
import Login from '@/main/util/login'

const loginManager = Login.getInstance()

async function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    }
  })

  mainWindow.on('ready-to-show', async() => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }


  // 初始话登录器
  mainWindow.webContents.send(events.INIT_LOGIN_MANAGER, JSON.stringify(Login.getInstance()));

  mainWindow.webContents.openDevTools()
}

app.whenReady().then(async() => {
  
  electronApp.setAppUserModelId('com.electron')
  
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  // 点击刷新验证码
  ipcMain.on('refresh-verify-code', () => {
    loginManager.getVerifyCode()
  })
  // 点击登录
  ipcMain.on('login', (event, verifyCode) => {
    loginManager.login(verifyCode)
  })
  
  await loginManager.getVerifyCode()
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
