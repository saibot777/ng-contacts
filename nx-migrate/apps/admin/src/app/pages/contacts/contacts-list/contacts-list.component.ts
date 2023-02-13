import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '@bluebits/contacts';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-contacts-list',
  templateUrl: './contacts-list.component.html',
  styles: []
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getContacts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getContacts() {
    this.contactsService
      .getContacts()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((contacts) => {
        this.contacts = contacts;
      });
  }

  updateContact(contactid: string) {
    this.router.navigateByUrl(`contacts/form/${contactid}`);
  }

  deleteContact(contactId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Contact?',
      header: 'Delete Contact',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.contactsService
          .deleteContact(contactId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this._getContacts();
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Contact is deleted!'
              });
            },
            () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Contact is not deleted!'
              });
            }
          );
      }
    });
  }
}
