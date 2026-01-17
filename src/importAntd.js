
import {
    Button,
    Form,
    Input,
    Checkbox,
    Icon,
    Modal,
    Message,
    Notification,
    Layout,
    Menu,
    Row,
    Col,
    Card,
    Table,
    Breadcrumb,
    Dropdown,
    Avatar,
    Divider,
    Statistic
} from 'ant-design-vue'


const components = {
    Button,
    Form,
    Input,
    Checkbox,
    Icon,
    Layout,
    Menu,
    Row,
    Col,
    Card,
    Table,
    Breadcrumb,
    Dropdown,
    Avatar,
    Divider,
    Statistic,
    Modal
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
