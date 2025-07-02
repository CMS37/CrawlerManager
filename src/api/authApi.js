export const loginApi = async (userId, password) => {
    const response = await window.ipcRenderer.invoke('login', { userId, password });
    return response;
};
