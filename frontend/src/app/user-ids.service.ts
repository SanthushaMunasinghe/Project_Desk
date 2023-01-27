import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserIdsService {
  userIds: string[] = [];

  constructor() {}

  addId(id: string) {
    this.userIds.push(id);
  }

  removeId(id: string) {
    this.userIds = this.userIds.filter((e) => e !== id);
  }

  clearIds() {
    this.userIds = [];
  }

  getIds() {
    return this.userIds;
  }
}
