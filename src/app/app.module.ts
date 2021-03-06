import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { AddPostComponent } from './user/add-post/add-post.component';
import { UserMessagesComponent } from './user/user-messages/user-messages.component';
import { AddMessageComponent } from './user/add-message/add-message.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    UserPostsComponent,
    EditProfileComponent,
    AddPostComponent,
    UserMessagesComponent,
    AddMessageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [authInterceptorProviders,
    authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
