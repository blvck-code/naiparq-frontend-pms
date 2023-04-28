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
    this.push(
      new BillingItem({
        year: `Apr 1`,
        income: 700,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 2`,
        income: 580,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 3`,
        income: 420,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 4`,
        income: 350,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 5`,
        income: 200,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 6`,
        income: 100,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 7`,
        income: 710,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 8`,
        income: 250,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 9`,
        income: 300,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 10`,
        income: 1200,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 11`,
        income: 850,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 12`,
        income: 1000,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 13`,
        income: 460,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 14`,
        income: 150,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 15`,
        income: 400,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 16`,
        income: 550,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 17`,
        income: 750,
      })
    );
    this.push(
      new BillingItem({
        year: `Apr 18`,
        income: 550,
      })
    );
    // billings.subscribe({
    //   next: (bills: BillingModel[]) => {
    //     bills.map((bill) => {
    //       this.push(
    //         new BillingItem({
    //           year: new Date(bill.check_in_time).toLocaleDateString('en-us', {
    //             month: 'short',
    //             day: 'numeric',
    //           }),
    //           income: bill.total_amount,
    //         })
    //       );
    //
    //     });
    //   },
    // });

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
