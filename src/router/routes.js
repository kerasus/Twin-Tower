import { auth } from './middleware/middleware'
// import Login from '../pages/Auth/Login.vue'
function getEntityCrudRouteObject (path, baseRouteName, componentPath, breadcrumbs) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id' },
    { mode: 'Edit', path: ':id/edit' }
  ]
  const children = []
  const removedFirstPart = componentPath.split('/')
  // console.log('removedFirstPart', removedFirstPart[0])
  AllNeededRoutes.forEach(item => {
    // Todo : find a way for 'pages/'
    children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import('pages/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
    // Even this is not working
    // children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import(removedFirstPart[0] + '/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
  })
  return {
    path: path,
    component: () => import('pages/Admin/index'),
    breadcrumbs: breadcrumbs,
    children
  }
}
const entityCrudRouteConfigs = [
  {
    path: 'users',
    baseRouteName: 'Admin.User',
    componentPath: 'pages/Admin/User',
    breadcrumbs: { title: 'مدیریت کاربران' }
  },
  {
    path: 'content',
    baseRouteName: 'Admin.Content',
    componentPath: 'pages/Admin/Content',
    breadcrumbs: { title: 'محتوا' }
  },
  {
    path: 'category',
    baseRouteName: 'Admin.Category',
    componentPath: 'pages/Admin/Category',
    breadcrumbs: { title: 'دسته' }
  },
  {
    path: 'feedback',
    baseRouteName: 'Admin.Feedback',
    componentPath: 'pages/Admin/Feedback',
    breadcrumbs: { title: 'نظر' }
  },
  {
    path: 'installment',
    baseRouteName: 'Admin.Installment',
    componentPath: 'pages/Admin/Installment',
    breadcrumbs: { title: 'اقساط' }
  }
]
const allEntityCrudRouteObjects = [
  ...entityCrudRouteConfigs.map(item => getEntityCrudRouteObject(item.path, item.baseRouteName, item.componentPath, item.breadcrumbs))
]

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
    children: [
      {
        path: '',
        name: 'UserPanel',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          { name: 'UserPanel.Home', path: '', component: () => import('pages/Index.vue') },
          { name: 'UserPanel.Content', path: 'content/:content_id', component: () => import('pages/User/Content.vue') }
        ]
      },
      {
        path: 'admin',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          { name: 'Admin.Settings', path: 'settings', component: () => import('pages/Admin/Settings'), breadcrumbs: { title: 'تنظیمات' } },
          ...allEntityCrudRouteObjects
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/Login.vue')
  },
  // are u mr Esmaeili ? '' : dont touch this route
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component:
  () => import('pages/Error404.vue')
  }
]
export default routes
