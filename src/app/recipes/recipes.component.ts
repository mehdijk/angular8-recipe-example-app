import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../service/recipe.service";
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipes:Recipe[];

  constructor(private service:RecipeService) {
   
   }

  ngOnInit() {
    this.service.getAll();
    this.service.recipes.subscribe(res=>this.recipes=res);
  }

}
