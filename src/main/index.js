import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const apiKeyTrack24 = 'e4c867170cf5d6309b9180c67d182544'
const apiKeyGdePosylka =
  'cd9127350ceb559f60b475e432e367be6b7c4ee4c5ef443aeee46876d5d2b3ad8d2134390e95192b'

async function checkTrack24(track) {
  try {
    const response = await fetch(
      `https://api.track24.ru/tracking.json.php?apiKey=${apiKeyTrack24}&domain=localhost&pretty=true&code=${track}`
    )
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching track data:', error)
    throw error
  }
}
async function checkGdePosylka(track) {
  try {
    const responseSlug = await fetch(`https://gdeposylka.ru/api/v4/tracker/detect/${track}`, {
      headers: {
        'X-Authorization-Token': apiKeyGdePosylka,
        'Content-Type': 'application/json'
      }
    })

    if (!responseSlug.ok) {
      throw new Error(`HTTP error! status: ${responseSlug.status}`)
    }

    const slugData = await responseSlug.json()

    if (!slugData.data || slugData.data.length === 0 || !slugData.data[0].courier) {
      throw new Error('Invalid response format or no courier data')
    }

    const slug = slugData.data[0].courier.slug
    console.log(responseSlug)

    const response = await fetch(`https://gdeposylka.ru/api/v4/tracker/${slug}/${track}`, {
      headers: {
        'X-Authorization-Token': apiKeyGdePosylka,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching track data:', error)
    return {
      status: 'error',
      message: 'Не удалось получить данные отслеживания: ' + error.message
    }
  }
}

ipcMain.handle('checkTrack24', (_, track) => checkTrack24(track))
ipcMain.handle('checkGdePosylka', (_, track) => checkGdePosylka(track))
