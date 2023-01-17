import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate.pipe';
import { InlineLoaderComponent } from './components/inline-loader/inline-loader.component';
import { OnBoardOneComponent } from './components/drive-out/on-board-one/on-board-one.component';
import { OnBoardTwoComponent } from './components/drive-out/on-board-two/on-board-two.component';
import { OnBoardThreeComponent } from './components/drive-out/on-board-three/on-board-three.component';
import { DriveOutComponent } from './components/drive-out/drive-out.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    TruncatePipe,
    InlineLoaderComponent,
    OnBoardOneComponent,
    OnBoardTwoComponent,
    OnBoardThreeComponent,
    DriveOutComponent,
  ],
  imports: [CommonModule, RouterOutlet],
  exports: [TruncatePipe, InlineLoaderComponent],
})
export class SharedModule {}
