import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { DatasAnimesComponent } from './datas-animes/datas-animes.component';
import { SearchanimeComponent } from './searchanime/searchanime.component';

const routes: Routes = [
  { path: 'ListadoAnimes/page/:id', component: DatasAnimesComponent },
  { path: 'detail/:id', component: AnimeDetailsComponent },
  { path: 'Busqueda', component: SearchanimeComponent },
  { path: '#',redirectTo: '/ListadoAnimes/page/1', pathMatch:'full' },
  { path: '', redirectTo: '/ListadoAnimes/page/1', pathMatch:'full'},
  { path: '**', redirectTo: '/ListadoAnimes/page/:id', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
