import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../models/contact';
import { catchError, throwError, Observable } from 'rxjs';
import { Group } from '../models/group';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl: string = 'http://localhost:4000';
  constructor( private http:HttpClient) { }

  // get contact 
  public getAllContacts(): Observable<Contact[]> {
    let dataUrl: string = `${this.baseUrl}/contact`;
    return this.http.get<Contact[]>(dataUrl).pipe(catchError(this.handleError))
  }

  // get single contact
  public getContact(contactId: string): Observable<Contact>{
    let dataUrl: string = `${this.baseUrl}/contact/${contactId}`;
    return this.http.get<Contact>(dataUrl).pipe(catchError(this.handleError))
  }

  // create contact
  public createContact(contact: Contact): Observable<Contact>{
    let dataUrl: string = `${this.baseUrl}/contact`;
    return this.http.post<Contact>(dataUrl, contact).pipe(catchError(this.handleError))
  }

  // update contact 
  public updateContact(contact: Contact, contactId: string): Observable<Contact>{
    let dataUrl: string = `${this.baseUrl}/contact/${contactId}`;
    return this.http.put<Contact>(dataUrl, contact).pipe(catchError(this.handleError))
  }

  // delete contact 
  public deleteContact(contactId: string): Observable<Contact>{
    let dataUrl: string = `${this.baseUrl}/contact/${contactId}`;
    return this.http.delete<Contact>(dataUrl).pipe(catchError(this.handleError))
  }

   // get gropus 
   public getAllGroups(): Observable<Group[]> {
    let dataUrl: string = `${this.baseUrl}/groups`;
    return this.http.get<Group[]>(dataUrl).pipe(catchError(this.handleError))
  }

  // get single group
  public getGroup(contact: Contact): Observable<Group>{
    let dataUrl: string = `${this.baseUrl}/groups/${contact.groupId}`;
    return this.http.get<Group>(dataUrl).pipe(catchError(this.handleError))
  }


  // handle errors
  public handleError(error: HttpErrorResponse){
    let errorMessage: string = ''
    if(error.error instanceof ErrorEvent){
      //client error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // server side error
      errorMessage = `Status: ${error.status} \n Message: ${error.error.message}`
    }
    return throwError(errorMessage)
  }
  
}
