import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'contacts-product-item',
  templateUrl: './contact-item.component.html',
  styles: []
})
export class ContactItemComponent implements OnInit {
  @Input() product: Contact;

  constructor() {}

  ngOnInit(): void {}
}
