import { Component, OnInit } from '@angular/core';
import { RecipeService } from "../service/recipe.service";
import { Recipe } from '../model/recipe.model';
import {Pipe, PipeTransform} from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  recipes:Recipe[];

  constructor(private service:RecipeService) {
   
   }

  ngOnInit() {
    this.service.getAll();
    this.service.recipes.subscribe(res=>this.recipes=res);
  }

  imageNotFound(event){
    console.debug(event);
   event.target.src = "assets/img/no-image-thumb.png";

  }
}
