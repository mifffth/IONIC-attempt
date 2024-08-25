// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [PickupCallCardComponent],
  imports: [CommonModule, IonicModule], // added ionic module to fix element cant used
  exports: [PickupCallCardComponent] // Export it so it can be used in other modules
})
export class SharedModule {}
