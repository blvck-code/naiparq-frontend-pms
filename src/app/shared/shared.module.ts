import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { InlineLoaderComponent } from './components/inline-loader/inline-loader.component';

@NgModule({
  declarations: [TruncatePipe, InlineLoaderComponent],
  imports: [CommonModule],
  exports: [TruncatePipe, InlineLoaderComponent],
})
export class SharedModule {}
