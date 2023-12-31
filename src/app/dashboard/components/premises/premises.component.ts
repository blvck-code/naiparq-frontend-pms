import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { StoreService } from '../../state/store.service';
import { SpaceModel } from '../../models/spaces.model';
import * as spaceActions from '../../state/actions/spaces.actions';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { DashService } from '../../services/dash.service';
import { PricingModel } from '../../models/pricing.model';
import { environment as env } from '../../../../environments/environment';
// Map
import * as L from 'leaflet';
import { latLng } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { selectSpaceEntity } from '../../state/entities/spaces.entities';
import { OrganisationModel } from '../../models/organisation.model';
import { selectedSpaceOrgs } from '../../state/entities/organizations.entities';

@Component({
  selector: 'naiparq-premises',
  templateUrl: './premises.component.html',
  styleUrls: ['./premises.component.scss'],
})
export class PremisesComponent implements OnInit {
  @ViewChild('closeAddSpace', { static: true }) 'closeAddSpace': ElementRef;
  @ViewChild('spacePhotos') 'spacePhotos': ElementRef;

  // Submitting indicators
  submittingOrgOne: boolean = false;
  submittingOrgTwo: boolean = false;

  pricingForm = this.fb.group({
    min_time: ['', Validators.required],
    max_time: ['', Validators.required],
    price: ['', Validators.required],
  });
  spaceOrgForm = this.fb.group({
    space: ['', Validators.required],
    name: ['', Validators.required],
    floor: ['', Validators.required],
  });

  steps = {
    pricing: true,
    previewPrice: false,
    spaceDetails: false,
    completeSpace: false,
    organization: false,
  };

  // Space Images
  imgTypes = ['jpg', 'png', 'jpeg'];
  spaceFormData = new FormData();
  spaceImageURL: string = '';

  // Space Pricing
  spacePrices: PricingModel[] = [];

  // Pricing Schedule
  priceSchedule: string[] = [];
  priceScheduleId: string = '';
  selectedMaxTime: { key: string; value: number } = {
    key: '',
    value: 0,
  };

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

  activeSpaceDetail$!: Observable<SpaceModel | undefined>;
  organizations$: Observable<OrganisationModel[]> =
    this.store.select(selectedSpaceOrgs);

  completeSpaceForm = this.fb.group({
    opening_time: ['', Validators.required],
    closing_time: ['', Validators.required],
    features: [],
  });
  spaceFeaturesArray: string[] = [];

  // Map
  private map: any;
  icon: any;
  mapLoaded: boolean = false;

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

  selectedSpace(spaceId: string): void {
    this.activeSpaceDetail$ = this.store.select(selectSpaceEntity(spaceId));
    this.store.dispatch(new spaceActions.SelectedSpaceId(spaceId));

    setTimeout(() => {
      this.createMapContent();
    }, 1500);
  }

  clickSpacePhotos(): void {
    this.spacePhotos.nativeElement.click();
  }

  adminRights(): boolean {
    return this.dashSrv.adminRights();
  }

  handleSpacePhotos(event: any): void {
    if (!event.target.files) {
      this.sharedSrv.showNotification('Please select image files.', 'info');
    } else {
      const reader = new FileReader();
      const formData = new FormData();

      const fileName = event.target.files[0].name;
      const fileExt = fileName.split('.').pop();
      const fileSize = event.target.files[0].size / 1024 / 1024; // Size in mb

      // Validate file type
      if (!this.imgTypes.includes(fileExt)) {
        this.sharedSrv.showNotification(
          'This file type is not supported.',
          'warning'
        );
        return;
      }

      // Validate file size
      if (fileSize > 5) {
        this.sharedSrv.showNotification(
          'Image size must be under 5MiB!',
          'warning'
        );
        return;
      }

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // @ts-ignore
        this.spaceImageURL = event.target.result;
      };
      formData.append('image', event);

      this.spaceFormData.append('image', event.target.files[0]);
    }
  }

  timeIntervals(): { value: number; key: string }[] {
    return this.dashSrv.timeIntervals;
  }

  createMapContent(): void {
    if (!this.mapLoaded) {
      this.map = L.map('map').setView([-1.27963, 36.87105], 14);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          maxZoom: 19,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: env.mapbox.accessToken,
        }
      ).addTo(this.map);

      this.icon = L.icon({
        iconUrl: 'assets/images/map-marker.png',
        popupAnchor: [13, 0],
      });

      this.mapLoaded = true;
    }

    //// Delay marker showing so that farms are populated
    setTimeout(() => {
      this.activeSpaceDetail$.subscribe({
        next: (resp) => {
          this.populateMap(
            resp?.location.coordinates[0],
            resp?.location.coordinates[1],
            resp?.title
          );
        },
      });
    }, 500);
  }

  populateMap(
    lat: number | undefined,
    lng: number | undefined,
    name: string | undefined
  ): void {
    // @ts-ignore
    L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup(`${name} location`)
      .openPopup();
  }

  numSeq(n: number): Array<number> {
    return Array(n);
  }

  getPremises(): void {
    this.store.dispatch(new spaceActions.LoadSpaces());
    this.store.dispatch(new spaceActions.LoadOrganizations());
  }

  goBack(step: any): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: false,
      completeSpace: false,
      organization: false,
    };
    // @ts-ignore
    this.steps[step] = true;
  }

  nextStep(step: string): void {
    this.steps = {
      pricing: false,
      previewPrice: false,
      spaceDetails: false,
      completeSpace: false,
      organization: false,
    };

    // @ts-ignore
    this.steps[step] = true;
  }

  handlePreviewStep(): void {
    console.log('Space time ==>>', this.spacePrices.length);
    if (!this.spacePrices.length) {
      this.sharedSrv.showNotification(
        'Please fill the form to continue.',
        'info'
        // console.log()
      );
      return;
    }
    this.nextStep('previewPrice');
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

        // Make next min time be the last max time
        this.pricingForm.patchValue({
          min_time: this.pricingForm.get('max_time')?.value,
          max_time: '',
          price: '',
        });
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

    // Create price schedule here using the space title
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

    console.log('payload ===>>', spacePayload);

    this.dashSrv.createSpace(spacePayload).subscribe({
      next: (response) => {
        this.sharedSrv.showNotification(
          `${spacePayload.title} Space created successfully.`,
          'success'
        );

        // Space id need to create space gallery
        this.handleSpaceImages(response.id);
        // Space id needed to create space organization
        this.spaceOrgForm.patchValue({
          space: response.id,
        });

        // Next step
        this.nextStep('organization');
      },
      error: (error) => {
        console.log('Create space error ==>>', error);
      },
    });

    // Todo submit features, is_patner, opening and closing, space price schedule
    // Close modal on success response
    // this.closeAddSpace.nativeElement.click();
    // Reset steps
  }

  submitSpaceOrg(close: boolean): void {
    const orgName = this.spaceOrgForm.get('name')?.value;

    this.dashSrv.creatOrganization(this.spaceOrgForm.value).subscribe({
      next: (response) => {
        console.log('Create space success ==>>', response);
        this.sharedSrv.showNotification(
          `${orgName} created successfully.`,
          'success'
        );

        // Close modal if only save
        if (close) {
          this.closeAddSpace.nativeElement.click();
        }
        this.spaceOrgForm.reset();
      },
      error: (err) => {
        console.log('Create space failed ==>> ', err);
      },
    });

    console.log('Form organ data ==>>', this.spaceOrgForm.value);
  }

  handleSpaceImages(spaceId: string) {
    this.spaceFormData.append('space', spaceId);

    this.dashSrv.createSpaceGallery(this.spaceFormData).subscribe({
      next: (response) => {
        console.log('Space id ==>>', response);
      },
      error: (err) => {
        console.log('Create space images failed ==>>', err);
      },
    });
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
}
