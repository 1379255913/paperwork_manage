/*
 * @Description: 路由详情
 * @Author: 张艺耀
 * @Date: 2022-10-01 14:28:40
 * @LastEditors: 张艺耀
 * @LastEditTime: 2022-10-26 18:56:29
 */
import Home from '@/pages/Home/Home.vue'
import Login from '@/pages/Login/Login.vue'
import Personal from '@/pages/Personal/Personal.vue'
import Apply from '@/pages/Apply/Apply.vue'
import Message from '@/pages/Message/Message.vue'
import PersonalInform from '@/pages/PersonalInform/PersonalInform.vue'
import Evidence from '@/pages/Evidence/Evidence.vue'
import RecordDetail from '@/pages/RecordDetail/RecordDetail.vue'
import UserApplication from '@/pages/UserApplication/UserApplication.vue'
import ApplyProcess from '@/pages/ApplyProcess/ApplyProcess.vue'
import UserApproval from '@/pages/UserApproval/UserApproval.vue'
import ApprovalProcess from '@/pages/ApprovalProcess/ApprovalProcess.vue'
export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layouts/Tabbar.vue'),
    children: [
      {
        name: 'home',
        path: 'home',
        component: Home
      },
      {
        name: 'personal',
        path: 'personal',
        component: Personal
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/NavBar.vue'),
    children: [
      {
        name: 'apply',
        path: 'apply',
        component: Apply,
        meta: {
          title: '用证申请'
        }
      },
      {
        name: 'message',
        path: 'message',
        component: Message,
        meta: {
          title: '我的消息'
        }
      },
      {
        name: 'personal-information',
        path: 'personal-information',
        component: PersonalInform,
        meta: {
          title: '个人信息'
        }
      },
      {
        name: 'record-detail/:id',
        path: 'record-detail/:id',
        component: RecordDetail,
        meta: {
          title: '记录详情'
        }
      },
      {
        name: 'user-application',
        path: 'user-application',
        component: UserApplication,
        meta: {
          title: '我的申请'
        }
      },
      {
        name: 'apply-process/:id',
        path: 'apply-process/:id',
        component: ApplyProcess,
        meta: {
          title: '申请详情'
        }
      },
      {
        name: 'evidence-record',
        path: 'evidence-record',
        component: Evidence,
        meta: {
          title: '用证记录'
        }
      },
      {
        name: 'user-approve',
        path: 'user-approve',
        component: UserApproval,
        meta: {
          title: '我的审批'
        }
      },
      {
        name: 'approve-process/:id',
        path: 'approve-process/:id',
        component: ApprovalProcess,
        meta: {
          title: '审批详情'
        }
      }
    ]
  }
]
