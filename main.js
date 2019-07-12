const {app, BrowserWindow, Menu, Tray, ipcMain, dialog, clipboard} = require('electron');
const fs = require('fs');
var exec = require('child_process').exec;


const DiscordRPC = require('./src');

const path = require('path');
const icoPath = path.join(__dirname, 'logo.png')

const trayTemplate = [
  {
    label: "Exit Loggit",
    click() {
      app.quit();
    }
  }
]

const template = [
  {
    label: 'Window',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click() {
          mainWindow.loadURL(`file://${__dirname}/index.html`);
        }
      },
      {
        label: 'Dev Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click() {
          mainWindow.webContents.openDevTools()
        }
      },
      {
        label: 'Test Page',
        accelerator: 'CmdOrCtrl+T',
        click() {
          mainWindow.loadURL(`file://${__dirname}/index2.html`);
        }
      },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click() {
          mainWindow.webContents.send('save-request');
        }
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        click() {
          mainWindow.webContents.send('copyEvent');
        }
      },
      {
        label: 'Relaunch',
        accelerator: 'CmdOrCtrl+Shift+Alt+R',
        click() {
          //exec(/*process.execPath*/);
          //app.quit();
          app.relaunch();
          app.quit();
        }
      },
      {
        label: 'Close Working File',
        accelerator: 'CmdOrCtrl+W',
        click() {
          mainWindow.webContents.send('close-working-file-request');
        }
      }
    ]
  }
]

let rawSettingsData = fs.readFileSync('config/settings.json');
let parsedUserSettings = JSON.parse(rawSettingsData);

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, (files) => {
    if (files) {
      event.sender.send('selected-directory', files);
    }
  })
})

ipcMain.on('quit-action', () => {
  app.quit();
})

ipcMain.on('get-app-dir', (event) => {
  event.sender.send('app-dir-return', __dirname);
})

ipcMain.on('copy-to-clipboard', (event, textToCopy) => {
  clipboard.writeText(textToCopy);
})

ipcMain.on('save-dialog', (event) => {
  const optionsforsave = {
    title: 'Save Code',
    filters: [
      {
        name: 'Javascript Files',
        extentions: [
          'js'
        ]
      }
    ]
  }
  dialog.showSaveDialog(optionsforsave, (filename) => {
    event.sender.send('saved-file', filename);
  })
})

function createWindow () {
	
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: parsedUserSettings.useOsTitleBar,
    webPreferences: {
      nodeIntegration: true
    },
    minWidth: 900,
    minHeight: 600,
    backgroundColor: "#222222"
  })


  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //mainWindow.loadURL(`file://${__dirname}/htmleditortest.html`)


  // Open the DevTools.
  if (parsedUserSettings.openEditorDevToolsOnStart == true) {
    mainWindow.webContents.openDevTools()
  }
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);


  tray = new Tray(icoPath);

  const trayContextMenu = Menu.buildFromTemplate(trayTemplate);
  tray.setContextMenu(trayContextMenu);
}


app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (mainWindow === null) {
    createWindow();
  }
})

const clientId = '592387404506333188';

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
    if (!rpc || !mainWindow) {
        return;
    }

    rpc.setActivity({
        details: 'On Loggit',
        state: 'Editing a file',
        startTimestamp,
        largeImageKey: 'logo_large',
        largeImageText: 'Loggit',
        instance: false
    });
}

rpc.on('ready', () => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 15e3);
});

rpc.login({ clientId }).catch(console.error);

app.setAsDefaultProtocolClient("loggit");
