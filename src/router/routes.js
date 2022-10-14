import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Personal from '@/pages/Personal.vue'
import Apply from '@/pages/Apply.vue'
import Message from '@/pages/Message.vue'
import PersonalInform from '@/pages/PersonalInform.vue'
import Evidence from '@/pages/Evidence.vue'
import RecordDetail from '@/pages/RecordDetail.vue'
import UserApplication from '@/pages/UserApplication.vue'
import ApplyProcess from '@/pages/ApplyProcess.vue'
import UserApproval from '@/pages/UserApproval.vue'
import ApprovalProcess from '@/pages/ApprovalProcess.vue'
export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/apply',
    component: Apply
  },
  {
    path: '/message',
    component: Message
  },
  {
    path: '/personal-information',
    component: PersonalInform
  },
  {
    path: '/evidence-record',
    component: Evidence
  },
  {
    path: '/record-detail/:id',
    component: RecordDetail
  },
  {
    path: '/user-application',
    component: UserApplication
  },
  {
    path: '/apply-process/:id',
    component: ApplyProcess
  },
  {
    path: '/user-approve',
    component: UserApproval
  },
  {
    path: '/approve-process/:id',
    component: ApprovalProcess
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/Layout.vue'),
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
  }
]
