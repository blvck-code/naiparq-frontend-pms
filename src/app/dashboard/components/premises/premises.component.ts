import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { SpaceModel } from '../../models/spaces.model';
import * as spaceActions from '../../state/actions/spaces.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-premises',
  templateUrl: './premises.component.html',
  styleUrls: ['./premises.component.scss'],
})
export class PremisesComponent implements OnInit {
  constructor(private storeSrv: StoreService, private store: Store) {}

  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  spacesLoading$: Observable<boolean> = this.storeSrv.spacesLoading();
  spacesLoaded$: Observable<boolean> = this.storeSrv.spacesLoaded();

  ngOnInit(): void {
    this.getPremises();
  }

  numSeq(n: number): Array<number> {
    return Array(n);
  }

  getPremises(): void {
    this.store.dispatch(new spaceActions.LoadSpaces());
  }
}
