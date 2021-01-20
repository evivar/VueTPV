import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Lines from '@/components/Lines'
import Invoice from '@/components/Invoice'
import Tables from '@/components/Tables'
import Products from '@/components/Products'
import Categories from '@/components/Categories'
import AddEditLine from '@/components/AddEditLine'
import AddEditTable from '@/components/AddEditTable'
import AddEditProduct from '@/components/AddEditProduct'
import AddEditCategory from '@/components/AddEditCategory'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/index',
            name: 'Home',
            component: Home
        },
        {
            path: '*',
            redirect: '/index'
        }
    ]
})