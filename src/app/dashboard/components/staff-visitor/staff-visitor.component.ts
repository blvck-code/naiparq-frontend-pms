import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { DriveInModel } from '../../models/driveIn.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';
import { distinctUntilChanged, map, Observable, switchMap } from 'rxjs';

// Models
import { OrganisationModel, SpaceModel } from '../../models';

// NgRx
import { Store } from '@ngrx/store';
import {
  driveInActions,
  spaceActions,
  guestActions,
} from '../../state/actions';
import { StoreService } from '../../state/store.service';
import { selectedSpaceOrgs } from '../../state/entities/organizations.entities';

@Component({
  selector: 'naiparq-staff-visitor-payment',
  templateUrl: './staff-visitor.component.html',
  styleUrls: ['./staff-visitor.component.scss'],
})
export class StaffVisitorComponent implements OnInit {
  /**
   *  Close modal view child
   */
  @ViewChild('closeDriveIn') 'closeDriveIn': ElementRef;

  /**
   * Drive in observable
   */
  driveIns$: Observable<DriveInModel[]> = this.storeSrv.driveIn();
  /**
   *  Drive in loaded observable
   */
  driveInLoaded$: Observable<boolean> = this.storeSrv.driveInLoaded();
  /**
   *  New page observable
   */
  loadNextPage$: Observable<string> = this.storeSrv.driveInNext();

  /**
   * Spaces observable
   */
  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();
  /**
   * Organizations observable
   */
  organizations$: Observable<OrganisationModel[]> =
    this.store.select(selectedSpaceOrgs);

  /**
   *  New drive In form content
   */
  driveInForm = this.formBuilder.group({
    // Todo change this
    space: ['', Validators.required],
    license_plate: ['', Validators.required],
  });
  /**
   *  Form input for white list car
   */
  whiteListForm = this.formBuilder.group({
    space: ['', Validators.required],
    organisation: ['', Validators.required],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    license_plate: ['', Validators.required],
    status: [''],
  });

  /**
   * Nex page url
   */
  nextPaginationURL: string = '';
  /**
   *  Selected driveIn in the modal
   */
  selectedDriveIn: any;

  /**
   * Is submitting for create new drive In
   * for loading animation
   */
  isSubmitting: boolean = false;
  /**
   *  Loading indicator for more drive Ins
   *  for loading more animation
   */
  loadingMoreDriveIn: boolean = false;
  /**
   *  Default parameter for numberPlate
   */
  numberPlate: string = '';

  /**
   *
   * @param store
   * @param dashSrv
   * @param elementRef
   * @param storeSrv
   * @param sharedSrv
   * @param formBuilder
   */
  constructor(
    private store: Store,
    private dashSrv: DashService,
    private elementRef: ElementRef,
    private storeSrv: StoreService,
    private sharedSrv: SharedService,
    private formBuilder: UntypedFormBuilder
  ) {}

  /**
   * @returns Today's date
   */
  todayDate(): Date {
    return this.dashSrv.currentDate;
  }

  /**
   *  Functions run on page load
   */
  ngOnInit(): void {
    this.onInitHandler();
    this.observerInstance();
  }

  /**
   *  Observers of driveIns are scrolled to the bottom page to fetch more driveIns
   */
  observerInstance(): void {
    // Only runs after content been loaded
    this.driveInLoaded$.subscribe({
      next: (loaded) => {
        if (loaded) {
          const target =
            this.elementRef.nativeElement.querySelector('#bottomPageDriveIn');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.handlePaginateDriveIn();
                console.log('Visible ==>>', this.loadingMoreDriveIn);
              } else {
                this.loadingMoreDriveIn = false;
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
  /**
   * Checks if more driveIns are fetched
   * and page for pagination changes to fetch
   * more content.
   */
  handlePaginateDriveIn(): void {
    this.loadingMoreDriveIn = true;
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

  /**
   * Fetch driveIns, driveOuts and
   * organizations on page load
   */
  onInitHandler(): void {
    // this.handleDriveInList();
    this.store.dispatch(new driveInActions.LoadDriveIn());
    this.store.dispatch(new driveInActions.LoadDriveOut());
    this.store.dispatch(new spaceActions.LoadOrganizations());
    this.store.dispatch(new guestActions.LoadGuests());
  }

  // handleDriveInList(): void {
  //   this.dashSrv.getDriveIn().subscribe({
  //     next: (resp) => {},
  //   });
  // }

  /**
   * @param event Target selects the chose space
   */
  handleSelectedSpace(event: any): void {
    this.store.dispatch(new spaceActions.SelectedSpaceId(event.target.value));
  }

  /**
   * @param event target the licence plate data
   *
   */
  handleNum(event: any): void {
    this.numberPlate = event.target.value.replace(/\s+/g, '');
    this.whiteListForm.patchValue({
      license_plate: this.numberPlate.toUpperCase(),
    });
  }

  /**
   * Creates a new drive In
   */
  onSubmit(): void {
    this.isSubmitting = true;

    this.dashSrv.createDriveIn(this.driveInForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.sharedSrv.showNotification(
          'New drive in added successfully',
          'success'
        );
        this.closeDriveIn.nativeElement.click();
      },
      error: () => {
        this.isSubmitting = false;
        this.sharedSrv.showNotification(
          'Failed to add new drive, please try again.',
          'error'
        );
        this.closeDriveIn.nativeElement.click();
      },
    });
  }

  /**
   *  Submit white list car to server
   */
  onSubmitWhiteList(): void {
    const checkIn = this.whiteListForm.get('start_date')?.value;
    const checkOut = this.whiteListForm.get('end_date')?.value;

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
      next: () => {
        this.sharedSrv.showNotification(
          `${this.numberPlate.toUpperCase()} added to white list successfully.`,
          'success'
        );
        this.whiteListForm.reset();
        // Close modal
        this.closeDriveIn.nativeElement.click();
      },
      error: (err: { message: string; status: number }) => {
        this.sharedSrv.showNotification(err.message, 'error');
        console.log('Create whitelist failed ==>>', err);
      },
    });

    console.log('Form data ==>>', this.whiteListForm.value);
  }

  /**
   *
   * @param element target that listed to
   * page if scrolled to the bottom
   */
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

  /**
   * @param driveIn target shows the modal
   * of clicked driveIn
   */
  clickDriveIn(driveIn: any): void {
    this.selectedDriveIn = driveIn;
  }

  /**
   * @param n
   * Functions used when looping is needed
   * @returns an array with given number
   */
  numSeq(n: number): Array<number> {
    return Array(n);
  }
}
