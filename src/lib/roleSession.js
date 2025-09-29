export const setRole = (role) => localStorage.setItem("role", role);
export const getRole = () => localStorage.getItem("role");
export const clearRole = () => localStorage.removeItem("role");
