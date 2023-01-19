import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { InlineLoaderComponent } from './components/inline-loader/inline-loader.component';
import { DriveOutComponent } from './components/drive-out/drive-out.component';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BillingComponent } from './components/billing/billing.component';

@NgModule({
  declarations: [
    TruncatePipe,
    InlineLoaderComponent,
    DriveOutComponent,
    BillingComponent,
  ],
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  exports: [TruncatePipe, InlineLoaderComponent],
})
export class SharedModule {}
