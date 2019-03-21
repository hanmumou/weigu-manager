const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  colonelistRes: state => state.colonelist.res,
  coloneList: state => state.colonelist.list,
  coloneStatus: state => state.colonelist.conloneStatus,
  addres: state => state.addshop.addres,
  del: state => state.deleteshop.del
}
export default getters
