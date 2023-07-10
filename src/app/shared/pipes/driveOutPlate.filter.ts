import { Pipe, PipeTransform } from '@angular/core';
import { DriveOutModel } from '../../dashboard/models/driveOut.model';

@Pipe({
  name: 'driveOutPlateFilter',
})
export class DriveOutPlateFilter implements PipeTransform {
  transform(value: any, searchTerm: string): any {
    if (!value || !searchTerm) {
      return value;
    }
    return value.filter(
      (driveOut: DriveOutModel) =>
        driveOut.drive_in_details.license_plate
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
