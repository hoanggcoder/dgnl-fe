import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ArticleListView from '@/views/ArticleListView.vue';
import CreateQuestionView from '@/views/CreateQuestionView.vue';
import TestListView from '@/views/TestListView.vue';
import ArticlePage from '@/components/ArticlePage.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView},
  { path: '/register', component: RegisterView},
  { path: '/article-list', component: ArticleListView},
  { path: '/create-question', component: CreateQuestionView},
  { path: '/test-list', component: TestListView},
  { path: '/article/:id', component: ArticlePage, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;