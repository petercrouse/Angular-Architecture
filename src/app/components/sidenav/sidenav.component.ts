import { slideInAnimation } from '@_shared/animations';
import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [slideInAnimation]
})
export class SidenavComponent {

  cpnumber: string;
  role: string;

  constructor() { }
}
