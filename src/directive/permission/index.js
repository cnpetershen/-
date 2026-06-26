import permission from './permission'

const install = function (Vue) {
    Vue.directive('permission', permission)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

permission.install = install
export default permission
