import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
// import Editor from "@/components/Editor"
// components: {
//   Editor
// }
/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // 富文本单个插件
  // {
  //   path: '/tinymce',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'tinymce',
  //       component: () => import('@/views/tinymce/index'),
  //       meta: { title: '富文本', icon: 'wx' }
  //     }
  //   ]
  // },
  {
    path: '/dataanalyze',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dataanalyze',
        component: () => import('@/views/dataanalyze/index'),
        meta: { title: '数据分析', icon: 'wx' }
      }
    ]
  },
  {
    path: '/appmanage',
    component: Layout,
    redirect: '/appmanage/bingapp',
    name: 'appmanage',
    meta: { title: '小程序管理', icon: 'wx' },
    children: [
      {
        path: '/appmanage/bingapp',
        component: () => import('@/views/appmanage/bingapp/index'),
        name: 'bingapp',
        meta: { title: '绑定小程序' }
      },
      {
        path: '/appmanage/updatapp',
        component: () => import('@/views/appmanage/updatapp/index'),
        name: 'updatapp',
        meta: { title: '更新小程序' }
      }
    ]
  },
  {
    path: '/basicseeting',
    component: Layout,
    redirect: '/basicseeting/globalseeting',
    name: 'basicseeting',
    meta: { title: '基础管理', icon: 'setup' },
    children: [
      {
        path: '/basicseeting/globalseeting',
        component: () => import('@/views/basicseeting/globalseeting/index'),
        name: 'all',
        meta: { title: '全局设置' }
      },
      {
        path: '/basicseeting/vipseeting',
        component: () => import('@/views/basicseeting/vipseeting/index'),
        name: 'vipseeting',
        meta: { title: '会员卡设置' }
      }
    ]
  },
  {
    path: '/aboutgroup',
    component: Layout,
    redirect: '/aboutgroup/groupintro',
    name: 'aboutgroup',
    meta: { title: '关于我们', icon: 'about' },
    children: [
      {
        path: '/aboutgroup/groupintro',
        component: () => import('@/views/aboutgroup/groupintro/index'),
        name: 'groupintro',
        meta: { title: '公司简介' }
      },
      {
        path: '/aboutgroup/wechatpay',
        component: () => import('@/views/aboutgroup/wechatpay/index'),
        name: 'wechatpay',
        meta: { title: '微信支付设置' }
      }
    ]
  },
  {
    path: '/rootmanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'rootmanage',
        component: () => import('@/views/rootmanage/index'),
        meta: { title: '权限管理', icon: 'permissions' }
      }
    ]
  },
  {
    path: '/goodsmanage',
    component: Layout,
    redirect: '/goodsmanage/exportgoodsmanage',
    name: 'goodsmanage',
    meta: { title: '商品管理', icon: 'goods' },
    children: [
      {
        path: '/goodsmanage/goodsclass',
        component: () => import('@/views/goodsmanage/goodsclass/index'),
        name: 'goodsclass',
        meta: { title: '商品分类' }
      },
      {
        path: '/goodsmanage/exportgoods',
        component: () => import('@/views/goodsmanage/exportgoods/index'),
        name: 'exportgoods',
        meta: { title: '发布商品' }
      }, {
        path: '/goodsmanage/exportgoods/spec',
        component: () => import('@/views/goodsmanage/exportgoods/spec'),
        name: 'spec',
        meta: { title: '发布商品' },
        hidden: true
      },
      {
        path: '/goodsmanage/goodslist',
        component: () => import('@/views/goodsmanage/goodslist/index'),
        name: 'goodslist',
        meta: { title: '商品列表' }
      }
//    {
//      path: '/goodsmanage/goodshow',
//      component: () => import('@/views/goodsmanage/goodshow/index'),
//      name: 'goodshow',
//      meta: { title: '商品展示区域' }
//    }
    ]
  },
  {
    path: '/ordermanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ordermanage',
        component: () => import('@/views/ordermanage/index'),
        meta: { title: '订单管理', icon: 'order' }
      }
    ]
  },
  {
    path: '/sellcollect',
    component: Layout,
    redirect: '/sellcollect/fetcollect',
    name: 'sellcollect',
    meta: { title: '销售汇总', icon: 'market' },
    children: [
      {
        path: '/sellcollect/fetcollect',
        component: () => import('@/views/sellcollect/fetcollect/index'),
        name: 'fetcollect',
        meta: { title: '取货点汇总' }
      },
      {
        path: '/sellcollect/sellgdscoll',
        component: () => import('@/views/sellcollect/sellgdscoll/index'),
        name: 'sellgdscoll',
        meta: { title: '商品销售汇总' }
      }
    ]
  },
  {
    path: '/collectmanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'collectmanage',
        component: () => import('@/views/collectmanage/index'),
        meta: { title: '物流管理', icon: 'logistics' }
      }
    ]
  },
  {
    path: '/colonelmanage',
    component: Layout,
    redirect: '/colonelmanage/colonelist',
    name: 'colonelmanage',
    meta: { title: '团长管理', icon: 'regCom' },
    children: [
      {
        path: '/colonelmanage/colonelist',
        component: () => import('@/views/colonelmanage/colonelist/index'),
        name: 'colonelist',
        meta: { title: '团长列表' }
      },
      {
        path: '/colonelmanage/moneymanage',
        component: () => import('@/views/colonelmanage/moneymanage/index'),
        name: 'moneymanage',
        meta: { title: '资金管理' }
      }
    ]
  },
  {
    path: '/colonelmanageteam',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'colonelmanageteam',
        component: () => import('@/views/colonelmanageteam/index'),
        meta: { title: '团长团队管理', icon: 'team' }
      }
    ]
  },
  {
    path: '/valuevardvip/valueviplist',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'valueviplist',
        component: () => import('@/views/valuevardvip/valueviplist/index'),
        meta: { title: '储值会员管理', icon: 'storedValue' }
      }
    ]
  },
  {
    path: '/markemanage',
    component: Layout,
    redirect: '/markemanage/promotionvip',
    name: 'markemanage',
    meta: { title: '营销管理', icon: 'marketing' },
    children: [
      {
        path: '/markemanage/promotionvip',
        component: () => import('@/views/markemanage/promotionvip/index'),
        name: 'promotionvip',
        meta: { title: '优惠券管理' }
      },
      {
        path: '/markemanage/runingmanage',
        component: () => import('@/views/markemanage/runingmanage/index'),
        name: 'runingmanage',
        meta: { title: '运动积分管理' }
      }
    ]
  },
  {
    path: '/suppliermanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'suppliermanage',
        component: () => import('@/views/suppliermanage/index'),
        meta: { title: '供应商信息', icon: 'supply' }
      }
    ]
  },
  {
    path: '/usermanage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'usermanage',
        component: () => import('@/views/usermanage/index'),
        meta: { title: '用户管理', icon: 'users' }
      }
    ]
  },
  {
    path: '/advermanage',
    component: Layout,
    redirect: '/advermanage/userdefined',
    name: 'advermanage',
    meta: { title: '广告管理', icon: 'advertising' },
    children: [
      {
        path: '/advermanage/userdefined',
        component: () => import('@/views/advermanage/userdefined/index'),
        name: 'userdefined',
        meta: { title: '自定义广告' }
      },
      {
        path: '/advermanage/slidermanage',
        component: () => import('@/views/advermanage/slidermanage/index'),
        name: 'slidermanage',
        meta: { title: '轮播图列表' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
