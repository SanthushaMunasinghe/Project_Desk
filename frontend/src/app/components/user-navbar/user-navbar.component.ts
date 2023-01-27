import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent {
  userIcon = faCircleUser;
  tableIcon = faTable;

  @Input() headingTxt: string = '';

  @Input() emailTxt: string = '';

  @Input() linkTxt: string = '';

  @Input() id: string = '';

  @Input() isSave: boolean = false;

  @Input() btnTxt: string = '';

  @Input() submitObject: object = {};

  errorTxt: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onClick() {
    if (this.isSave) {
      if (Object.keys(this.submitObject).length === 0) {
        this.errorTxt = 'Fill all fields!';
      } else {
        this.http.post('/api/projects', this.submitObject).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );

        console.log(this.submitObject);
      }
      // this.router.navigate([this.linkTxt, this.id]);
    } else {
      this.router.navigate([this.linkTxt, this.id]);
    }
  }
}
