import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsSearchComponent } from './components/contacts-search/contacts-search.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { FormsModule } from '@angular/forms';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@bluebits/ui';

const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsListComponent
  },
  {
    path: 'contacts/:contactid',
    component: ContactPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    InputNumberModule,
    UiModule
  ],
  declarations: [
    ContactsSearchComponent,
    ContactItemComponent,
    ContactsListComponent,
    ContactPageComponent
  ],
  exports: [
    ContactsSearchComponent,
    ContactItemComponent,
    ContactsListComponent,
    ContactPageComponent
  ]
})
export class ContactsModule {}
