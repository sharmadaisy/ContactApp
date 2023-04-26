import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  loading: boolean = false
  contacts:Contact[] = []
  errorMessage:string | null = null
  constructor(private contactSvc: ContactService) { }

  ngOnInit(): void {
    this.getAllContacts()
  }

  getAllContacts(){
    this.loading = true
    this.contactSvc.getAllContacts().subscribe((data:Contact[]) => {
      this.contacts = data
      this.loading = false
    }, (error) => {
      this.errorMessage = error
      this.loading = false
    })
  }

  deleteContact(contactId: any){
    this.loading = true
    if(contactId){
      this.contactSvc.deleteContact(contactId).subscribe((data) => {
        this.getAllContacts()
      }, error => {
        this.errorMessage = error
        this.loading = false
      })
    }
  }

}
