import { app, BrowserWindow, ipcMain } from 'electron';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_BASE_URL = 'https://8enzofezgd.execute-api.ap-northeast-2.amazonaws.com/api';

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.loadFile('dist/index.html'); // React 빌드 파일 경로

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    async function fetchApi(endpoint, options = {}) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, message: data.message || '요청 실패' };
            }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            return { success: false, message: '서버 오류가 발생했습니다.' };
        }
    }

    ipcMain.handle('login', async (event, { userId, password }) => {
        return fetchApi('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password }),
        });
    });

    ipcMain.handle('fetch-pending-list', async (event, { authToken }) => {
        return fetchApi('/admin/pending-users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
    });

    ipcMain.handle('fetch-user-list', async (event, { authToken }) => {
        return fetchApi('/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
    });

    ipcMain.handle('approve-user', async (event, { authToken, userId }) => {
        return fetchApi('/admin/approve-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
    });

    ipcMain.handle('reject-user', async (event, { authToken, userId }) => {
        return fetchApi('/admin/reject-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
    });

    ipcMain.handle('remove-user', async (event, { authToken, userId }) => {
        return fetchApi('/admin/remove-user', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        });
    });

    ipcMain.handle('signup', async (event, { name, userId, password }) => {
        return fetchApi('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, userId, password }),
        });
    });
});

app.on('window-all-closed', () => {
    if (!app.isReady()) {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        app.emit('ready');
    }
});

app.on('web-contents-created', (event, contents) => {
    contents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
            }
        });
    });
});
