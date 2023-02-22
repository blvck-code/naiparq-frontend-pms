import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { SpaceModel } from '../../models/spaces.model';
import * as spaceActions from '../../state/actions/spaces.actions';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { DashService } from '../../services/dash.service';
import { PricingModel } from '../../models/pricing';

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
    private sharedSrv: SharedService,
    private dashSrv: DashService,
    private fb: UntypedFormBuilder
  ) {}

  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  spacesLoading$: Observable<boolean> = this.storeSrv.spacesLoading();
  spacesLoaded$: Observable<boolean> = this.storeSrv.spacesLoaded();

  ngOnInit(): void {
    this.getPremises();
  }

  timeIntervals(): { value: number; key: string }[] {
    return this.dashSrv.timeIntervals;
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

  nextStep(): void {
    this.steps = {
      pricing: false,
      previewPrice: true,
      spaceDetails: false,
    };
  }

  onSubmitPricing(): void {
    if (this.pricingForm.invalid) {
      this.sharedSrv.showNotification(
        'Please fill the form to continue.',
        'info'
      );
      return;
    }
    this.dashSrv.createPricing(this.pricingForm.value).subscribe({
      next: (response: PricingModel) => {
        this.sharedSrv.showNotification(
          'Created space pricing success',
          'success'
        );
        this.pricingForm.reset();
        console.log('Created space item success ==>>', response);
      },
      error: (err) => {
        this.sharedSrv.showNotification(
          'Failed to create space pricing!',
          'error'
        );
        console.log('Failed creating space ==>>', err);
      },
    });
    console.log('Form values ===>>', this.pricingForm.value);
  }
}
