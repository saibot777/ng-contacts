import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@bluebits/users';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
// import { UsersFormComponent } from './pages/users/users-form/users-form.component';
// import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { ShellComponent } from './shared/shell/shell.component';

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
      // {
      //   path: 'categories',
      //   component: CategoriesListComponent
      // },
      // {
      //   path: 'categories/form',
      //   component: CategoriesFormComponent
      // },
      // {
      //   path: 'categories/form/:id',
      //   component: CategoriesFormComponent
      // },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/form',
        component: ProductsFormComponent
      },
      {
        path: 'products/form/:id',
        component: ProductsFormComponent
      }
      // {
      //   path: 'users',
      //   component: UsersListComponent
      // },
      // {
      //   path: 'users/form',
      //   component: UsersFormComponent
      // },
      // {
      //   path: 'users/form/:id',
      //   component: UsersFormComponent
      // },
      // {
      //   path: 'orders',
      //   component: OrdersListComponent
      // },
      // {
      //   path: 'orders/:id',
      //   component: OrdersDetailComponent
      // }
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
