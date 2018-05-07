const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const fs = require('fs');

const ipc = electron.ipcMain
const Menu = electron.Menu;

let template = [{
    label: 'Edit App',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
    }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
    }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
    }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
    }]
    }, {
        label: 'View',
        submenu: [{
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
    if (focusedWindow) {
    // on reload, start fresh and close any old
    // open secondary windows
            if (focusedWindow.id === 1) {
            BrowserWindow.getAllWindows().forEach(function (win) {
                if (win.id > 1) {
                win.close()
                    }
                })
           }   
            focusedWindow.reload()
        }
    }
    }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
        if (process.platform === 'darwin') {
            return 'Ctrl+Command+F'
        } else {
            return 'F11'
        }
    })(),
    click: function (item, focusedWindow) {
        if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
    }
    }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
    if (process.platform === 'darwin') {
        return 'Alt+Command+I'
    } else {
        return 'Ctrl+Shift+I'
        }
    })(),
        click: function (item, focusedWindow) {
        if (focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        }
    }]
   }]
   
   let windowMenu = {
        label: 'Window',
        role: 'window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
        }, {
            type: 'separator'
        }, {
        label: 'Reopen Window',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: function () {
            app.emit('activate')
        }
    }]
   }
   
   template.push(windowMenu)
   
   if (process.platform === 'darwin') {
       let name = 'App Name'
       template.unshift({
           label: name,
           submenu: [
               {
                   label: `About ${name}`,
                   role: 'about',
               },
               { type: 'separator' },
                   {
                       label: 'Preferences',
                       accelerator: 'Command+,',
                       click: appPrefs
                   },
               { type: 'separator' },
                   {
                       label: 'Services',
                       role: 'services',
                       submenu: [],
                   },
               { type: 'separator' },
               {
                   label: `Hide ${name}`,
                   accelerator: 'Command+H',
                   role: 'hide',
               }, {
                   label: 'Hide Others',
                   accelerator: 'Command+Alt+H',
                   role: 'hideothers',
               }, {
                   label: 'Show All',
                   role: 'unhide',
               },
               { type: 'separator' },
               {
                   label: `Quit ${name}`,
                   accelerator: 'Command+Q',
                   click: function () {
                       app.quit()
                   }
               }]
           })
           template[3].submenu.push({
               type: 'separator'
           }, {
               label: 'Bring All to Front',
               role: 'front'
           })
       }

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    //Wait for the 'ready-to-show' event to be emitted before displaying our window
    mainWindow.once('ready-to-show', () => {
	    mainWindow.show()
    })

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
	createWindow() //Instead of passing the function name we've used it at the end of another one, that we pass.
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

//Functions for saving data
ipc.on('data', (event, payload) => {
    text = payload;
    const write = (text) => {
        let fileName = `${app.getPath('documents')}/${post.id}-note.txt`;
        fs.writeFileSync(fileName, post);
      };
});