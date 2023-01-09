import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorPageComponent } from './generator-page/generator-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { environment } from '../environments/environment';

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
    path: 'payments',
    component: PaymentsPageComponent
  },
  {
    path: '**',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
];

@NgModule({
  providers: [
    { provide: 'environment', useValue: environment }
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
