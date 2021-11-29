import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodsPage } from './foods';


import { SearchPipe } from '../../pipes/search/search';
import { SortPipe } from '../../pipes/sort/sort';

@NgModule({
  declarations: [
    FoodsPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodsPage),
  ],
})
export class FoodsPageModule {}
