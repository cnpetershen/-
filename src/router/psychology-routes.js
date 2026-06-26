export default [{
    path: 'psychology',
        name: 'psychology',
    component: () => import('@/pages/Psychology/Psychology.vue'),
    redirect: {name: 'article'},
    children: [
        {
            path: 'article',
            name: 'article',
            component: () => import('@/pages/Psychology/Article.vue'),
        },
        {
            path: 'article/:id',
            name: 'article-detail',
            component: () => import('@/pages/Psychology/ArticleDetail.vue')
        },
        {
            path: 'marriage',
            name: 'marriage',
            component: () => import('@/pages/Psychology/Marriage.vue'),
        },
        {
            path: 'family',
            name: 'family',
            component: () => import('@/pages/Psychology/Family.vue'),
        },
        {
            path: 'social',
            name: 'social',
            component: () => import('../pages/Psychology/Social.vue'),
        },
        {
            path: 'self-awareness',
            name: 'self-awareness',
            component: () => import('../pages/Psychology/SelfAwareness.vue'),

        }

    ]

}]