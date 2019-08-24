import { Injectable, Output, EventEmitter } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { Observable, of,from } from 'rxjs';
import { Recipe } from '../model/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  myDb:NgxIndexedDB;
  private storeName='recipe';

  @Output() recipes=new EventEmitter<Recipe[]>();
  

  constructor() {
    this.myDb = new NgxIndexedDB('recipeBookDb', 1);
    this.createDb();
   }

  openDatabase():Promise<any>{
    return this.myDb.openDatabase(1);
  }

  createDb(){
    this.myDb.openDatabase(1, evt => {
      let objectStore = evt.currentTarget.result.createObjectStore(this.storeName,
      { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: true });
      objectStore.createIndex('direction', 'direction', { unique: false });
      objectStore.createIndex('imageUrl', 'imageUrl', { unique: false });
      objectStore.createIndex('thumbImageUrl', 'thumbImageUrl', { unique: false });
      objectStore.createIndex('cookingTime', 'cookingTime', { unique: false });
      objectStore.createIndex('serves', 'serves', { unique: false });
        }).then(
        x=>console.log("Database is created!")
        ).catch(error=>console.warn('Error in creating database: ' + error));
  }

  deleteDb(){
    this.openDatabase().then(x=>
    this.myDb.deleteDatabase().then(
      () => {
          console.log('Database deleted successfully');
      },
      error => {
          console.log(error);
      }
  ));
  }

  getAll(){
    this.myDb.openDatabase(1).then(x=>{
      this.myDb.getAll(this.storeName).then(
        res=>{this.recipes.emit(res)}
      )
    })
  }

  addRecipe(recipe:Recipe){
    this.myDb.openDatabase(1).then(x=>{
      this.myDb.add(this.storeName,recipe);
    });
  }

  getRecipeById(id:number){
    this.openDatabase().then(x=>{
      this.myDb.getByKey(this.storeName,+id).then(
        res=>{this.recipes.emit(res)}
      )
    });
  }
}