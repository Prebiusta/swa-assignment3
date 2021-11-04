import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from "@/views/Weather";
import SubmitData from "@/views/SubmitData";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Weather',
        component: Weather
    },
    {
        path: '/submit',
        name: 'Submit Data',
        component: SubmitData
    },
]

const router = new VueRouter({
    routes
})

export default router
