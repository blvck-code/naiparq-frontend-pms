import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { SpaceModel } from '../../models/spaces.model';

@Component({
  selector: 'app-premises',
  templateUrl: './premises.component.html',
  styleUrls: ['./premises.component.scss'],
})
export class PremisesComponent implements OnInit {
  constructor(private storeSrv: StoreService) {}

  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  spacesLoading$: Observable<boolean> = this.storeSrv.spacesLoading();
  spacesLoaded$: Observable<boolean> = this.storeSrv.spacesLoaded();

  ngOnInit(): void {
    console.log('Premises');
  }

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
