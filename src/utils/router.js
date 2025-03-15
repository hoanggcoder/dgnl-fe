import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ArticleListView from '@/views/ArticleListView.vue';
import CreateQuestionView from '@/views/CreateQuestionView.vue';
import ExamListView from '@/views/ExamListView.vue';
import ArticlePage from '@/components/ArticlePage.vue';
import TestPage from '@/components/TestPage.vue';
import ExamPage from '@/components/ExamPage.vue';
import UserInfoView from '@/views/UserInfoView.vue';
import AddArticleView from '@/views/AddArticleView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/login', component: LoginView},
  { path: '/register', component: RegisterView},
  { path: '/article-list', component: ArticleListView},
  { path: '/create-question', component: CreateQuestionView},
  { path: '/exam-list', component: ExamListView},
  { path: '/exam/:id', component: ExamPage, props: true },
  { path: '/article/:id', component: ArticlePage, props: true },
  { path: '/test/:id', component: TestPage, props: true },
  { path: '/user-info/:username', component: UserInfoView, props: true},
  { path: '/add-article', component: AddArticleView, props: true}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;