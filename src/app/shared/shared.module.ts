import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { InlineLoaderComponent } from './components/inline-loader/inline-loader.component';
import { DriveOutComponent } from './components/drive-out/drive-out.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BillingComponent } from './components/billing/billing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    TruncatePipe,
    InlineLoaderComponent,
    DriveOutComponent,
    BillingComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [TruncatePipe, InlineLoaderComponent],
})
export class SharedModule {}
