import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  apiURLContacts = environment.apiUrl + 'contacts';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiURLContacts, {});
  }

  createContact(contactData: FormData): Observable<Contact> {
    return this.http.post<Contact>(this.apiURLContacts, contactData);
  }

  getContact(contactId: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiURLContacts}/${contactId}`);
  }

  updateContact(contactData: FormData, contactId: string): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiURLContacts}/${contactId}`, contactData);
  }

  deleteContact(contactId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLContacts}/${contactId}`);
  }

  getContactsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLContacts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.contactCount));
  }
}
