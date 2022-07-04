const host = 'https://i-chat-kings.herokuapp.com';
const RegisterRoute = `${host}/api/auth/register`;
const LoginRoute = `${host}/api/auth/login`;
const SetAvatarRoute = `${host}/api/auth/setAvatar`;
const allUsers = `${host}/api/auth/users`;
const addMsg = `${host}/api/messages/addMsg`;
const getMsg = `${host}/api/messages/getMsg`


export {
  RegisterRoute,
  LoginRoute,
  SetAvatarRoute,
  allUsers,
  addMsg,
  getMsg,
  host
}
