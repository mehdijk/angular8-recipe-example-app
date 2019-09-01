import { Injectable, Output, EventEmitter } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { of,from, observable } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { error } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  myDb:NgxIndexedDB;
  private storeName='recipe';

  @Output() recipes=new EventEmitter<any>();
  

  constructor() {
    this.myDb = new NgxIndexedDB('recipeBookDb', 1);
    this.createDb();
   }

  openDatabase():Promise<any>{
    // this.myDb.dbWrapper.validateStoreName(this.storeName)
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
        this.mockRecipes.forEach((recipe)=>this.addRecipe(recipe));
        });
  }

  deleteDb(){
    this.openDatabase().then(x=>
    this.myDb.deleteDatabase());
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
      this.myDb.add(this.storeName,recipe)
    });
  }

  getRecipeById(id:number){
    this.openDatabase().then(x=>{
      this.myDb.getByKey(this.storeName,+id).then(
        recipe=>{
          this.recipes.emit(recipe)}
      )
    });
  }

  delete(id:number){
    this.openDatabase().then(x=>{
      this.myDb.delete(this.storeName,+id);
    });
  }

  update(recipe:Recipe){
    this.openDatabase().then(x=>{
      this.myDb.update(this.storeName,recipe);
    });
  }


   

  //mocks
  private mockRecipes:Recipe[]=[
    {
    name:'Pizza Margherita',
    direction:'Preheat the wood-fired pizza oven at high temperature for 4 hours before cooking.Alternatively, a refractory stone can be used, preheated in the domestic oven. It is preferable to heat it for an hour, at 260 ° C, before baking. '+
              'Put the tomatoes in a blender and treat them until they blend together. Season with salt. Sprinkle the pizza scoop with flour. With a rolling pin, spread the dough until you get a thin circle of 10 inches. Using a spoon, put ¼ of the sauce on the dough and distribute, leaving a 1-inch edge. Cover the sauce with ¼ of mozzarella.',
    imageUrl:'http://www.fnstatic.it/images/content/recipe/ccev103-margherita-pizza-s4x3-jpg_3.jpeg',
    thumbImageUrl:'http://www.fnstatic.it/images/small/recipe/ccev103-margherita-pizza-s4x3-jpg_3.jpeg',
    cookingTime:30,
    serves:2
    },
    {
      name:'Lasagne Bolognese',
      direction:'Add the first layer of lasagna and in order, cover with ragù, about 3 ladlefuls of béchamel and a generous sprinkling of Parmesan. Repeat the same procedure until you reach the top of the pan. Make sure the lasagna is immersed in the sauce.'+
                'When you finish putting the ingredients in layers, cover the lasagna with a final ladle of ragù and a little béchamel, add a few strips of butter and finish with a sprinkling of Parmesan.',
      imageUrl:'http://www.fnstatic.it/images/content/recipe/ccev108-lasagne-alla-bolognese-s4x3-jpg_3.jpeg',
      thumbImageUrl:'http://www.fnstatic.it/images/small/recipe/ccev108-lasagne-alla-bolognese-s4x3-jpg_3.jpeg',
      cookingTime:180,
      serves:4
      },
      {
        name:'A food without image',
        direction:'This is the directions for cooking. A part of direction is shown here and the user can read the complete description in the detail page. If the image or thumbnail is not specified or unavailable, a default image will be shown.',
        imageUrl:'',
        thumbImageUrl:'a wrong address',
        cookingTime:180,
        serves:4
        },
    
  ];
}