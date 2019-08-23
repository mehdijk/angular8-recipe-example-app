import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path:'', component:RecipesComponent},
  {path:'home', component:RecipesComponent},
  {path:'add',component:AddRecipeComponent},
  {path:'about', component:AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
