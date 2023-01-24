import { Component } from '@angular/core';

import { faTable } from '@fortawesome/free-solid-svg-icons';

interface Project {
  title: string;
  description: string;
  memberCount: string;
}

const DUMMY_ProjectS: Project[] = [
  {
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a.',
    memberCount: '5',
  },
  {
    title: 'Title 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a.',
    memberCount: '4',
  },
  {
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, a.',
    memberCount: '10',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  tableIcon = faTable;
  projects: Project[] = DUMMY_ProjectS;
  userEmail: string = 'santhusha@gmail.com';
}
