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
import { PricingModel } from '../../models/pricing.model';

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
  @ViewChild('closeAddSpace', { static: true }) 'closeAddSpace': ElementRef;

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
  priceScheduleId: string = '';

  // Spaces
  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  spacesLoading$: Observable<boolean> = this.storeSrv.spacesLoading();
  spacesLoaded$: Observable<boolean> = this.storeSrv.spacesLoaded();

  // Space form
  spaceForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    location: [''],
  });

  completeSpaceForm = this.fb.group({
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

  nextStep(step: string): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: false,
      completeSpace: false,
    };
    // @ts-ignore
    this.steps[step] = true;
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
        // Todo add max time to form as new min time
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

  onSubmitSpace(): void {
    // Validate form
    if (this.spaceForm.invalid) {
      this.sharedSrv.showNotification(
        'Please add space details to continue.',
        'info'
      );
      return;
    }

    // Price schedule payload
    const priceSchedule = {
      label: this.spaceForm.get('title')?.value,
      spacePriceGroup: this.priceSchedule,
    };

    console.log('Price schedules ==>>', priceSchedule);

    // Create price schedule here using the space title
    // Todo Uncomment
    this.dashSrv.createPriceSchedule(priceSchedule).subscribe({
      next: (response) => {
        // Todo price schedule id required when creating the space
        console.log('Create price schedule ==>>', priceSchedule);
        this.priceScheduleId = response.id;
        // Show next step on success
        this.nextStep('completeSpace');
      },
      error: (error) => {
        console.log('Failed to create price schedule ==>>', error);
      },
    });
  }

  onCompleteSpace(): void {
    if (this.completeSpaceForm.invalid) {
      this.sharedSrv.showNotification(
        'Please add space details to continue.',
        'info'
      );
      return;
    }

    // Space payload
    const spacePayload = {
      title: this.spaceForm.get('title')?.value,
      description: this.spaceForm.get('description')?.value,
      // Todo use map to get location
      location: 'POINT(-1.284964786924462 36.8260231474124)',
      features: this.spaceFeaturesArray,
      is_partner: false,
      opening_time: this.completeSpaceForm.get('opening_time')?.value,
      closing_time: this.completeSpaceForm.get('closing_time')?.value,
      space_price_schedule: this.priceScheduleId,
    };

    this.dashSrv.createSpace(spacePayload).subscribe({
      next: (response) => {
        this.sharedSrv.showNotification(
          `${spacePayload.title} Space created successfully.`,
          'success'
        );
        // Todo use created space id to create space images
        // Todo use created space id to create space organization

        console.log('Create space success response ==>>', response);
      },
      error: (error) => {
        console.log('Create space error ==>>', error);
      },
    });

    // Todo submit features, is_patner, opening and closing, space price schedule

    console.log('Create space payload ==>>', spacePayload);
    // Close modal on success response
    // this.closeAddSpace.nativeElement.click();
    // Reset steps
    this.steps = {
      pricing: true,
      previewPrice: false,
      spaceDetails: false,
      completeSpace: false,
    };
  }
}
