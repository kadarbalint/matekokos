import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Main_page from '../views/Main_page.vue'
import AddTask from '../views/AddTask.vue'
import Task1 from '../views/Task1'
import Task2 from '../views/Task2'
import AddAdmin from '../views/AddAdmin'
import DeleteTask from '../views/DeleteTask'
import { firebase } from '@firebase/app'
import resetPass from '../views/resetPass'
import '@firebase/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/resetPass',
    name: 'resetPass',
    component: resetPass
  },
  {
    path: '/Main_page',
    name: 'Main_page',
    component: Main_page,
    meta: {requiresAuth: true}
  },
  {
    path: '/addtask',
    name: "AddTask",
    component: AddTask,
    meta: {requiresAuth: true}
  },
  {
    path: '/task1',
    name: "Task1",
    component: Task1,
    meta: {requiresAuth: true}
  },
  {
    path: '/task2',
    name: "Task2",
    component: Task2,
    meta: {requiresAuth: true}
  },
  {
    path: '/deletetask',
    name: "deletetask",
    component: DeleteTask,
    meta: {requiresAuth: true}

  },
  {
    path: '/addadmin',
    name: "addadmin",
    component: AddAdmin,
    meta: {requiresAuth: true}

  },
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=> {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
  next("/");
  } else{
    next();
  }
})

export default router
