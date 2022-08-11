const getters = {
  website: state => state.app.website,
  device: state => state.app.device,
  sidebar: state => state.app.sidebar,
  //#region user
  token: state => state.user.token,
  roles: state => state.user.roles,
  //#endregion
  permission_routes: state => state.permission.routes,
  //#region settings
  sidebarLogo: state => state.settings.sidebarLogo,
  fixedHeader: state => state.settings.fixedHeader,
  tagsView: state => state.settings.tagsView,
  showFooter: state => state.settings.showFooter,
  footerTxt: state => state.settings.footerTxt,
  caseNumber: state => state.settings.caseNumber,
  //#endregion
  tagsList: state => state.tagsView.tagsList,
  cachedViews: state => state.tagsView.cachedViews
}

export default getters
