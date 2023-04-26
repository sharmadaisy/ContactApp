import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { Group } from 'src/app/models/group';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId:string |null = null
  loading:boolean = false
  contact:Contact = {} as Contact
  errorMessage:string|null = null
  group:Group = {} as Group

  constructor(private activatedRoute: ActivatedRoute,
    private contactSvc: ContactService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId')
    })
    if(this.contactId){
      this.loading = true
      this.contactSvc.getContact(this.contactId).subscribe((data:Contact) => {
        this.contact = data
        this.loading = false
        this.contactSvc.getGroup(data).subscribe((data:Group) => {
          this.group = data
        })
      }, (error) => {
        this.errorMessage = error.message
        this.loading = false
      })
    }
    console.log(this.contact)
  }

  isEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0
  }

}
