import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { getBillings } from '../../state/entities/bill.entities';
import { BillingModel } from '../../models/billing.model';

export class BillingItem {
  public constructor(init: Partial<BillingItem>) {
    Object.assign(this, init);
  }

  public year: string | undefined;
  public income: number | undefined;
  public expense: number | undefined;
}
export class Billings extends Array<BillingItem> {
  constructor(billings: any) {
    super();
    billings.subscribe({
      next: (bills: BillingModel[]) => {
        bills.map((bill) => {
          console.log('Single bill item ===>>>', bill);
          this.push(
            new BillingItem({
              year: new Date(bill.check_in_time).toLocaleDateString('en-us', {
                month: 'short',
                day: 'numeric',
              }),
              income: bill.total_amount,
            })
          );
        });
      },
    });

    // this.push(
    //   new BillingItem({
    //     year: `Apr 14`,
    //     income: 7000,
    //     expense: 6000,
    //   })
    // );
    // this.push(
    //   new BillingItem({
    //     year: `Apr 14`,
    //     income: 5800,
    //     expense: 6200,
    //   })
    // );
    // this.push(
    //   new BillingItem({
    //     year: `Apr 14`,
    //     income: 4200,
    //     expense: 5800,
    //   })
    // );
    // this.push(
    //   new BillingItem({
    //     year: `Apr 18`,
    //     income: 4700,
    //     expense: 6500,
    //   })
    // );
  }
}
