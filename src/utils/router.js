import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ArticleListView from '@/views/ArticleListView.vue';
import CreateQuestionView from '@/views/CreateQuestionView.vue';
import ExamListView from '@/views/ExamListView.vue';
import ArticlePage from '@/components/articlesPages/ArticlePage.vue';
import TestPage from '@/components/testPages/TestPage.vue';
import ExamPage from '@/components/testPages/ExamPage.vue';
import UserInfoView from '@/views/UserInfoView.vue';
import AddArticleView from '@/views/AddArticleView.vue';
import EditArticlePage from '@/components/articlesPages/EditArticlePage.vue';
import AddQuestionPage from '@/components/questionPages/AddQuestionPage.vue';
import EditQuestionPage from '@/components/questionPages/EditQuestionPage.vue';
import CreateTestPage from '@/components/testPages/CreateTestPage.vue';
import RegisterAdminPage from '@/components/userInfoPages/RegisterAdminPage.vue';
import ManagePage from '@/components/ManagePage.vue';
import UserScorePage from '@/components/userInfoPages/UserScorePage.vue';
import AboutExamPage from '@/components/aboutPages/AboutExamPage.vue';
import AboutSchedulePage from '@/components/aboutPages/AboutSchedulePage.vue';
import AboutLocationPage from '@/components/aboutPages/AboutLocationPage.vue';
import AboutUniversityPage from '@/components/aboutPages/AboutUniversityPage.vue';
import EditGamePage from '@/components/minigames/EditGamePage.vue';

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
  { path: '/add-article', component: AddArticleView, props: true},
  { path: '/manage', component: ManagePage, props: true},
  { path: '/edit-article/:id', component: EditArticlePage, props: true},
  { path : '/add-question', component: AddQuestionPage},
  { path : '/edit-question/:id', component: EditQuestionPage, props: true},
  { path : '/add-exam', component: CreateTestPage},
  { path : '/add-admin', component: RegisterAdminPage},
  { path : '/manage', component: ManagePage},
  { path : '/user-score/:username', component: UserScorePage, props: true},
  { path : '/about-exam', component: AboutExamPage},
  { path : '/about-schedule', component: AboutSchedulePage},
  { path : '/about-location', component: AboutLocationPage},
  { path : '/about-university', component: AboutUniversityPage},
  { path : '/edit-minigame', component: EditGamePage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;