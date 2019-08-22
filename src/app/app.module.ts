import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { RecipesComponent } from './recipes/recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RecipesComponent,
    AddRecipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  //  NgxIndexedDB,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
