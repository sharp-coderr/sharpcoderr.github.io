import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './play/play.component';
import { authorizationGuard } from './shared/guards/authorization.guard';

const routes:Routes =[
  {path: '' ,component:HomeComponent},
  {path: 'not-found' , component:NotFoundComponent},
  {path:'play',component:PlayComponent,canActivate:[authorizationGuard]},
  { path:'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule) },
  {path:'chat',loadChildren:()=>import('./chat/chat.module').then(module=>module.ChatModule)},
  {path: '**',component:NotFoundComponent,pathMatch: 'full'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
