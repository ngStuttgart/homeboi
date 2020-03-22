import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { InseratComponent } from './inserat/inserat.component';
import { EditInseratComponent } from './edit-inserat/edit-inserat.component';
import { TemplateInseratComponent } from './template-inserat/template-inserat.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent
  },
  {
    path: 'inserat',
    component: InseratComponent
  },
  {
    path: 'inserat-edit/:id',
    component: EditInseratComponent
  },
  {
    path: 'inserat-template/:id',
    component: TemplateInseratComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
