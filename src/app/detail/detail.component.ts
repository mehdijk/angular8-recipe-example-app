import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  recipe:Recipe
  constructor(private service:RecipeService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    const id:number=this.route.snapshot.params.id;
    this.service.getRecipeById(id);
    this.service.recipes.subscribe(res=>{
      this.recipe=res;
    })
  }

  imageNotFound(event){
    event.target.src="assets/img/no-image.png"
  }

  back(){
    this.router.navigate(['home']);
  }

}
