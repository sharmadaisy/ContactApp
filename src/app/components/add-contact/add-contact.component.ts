import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Group } from 'src/app/models/group';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  loading: boolean = false
  contact:Contact = {} as Contact
  errorMessage:string|null = null
  groups:Group[] = [] as Group[]

  constructor(private contactSvc: ContactService, private router:Router) { }

  ngOnInit(): void {
    this.contactSvc.getAllGroups().subscribe((data:Group[]) => {
      this.groups = data
    }, (error) => {
      this.errorMessage = error
    })
  }

  addContact(){
    this.loading = true
    this.contactSvc.createContact(this.contact).subscribe((data:Contact) => {
      this.router.navigate(['/']).then()
      this.loading = false
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate(['/contact/add']).then()
      this.loading = false
    })
  }

}
