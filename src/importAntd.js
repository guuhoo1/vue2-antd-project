
import {
    Button,
    Modal,
    Message,
    Notification
} from 'ant-design-vue'


const components = {
    Button,
}


export default {
    install(Vue) {
        Object.keys(components).forEach(key => {
            Vue.use(components[key])
        })
        // 全局挂载方法
        Vue.prototype.$message = Message
        Vue.prototype.$modal = Modal
        Vue.prototype.$notify = Notification
    }
}
