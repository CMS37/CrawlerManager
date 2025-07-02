export const signupApi = async ({ name, userId, password }) => {
    return await window.ipcRenderer.invoke('signup', { name, userId, password });
};
