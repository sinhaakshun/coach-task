import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoachComponent } from './coach/coach.component';

const routes: Routes = [
  {path: 'coach', component:CoachComponent},
  // {path: '',redirectTo:'coach', component: CoachComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
