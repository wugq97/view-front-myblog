const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  style: state => state.style.style,
  chatContent: state => state.chat.content
}
export default getters
