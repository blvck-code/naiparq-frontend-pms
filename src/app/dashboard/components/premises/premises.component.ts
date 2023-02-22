import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { SpaceModel } from '../../models/spaces.model';
import * as spaceActions from '../../state/actions/spaces.actions';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-premises',
  templateUrl: './premises.component.html',
  styleUrls: ['./premises.component.scss'],
})
export class PremisesComponent implements OnInit {
  pricingForm = this.fb.group({
    min_time: ['', Validators.required],
    max_time: ['', Validators.required],
    price: ['', Validators.required],
  });

  steps = {
    pricing: true,
    previewPrice: false,
    spaceDetails: false,
  };

  constructor(
    private storeSrv: StoreService,
    private store: Store,
    private fb: UntypedFormBuilder
  ) {}

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

  goBack(): void {
    this.steps = {
      pricing: true,
      previewPrice: false,
      spaceDetails: false,
    };
  }

  confirmPriceSchedule(): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: true,
    };
  }

  onSubmitPricing(): void {
    this.steps = {
      pricing: false,
      previewPrice: true,
      spaceDetails: false,
    };
    console.log('Form values ===>>', this.pricingForm.value);
  }
}
