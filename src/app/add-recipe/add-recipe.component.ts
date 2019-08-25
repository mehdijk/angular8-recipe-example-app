import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl,Validators } from '@angular/forms';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  isSubmitted=false;
  toastMessage;
  editId=this.route.snapshot.params.id;

  recipeForm = new FormGroup({
    name :new FormControl('',[Validators.required,Validators.maxLength(80)]),
    direction : new FormControl('',Validators.maxLength(2000)),
    imageUrl : new FormControl(''),
    thumbImageUrl : new FormControl(''),
    cookingTime : new FormControl('',[Validators.min(1),Validators.max(600)]),
    serves : new FormControl(''),
  });

  get name() { return this.recipeForm.get('name'); }
  get direction() { return this.recipeForm.get('direction'); }
  get cookingTime() { return this.recipeForm.get('cookingTime'); }


  constructor(private service:RecipeService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.loadEditRecipe();
  }

  loadEditRecipe(){
    if (!this.editId) return;
    this.service.getRecipeById(this.editId);
    this.service.recipes.subscribe(recipe=>{
      this.recipeForm.controls["name"].setValue(recipe.name);
      this.recipeForm.controls["direction"].setValue(recipe.direction);
      this.recipeForm.controls["imageUrl"].setValue(recipe.imageUrl);
      this.recipeForm.controls["thumbImageUrl"].setValue(recipe.thumbImageUrl);
      this.recipeForm.controls["cookingTime"].setValue(recipe.cookingTime);
      this.recipeForm.controls["serves"].setValue(recipe.serves);
    });
  }

  onSubmit() {
    this.isSubmitted=true;
    if (this.recipeForm.invalid) {
      return;
    }
    const recipe=new Recipe();
    Object.assign(recipe,this.recipeForm.value);
    if (this.editId) {
      recipe.id=+this.editId;
      this.service.update(recipe);
      this.toastMessage="The recipe is edited successfully!";
    } else {
      this.service.addRecipe(recipe);
      this.toastMessage="A recipe is added!";
    }
      setTimeout(() => {
      this.router.navigate(['/home']);
      }, 1000);
  }

  cancel(){
    this.router.navigate(['/home']);
  }

}
