const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  style: state => state.style.style
}
export default getters
