import {
    Button,
    Form,
    FormModel,
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
    Statistic,
    Tooltip,
    Tag,
    Switch,
    Select,
    Radio,
    Tabs,
    Progress,
    Spin,
    Pagination,
    Drawer,
} from 'ant-design-vue'

const components = {
    Button,
    Form,
    FormModel,
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
    Tooltip,
    Tag,
    Switch,
    Select,
    Radio,
    Tabs,
    Progress,
    Spin,
    Pagination,
    Drawer,
    Modal,
}

export default {
    install(Vue) {
        Object.keys(components).forEach(key => {
            Vue.use(components[key])
        })
        Vue.prototype.$message = Message
        Vue.prototype.$modal = Modal
        Vue.prototype.$notify = Notification
    }
}
