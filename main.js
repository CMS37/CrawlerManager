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
            contextIsolation: true, // contextBridge를 사용하기 위해 true로 설정
            preload: path.join(__dirname, 'preload.js'), // preload.js 경로
        },
    });

    // mainWindow.loadURL('http://localhost:5173'); // React 개발 서버 URL
    mainWindow.loadFile('dist/index.html'); // React 빌드 파일 경로

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // IPC를 통해 로그인 요청 처리
    ipcMain.handle('login', async (event, { userId, password }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password })
            });

            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, message: data.message || '아이디 또는 비밀번호가 올바르지 않습니다.' };
            }
        } catch {
            return { success: false, message: '로그인 서버 오류' };
        }
    });

    ipcMain.handle('fetch-pending-list', async (event, { authToken }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/pending-users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                throw new Error(data.message || '승인 목록을 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching approval list:', error);
            throw error;
        }
    });

    ipcMain.handle('fetch-user-list', async (event, { authToken }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                throw new Error(data.message || '사용자 목록을 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching user list:', error);
            throw error;
        }
    });

    ipcMain.handle('approve-user', async (event, { authToken, userId }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/approve-user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('승인 요청 실패');
            }
        } catch (error) {
            console.error('Error approving user:', error);
            throw error;
        }
    });

    ipcMain.handle('reject-user', async (event, { authToken, userId }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/reject-user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('거부 요청 실패');
            }
        } catch (error) {
            console.error('Error rejecting user:', error);
            throw error;
        }
    });

    ipcMain.handle('remove-user', async (event, { authToken, userId }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/remove-user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('삭제 요청 실패');
            }
        } catch (error) {
            console.error('Error removing user:', error);
            throw error;
        }
    });

    ipcMain.handle('signup', async (event, { name, userId, password }) => {
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, userId, password })
            });

            const data = await response.json();
            if (response.ok) {
                return { success: true, data };
            } else {
                return { success: false, message: data.message || '회원가입에 실패했습니다.' };
            }
        } catch {
            return { success: false, message: '서버 오류가 발생했습니다.' };
        }
    });
});

app.on('window-all-closed', () => {
    if (!app.isReady()) {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: true, // contextBridge를 사용하기 위해 true로 설정
                enableRemoteModule: true, // 추가된 옵션
                preload: path.join(__dirname, 'preload.js'), // preload.js 경로
            },
        });

        mainWindow.loadURL('http://localhost:5173');
    }
});

// Content Security Policy 설정
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
