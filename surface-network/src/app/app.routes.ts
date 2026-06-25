import { Routes } from '@angular/router';

import { NewsfeedComponent } from "./newsfeed-component/newsfeed-component";
import { RegisterComponent } from './register-component/register-component';
import { LoginComponent } from './login-component/login-component';

export const routes: Routes = [
    { path: '', component: NewsfeedComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
