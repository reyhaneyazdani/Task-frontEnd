import {createRouter, createWebHistory} from 'vue-router'
import AllAddress from '../components/AllAddress.vue'
import CardPage from '../components/CardPage.vue'
import LocationMap from '../components/LocationMap.vue'
import SuccessfulMessage from '../components/SuccessfulMessage.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/addnewaddress',
            name: 'addNewAddress',
            component: CardPage},
            {
                path: '/showall',
                name: 'showall',
                component: AllAddress},
                {
                    path: '/addnewaddress/location',
                    name: 'location',
                    component: LocationMap},
                    {
                        path: '/success',
                        name: 'success',
                        component: SuccessfulMessage},
            
        ]})

export default router