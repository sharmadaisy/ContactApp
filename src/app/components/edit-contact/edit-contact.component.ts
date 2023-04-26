import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Group } from 'src/app/models/group';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  loading: boolean = false
  contact:Contact = {} as Contact
  errorMessage:string | null = null
  contactId: string | null = null
  groups:Group[] = [] as Group[]

  constructor(private activatedRoute: ActivatedRoute, private contactSvc: ContactService, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.contactId = params.get('contactId')
    })
    if(this.contactId){
      this.contactSvc.getContact(this.contactId).subscribe((data: Contact) => {
        this.contact = data
        this.loading = false
        this.contactSvc.getAllGroups().subscribe((data:Group[]) => {
          this.groups = data
        }, (error) => {
          this.errorMessage = error
        })
      }, (error) => {
        this.errorMessage = error
        this.loading = false
      })
    }
  }

  updateContact(){
    if(this.contactId){
      this.loading = true
    this.contactSvc.updateContact(this.contact, this.contactId).subscribe((data:Contact) => {
      this.router.navigate(['/']).then()
      this.loading = false
    }, (error) => {
      this.errorMessage = error;
      this.router.navigate([`/contact/edit/${this.contactId}`]).then()
      this.loading = false
    })
  }
    }

}
