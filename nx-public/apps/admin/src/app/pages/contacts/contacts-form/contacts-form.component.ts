import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact, ContactsService } from '@bluebits/contacts';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'admin-contacts-form',
  templateUrl: './contacts-form.component.html',
  styles: []
})
export class ContactsFormComponent implements OnInit, OnDestroy {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  imageDisplay: string | ArrayBuffer;
  currentContactId: string;
  countries = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private messageService: MessageService,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: [''],
      city: [''],
      country: ['']
    });
  }

  private _addContact(contactData: FormData) {
    this.contactsService
      .createContact(contactData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (contact: Contact) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Contact ${contact.name} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Contact is not created!'
          });
        }
      );
  }

  private _updateContact(contactFormData: FormData) {
    this.contactsService
      .updateContact(contactFormData, this.currentContactId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contact is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Contact is not updated!'
          });
        }
      );
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentContactId = params.id;
        this.contactsService
          .getContact(params.id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((contact) => {
            this.contactForm.name.setValue(contact.name);
            this.contactForm.phone.setValue(contact.phone);
            this.contactForm.email.setValue(contact.email);
            this.contactForm.phone.setValue(contact.phone);
            this.contactForm.city.setValue(contact.city);
            this.contactForm.country.setValue(contact.country);
            this.imageDisplay = contact.image;
            this.contactForm.image.setValidators([]);
            this.contactForm.image.updateValueAndValidity();
          });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const contactFormData = new FormData();
    Object.keys(this.contactForm).map((key) => {
      contactFormData.append(key, this.contactForm[key].value);
    });
    if (this.editmode) {
      this._updateContact(contactFormData);
    } else {
      this._addContact(contactFormData);
    }
  }
  onCancel() {
    this.location.back();
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get contactForm() {
    return this.form.controls;
  }
}
