export default [
    {
        path: '/admin',
        name: 'admin',
        component: () => import('@/pages/admin/Layout.vue'),
        // meta: { requiresAuth: true },
        redirect: { name: 'admin-dashboard' },
        children: [
            {
                path: 'dashboard',
                name: 'admin-dashboard',
                component: () => import('@/pages/admin/Dashboard.vue')
            },
            {
                path: 'role',
                name: 'admin-role',
                component: () => import('@/pages/admin/Role.vue'),
                redirect: { name: 'admin-users' },
                children: [
                    {
                        path: 'users',
                        name: 'admin-users',
                        component: () => import('@/pages/admin/Users.vue')
                    },
                    {
                        path: 'personnel',
                        name: 'admin-personnel',
                        component: () => import('@/pages/admin/Personnel.vue')
                    }
                ]
            },
            {
                path: 'dialog',
                name: 'admin-dialog',
                component: () => import('@/pages/admin/Dialog.vue'),
                redirect: { name: 'admin-question' },
                children: [
                    {
                        path: 'question',
                        name: 'admin-question',
                        component: () => import('@/pages/admin/Question.vue')
                    },
                    {
                        path: 'answer',
                        name: 'admin-answer',
                        component: () => import('@/pages/admin/Answer.vue')
                    }
                ]
            },
            {
                path: 'publish', // 修正了缺少的逗号
                name: 'admin-publish',
                component: () => import('@/pages/admin/Publish.vue')
            },
            {
                path: 'statistics',
                name: 'admin-statistics',
                component: () => import('@/pages/admin/Statistics.vue')
            },
            // 404 page must be placed at the end !!!
            { path: '*', redirect: '/404', hidden: true }
        ]
    }
]