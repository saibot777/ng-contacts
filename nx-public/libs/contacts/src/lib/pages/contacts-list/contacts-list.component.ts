import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styles: []
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this._getGontacts();
  }

  private _getGontacts() {
    this.contactsService.getContacts().subscribe((resContacts) => {
      this.contacts = resContacts;
    });
  }
}
