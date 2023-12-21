import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { RoutesRoutingModule } from './routes-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShareModule } from '../share/share.module';
import { EntryComponent } from './components/entry/entry.component';
import { GoalEntryComponent } from './components/goal/goal-entry.component';
import { StoreService } from './services/store.service';
import { ChartComponent } from './components/chart/chart.component';
import { StatusComponent } from './components/status/status.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EntryComponent,
    GoalEntryComponent,
    ChartComponent,
    StatusComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    ShareModule,
  ],
  providers: [],
})
export class RoutesModule {
  constructor(private storeService: StoreService) {
    this.storeService.load();
  }
}
