import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isNavbarCollapsed=true;
  activeName="home";

  constructor(private router:Router) { }

  ngOnInit() {
  }

  linkClick(name:string){
    this.activeName=name;
    this.isNavbarCollapsed=true;
    this.router.navigate([name]);
  }

}
