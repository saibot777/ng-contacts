import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'contacts-contact-page',
  templateUrl: './contact-page.component.html',
  styles: []
})
export class ContactPageComponent implements OnInit, OnDestroy {
  contact: Contact;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(private contactsService: ContactsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.contactid) {
        this._getContact(params.contactid);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getContact(id: string) {
    this.contactsService
      .getContact(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resContact) => {
        this.contact = resContact;
      });
  }
}
