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
import ManagePage from '@/components/ManagePage.vue';
import EditArticlePage from '@/components/EditArticlePage.vue';
import ArticleListPageEdit from '@/components/ArticleListPageEdit.vue';
import ExamListPageEdit from '@/components/ExamListPageEdit.vue';
import AddQuestionPage from '@/components/AddQuestionPage.vue';
import QuestionListPageEdit from '@/components/QuestionListPageEdit.vue';
import EditQuestionPage from '@/components/EditQuestionPage.vue';

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
  { path : '/article-list-edit', component: ArticleListPageEdit},
  { path : '/exam-list-edit', component: ExamListPageEdit},
  { path : '/add-question', component: AddQuestionPage},
  { path : '/question-list-edit', component: QuestionListPageEdit},
  { path : '/edit-question/:id', component: EditQuestionPage, props: true},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;