import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorPageComponent } from './generator-page/generator-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: 'main-page',
    component: MainPageComponent
  },
  {
    path: 'generator',
    component: GeneratorPageComponent
  },
  {
    path: '**',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
