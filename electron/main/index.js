import { app, BrowserWindow, Menu, screen } from "electron";
import path from "path";
// import { ipcMain, dialog } from "electron";
// import fs from "fs-extra";
// 是否是生产环境
const isPackaged = app.isPackaged;
app.disableHardwareAcceleration()
// 禁止显示默认菜单
// Menu.setApplicationMenu(null);

// 主窗口
let mainWindow;

const createWindow = () => {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    // 默认窗口标题，如果由loadURL()加载的HTML文件中含有标签<title>，此属性将被忽略。
    title: "Electron + Vue3",
    // width: 800,
    // height: 600,
    // 设置窗口尺寸为屏幕工作区尺寸
    width: screen.getPrimaryDisplay().workAreaSize.width,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    // 设置最小尺寸
    minWidth: 800,
    minHeight: 600,
    icon: path.resolve(__dirname, "../public/favicon.ico"),
    webPreferences: {
      devTools: true,
      contextIsolation: false,
      nodeIntegration: true,
      // webSecurity: false
    },
  });
  if (isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }
  app.commandLine.appendSwitch("disable-http2");
};
// 创建 menu
function createMenu() {
  let menuStructure = [
    {
      label: '操作',
      submenu: [
        {
          label: '刷新', // 刷新页面
          click(targetWindow) {
            // 获取当前窗口
            const currentWindow = BrowserWindow.getFocusedWindow();
            // 刷新当前窗口
            currentWindow.reload();
          }
        },
        { label: '最小化', role: 'minimize' },
        {
          label: '打开调试窗口',
          click(menuItem, targetWindow) {
            targetWindow.openDevTools()
          }
        },
        {
          label: '关闭调试窗口',
          click(menuItem, targetWindow) {
            targetWindow.closeDevTools()
          }
        },
        { type: 'separator' },
        { label: '退出', role: 'quit' },
      ]
    },
  ]
  let menu = Menu.buildFromTemplate(menuStructure)
  Menu.setApplicationMenu(menu)
}
// 在应用准备就绪时调用函数
app.whenReady().then(() => {
  createWindow();
  createMenu();
  app.on("activate", () => {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 如果开发环境使用了 nginx 代理，禁止证书报错
if (!isPackaged) {
  // 证书的链接验证失败时，触发该事件
  app.on(
    "certificate-error",
    function (event, webContents, url, error, certificate, callback) {
      event.preventDefault();
      callback(true);
    }
  );
}
