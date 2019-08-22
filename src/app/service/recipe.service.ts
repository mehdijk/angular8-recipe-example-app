import { Injectable, Output, EventEmitter } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { Observable, of,from } from 'rxjs';
import { Recipe } from '../model/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  myDb:NgxIndexedDB;

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
      let objectStore = evt.currentTarget.result.createObjectStore('recipe',
      { keyPath: 'id', autoIncrement: true });
      objectStore.createIndex('name', 'name', { unique: false });
      objectStore.createIndex('description', 'description', { unique: false });
        }).then(
        x=>console.log("Database is created!")
        ).catch(error=>console.log('Error in creating database: ' + error));
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
      this.myDb.getAll('recipe').then(
        res=>{this.recipes.emit(res)}
      )
    })
  }

  addRecipe(){
    this.myDb.openDatabase(1).then(x=>{
      //this.myDb.add('recipe',JSON.stringify(recipe));
      this.myDb.add('recipe',{name:'mehdi',description:'tozih'});
    });
  }
}