import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserEmailsService {
  userEmails: string[] = [];

  constructor() {}

  addEmail(email: string) {
    this.userEmails.push(email);
  }

  removeEmail(email: string) {
    this.userEmails = this.userEmails.filter((e) => e !== email);
  }

  clearEmails() {
    this.userEmails = [];
  }

  getEmails() {
    return this.userEmails;
  }

  getLength() {
    return this.userEmails.length;
  }
}
