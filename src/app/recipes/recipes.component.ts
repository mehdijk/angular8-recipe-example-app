import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../service/recipe.service";
import { Recipe } from '../model/recipe.model';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  recipes:Recipe[];
  private numberOfTry=0;

  constructor(private service:RecipeService,
              private router:Router,
              private modalService: NgbModal) {
   }

  ngOnInit() {
   this.getRecipes()
  }
  getRecipes(){
    this.numberOfTry++;
    this.service.getAll();
    this.service.recipes.subscribe(res=>{
      this.recipes=res;
      if (this.recipes.length==0 && this.numberOfTry<5) {
        setTimeout(() => {
          this.getRecipes();
        }, 1000);
      }},
      );
  }

  imageNotFound(event){
   event.target.src = "assets/img/no-image-thumb.png";
  }

  edit(id:number){
    this.router.navigate(['/edit/'+id]);
  }
  
  delete(content,deleteId:number){
    this.modalService.open(content).result.then(
      x=> {
          if (x==='yes') {
          this.service.delete(deleteId);
          this.recipes=this.recipes.filter(recipe=>recipe.id !== deleteId);
          }  
        }
    )
    
  }
}
