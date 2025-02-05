export const LoginApi = () =>
  `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`;
export const LogoutApi = () =>
  `${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`;
export const RegisterApi = () =>
  `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`;
export const GetUserApi = () =>
  `${import.meta.env.VITE_BASE_URL}/api/v1/users/currentuser`;
export const ChangeAvatarApi = () => ``;
export const UpdateUserApi = () => ``;
