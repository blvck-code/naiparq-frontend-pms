import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { interval, Observable } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { SpaceModel } from '../../models/spaces.model';
import * as spaceActions from '../../state/actions/spaces.actions';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { DashService } from '../../services/dash.service';
import { PricingModel } from '../../models/pricing';

// Map
import * as L from 'leaflet';
import { FeatureGroup, icon, latLng, map, marker, tileLayer } from 'leaflet';
import { HttpClient } from '@angular/common/http';

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
    completeSpace: false,
  };

  // Space Pricing
  spacePrices: PricingModel[] = [];

  // Pricing Schedule
  priceSchedule: string[] = [];

  // Spaces
  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  spacesLoading$: Observable<boolean> = this.storeSrv.spacesLoading();
  spacesLoaded$: Observable<boolean> = this.storeSrv.spacesLoaded();

  // Space form
  spaceForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    location: ['', Validators.required],
    opening_time: ['', Validators.required],
    closing_time: ['', Validators.required],
    features: [],
  });
  spaceFeaturesArray: string[] = [];

  constructor(
    private storeSrv: StoreService,
    private store: Store,
    private sharedSrv: SharedService,
    private dashSrv: DashService,
    private fb: UntypedFormBuilder,
    private http: HttpClient
  ) {}

  spaceFeatures(): { key: string; value: string }[] {
    return this.dashSrv.spaceFeatures;
  }

  ngOnInit(): void {
    this.getPremises();
  }

  handleDisplayRateValues(rateValue: string): string {
    switch (rateValue) {
      case '0':
        return '0';
      case '0.5':
        return '30mins';
      case '1':
        return '1hr';
      case '1.5':
        return '1hr 30mins';
      case '2':
        return '2hr';
      case '2.5':
        return '2hr 30mins';
      case '3':
        return '3hr';
      case '3.5':
        return '3hr 30mins';
      case '4':
        return '4hr';
      case '4.5':
        return '4hr 30mins';
      case '5':
        return '5hr';
      case '5.5':
        return '5hr 30mins';
      case '6':
        return '6hr';

      default:
        return '';
    }
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

  goBack(step: any): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: false,
      completeSpace: false,
    };
    // @ts-ignore
    this.steps[step] = true;
  }

  confirmPriceSchedule(): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: true,
      completeSpace: false,
    };
  }

  nextStep(): void {
    this.steps = {
      pricing: false,
      previewPrice: true,
      spaceDetails: false,
      completeSpace: false,
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
        // Contains prices for preview
        this.spacePrices = [...this.spacePrices, response];
        // Grab price ids to create price schedule with space title
        this.priceSchedule = [...this.priceSchedule, response.id];
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

  handleFeatures(feature: string): void {
    // If in array, remove else add
    if (this.spaceFeaturesArray.includes(feature)) {
      const newArray = this.spaceFeaturesArray.filter(
        (item) => item !== feature
      );
      this.spaceFeaturesArray = newArray;
      this.spaceForm.patchValue({
        features: this.spaceFeaturesArray,
      });
    } else {
      this.spaceFeaturesArray = [...this.spaceFeaturesArray, feature];
      this.spaceForm.patchValue({
        features: this.spaceFeaturesArray,
      });
    }

    console.log('Form content ==>>', this.spaceForm.value);
  }

  onSubmitSpaceDetails(): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: false,
      completeSpace: true,
    };
  }
}
