import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { DriveInModel } from '../../models/driveIn.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../shared/services/shared.service';

// NgRx
import * as driveInActions from '../../state/actions/driveIn.actions';
import { Store } from '@ngrx/store';
import { StoreService } from '../../state/store.service';
import { distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { SpaceModel } from '../../models/spaces.model';

@Component({
  selector: 'drive-in-payment',
  templateUrl: './drive-in.component.html',
  styleUrls: ['./drive-in.component.scss'],
})
export class DriveInComponent implements OnInit {
  @ViewChild('closeDriveIn') 'closeDriveIn': ElementRef;

  driveIns$: Observable<DriveInModel[]> = this.storeSrv.driveIn();
  driveInLoaded$: Observable<boolean> = this.storeSrv.driveInLoaded();
  loadNextPage$: Observable<string> = this.storeSrv.driveInNext();

  spaces$: Observable<SpaceModel[]> = this.storeSrv.getSpaces();

  driveInForm = this.formBuilder.group({
    // Todo change this
    space: ['a386fe43-eb73-4875-808c-72143279c136'],
    license_plate: ['', Validators.required],
  });

  nextPaginationURL: string = '';

  isSubmitting: boolean = false;
  loadingMoreDriveIn: boolean = false;

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
                this.handlePaginateDriveIn();
                // this.loadingMoreDriveIn = true;
              } else {
                // this.loadingMoreDriveIn = false;
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
        if (this.nextPaginationURL !== url) {
          this.store.dispatch(new driveInActions.LoadMoreDriveIn(url));
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
  }

  handleDriveInList(): void {
    this.dashSrv.getDriveIn().subscribe({
      next: (resp) => {},
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
