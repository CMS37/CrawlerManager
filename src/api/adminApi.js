export const fetchPendingList = async (authToken) => {
    const response = await window.ipcRenderer.invoke('fetch-pending-list', { authToken });
    return response;
};

export const fetchUserList = async (authToken) => {
    const response = await window.ipcRenderer.invoke('fetch-user-list', { authToken });
    return response;
};

export const approveUser = async (authToken, userId) => {
    await window.ipcRenderer.invoke('approve-user', { authToken, userId });
};

export const rejectUser = async (authToken, userId) => {
    await window.ipcRenderer.invoke('reject-user', { authToken, userId });
};

export const removeUser = async (authToken, userId) => {
    await window.ipcRenderer.invoke('remove-user', { authToken, userId });
};
