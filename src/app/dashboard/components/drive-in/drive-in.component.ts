import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { DriveInModel } from '../../models/driveIn.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';

// NgRx
import * as driveInActions from '../../state/actions/driveIn.actions';
import * as spaceActions from '../../state/actions/spaces.actions';
import { Store } from '@ngrx/store';
import { StoreService } from '../../state/store.service';
import { distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { SpaceModel } from '../../models/spaces.model';
import { OrganisationModel } from '../../models/organisation.model';
import {
  organizationsList,
  selectedSpaceOrgs,
} from '../../state/entities/organizations.entities';
import { Dayjs } from 'dayjs';

@Component({
  selector: 'naiparq-drive-in-payment',
  templateUrl: './drive-in.component.html',
  styleUrls: ['./drive-in.component.scss'],
})
export class DriveInComponent implements OnInit {
  @ViewChild('closeDriveIn') 'closeDriveIn': ElementRef;

  driveIns$: Observable<DriveInModel[]> = this.storeSrv.driveIn();
  driveInLoaded$: Observable<boolean> = this.storeSrv.driveInLoaded();
  loadNextPage$: Observable<string> = this.storeSrv.driveInNext();

  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  organizations: Observable<OrganisationModel[]> =
    this.store.select(selectedSpaceOrgs);

  driveInForm = this.formBuilder.group({
    // Todo change this
    space: ['a386fe43-eb73-4875-808c-72143279c136'],
    license_plate: ['', Validators.required],
  });
  whiteListForm = this.formBuilder.group({
    space: ['', Validators.required],
    organisation: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    license_plate: ['', Validators.required],
    status: [''],
  });

  nextPaginationURL: string = '';

  isSubmitting: boolean = false;
  loadingMoreDriveIn: boolean = false;
  numberPlate: string = '';

  constructor(
    private store: Store,
    private dashSrv: DashService,
    private elementRef: ElementRef,
    private storeSrv: StoreService,
    private sharedSrv: SharedService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.onInitHandler();
    this.observerInstance();
  }

  observerInstance(): void {
    this.driveInLoaded$.subscribe({
      next: (loaded) => {
        if (loaded) {
          const target =
            this.elementRef.nativeElement.querySelector('#bottomPageDriveIn');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.loadingMoreDriveIn = true;
                this.handlePaginateDriveIn();
                console.log('Visible ==>>', this.loadingMoreDriveIn);
              } else {
                console.log('Invisible ==>>', this.loadingMoreDriveIn);
              }
            });
          });
          observer.observe(target);
        }
      },
    });
  }

  // Todo fetch one pagination at a time
  handlePaginateDriveIn(): void {
    this.loadNextPage$.subscribe({
      next: (url) => {
        // Only dispatch if URL not null
        if (!url) {
          return;
        }
        // Check if next pagination URL change
        if (this.nextPaginationURL !== url && this.loadingMoreDriveIn) {
          this.store.dispatch(new driveInActions.LoadMoreDriveIn(url));
          this.loadingMoreDriveIn = false;
        }
        // Dispatch load more

        this.nextPaginationURL = url;
      },
    });
  }

  onInitHandler(): void {
    this.handleDriveInList();
    this.store.dispatch(new driveInActions.LoadDriveIn());
    this.store.dispatch(new driveInActions.LoadDriveOut());
    this.store.dispatch(new spaceActions.LoadOrganizations());
  }

  handleDriveInList(): void {
    this.dashSrv.getDriveIn().subscribe({
      next: (resp) => {},
    });
  }

  handleSelectedSpace(event: any): void {
    this.store.dispatch(new spaceActions.SelectedSpaceId(event.target.value));
  }

  handleNum(event: any): void {
    this.numberPlate = event.target.value.replace(/\s+/g, '');
    this.whiteListForm.patchValue({
      license_plate: this.numberPlate.toUpperCase(),
    });
  }

  onSubmit(): void {
    this.isSubmitting = true;

    this.dashSrv.createDriveIn(this.driveInForm.value).subscribe({
      next: (resp) => {
        this.isSubmitting = false;
        this.sharedSrv.showNotification(
          'New drive in added successfully',
          'success'
        );
        this.closeDriveIn.nativeElement.click();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.sharedSrv.showNotification(
          'Failed to add new drive, please try again.',
          'error'
        );
        this.closeDriveIn.nativeElement.click();
      },
    });
  }

  onSubmitWhiteList(): void {
    const checkIn = this.whiteListForm.get('start_date')?.value;
    const checkOut = this.whiteListForm.get('end_date')?.value;
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const todayDate = `${yyyy}-${mm}-${dd}`;

    if (this.whiteListForm.invalid) {
      this.sharedSrv.showNotification(
        'Please fill in the whole form.',
        'warning'
      );
      return;
    }
    // Todo check if end date smaller than start date
    if (checkIn > checkOut) {
      this.sharedSrv.showNotification(
        'Please end date cannot be smaller than start date',
        'warning'
      );
      return;
    }
    // Todo check if start date smaller than today
    // if (todayDate < checkIn) {
    //   this.sharedSrv.showNotification(
    //     'Please start date cannot be less than today',
    //     'warning'
    //   );
    //   return;
    // }

    this.dashSrv.createWhiteList(this.whiteListForm.value).subscribe({
      next: (resp) => {
        this.sharedSrv.showNotification(
          `${this.numberPlate.toUpperCase()} added to white list successfully.`,
          'success'
        );
        this.whiteListForm.reset();
      },
      error: (err) => {
        console.log('Create whitelist failed ==>>', err);
      },
    });

    console.log('Form data ==>>', this.whiteListForm.value);
  }

  createAndObserve(element: ElementRef): Observable<boolean> {
    // Check if page reaches to the bottom page
    return new Observable((observe) => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        observe.next(entries);
      });

      intersectionObserver.observe(element.nativeElement);

      return () => {
        intersectionObserver.disconnect();
      };
    }).pipe(
      //@ts-ignore
      switchMap((entries: IntersectionObserverEntry[]) => entries),
      map((entry) => entry.isIntersecting),
      distinctUntilChanged()
    );
  }

  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
