export default [{
    path: 'choice',
        name: 'choice',
    component: () => import('@/pages/choice/index.vue'),
    redirect: {name: 'index'},
    children: [
        {
            path: 'index',
            name: 'index',
            component: () => import('@/pages/choice/Choice.vue'),
            default: true,
        },
        {
            path: 'detail/:doctorId',
            name: 'detail',
            component: () => import('@/pages/choice/ChoiceDetail.vue'),
        },
    {
        path: 'doctor/doctorId',
        name: 'doctor',
        component: () => import('../pages/Contact.vue'),
    }


    ]
}]