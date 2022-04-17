import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthDefenderService} from "./helper/auth-defender.service";
import {IndexComponent} from "./layout/index/index.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {UserPostsComponent} from "./user/user-posts/user-posts.component";
import {UserMessagesComponent} from "./user/user-messages/user-messages.component";
import {AddPostComponent} from "./user/add-post/add-post.component";
import {AddMessageComponent} from "./user/add-message/add-message.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'index', component: IndexComponent, canActivate: [AuthDefenderService]},
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthDefenderService],
    children: [
      {path: '', component: UserPostsComponent, canActivate: [AuthDefenderService]},
      {path: 'm', component: UserMessagesComponent, canActivate: [AuthDefenderService]},
      {path: 'add-post', component: AddPostComponent, canActivate: [AuthDefenderService]},
      {path: 'add-message', component: AddMessageComponent, canActivate: [AuthDefenderService]}
    ]
  },
  {path: '', redirectTo: '/index', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
