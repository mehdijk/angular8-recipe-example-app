import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isNavbarCollapsed=true;
  activeName="home";

  constructor(private router:Router) { 
    this.detectPath();
  }

  ngOnInit() {
  }

  //detect url changes and active proper link
  detectPath(){
    const event$=this.router.events.pipe(
      filter(event=> event instanceof NavigationEnd));
    event$.subscribe((val:NavigationEnd)=> {
      this.activeName=val.urlAfterRedirects.split('/')[1];
      if(this.activeName==='') this.activeName='home';
    });
  }

  linkClick(name:string){
    this.isNavbarCollapsed=true;
    this.router.navigate([name]);
  }

}
