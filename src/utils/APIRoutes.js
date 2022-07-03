const host = 'http://localhost:4000';

const RegisterRoute = `${host}/api/auth/register`;
const LoginRoute = `${host}/api/auth/login`;
const SetAvatarRoute = `${host}/api/auth/setAvatar`;
const allUsers = `${host}/api/auth/users`;


export {
  RegisterRoute,
  LoginRoute,
  SetAvatarRoute,
  allUsers,
}
