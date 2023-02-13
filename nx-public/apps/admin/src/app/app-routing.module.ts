import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@bluebits/users';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactsFormComponent } from './pages/contacts/contacts-form/contacts-form.component';
import { ContactsListComponent } from './pages/contacts/contacts-list/contacts-list.component';
import { ShellComponent } from './shared/shell/shell.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'contacts',
        component: ContactsListComponent
      },
      {
        path: 'contacts/form',
        component: ContactsFormComponent
      },
      {
        path: 'contacts/form/:id',
        component: ContactsFormComponent
      },
      {
        path: 'users',
        component: UsersListComponent
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:id',
        component: UsersFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
  declarations: [],
  providers: []
})
export class AppRoutingModule {}
