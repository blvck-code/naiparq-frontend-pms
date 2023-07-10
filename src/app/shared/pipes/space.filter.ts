import { Pipe, PipeTransform } from '@angular/core';
import { SpaceModel } from '../../dashboard/models/spaces.model';

@Pipe({
  name: 'spaceFilter',
})
export class SpaceFilter implements PipeTransform {
  transform(value: any, searchTerm: string): any {
    if (!value || !searchTerm) {
      return value;
    }

    return value.filter(
      (space: SpaceModel) =>
        space.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
  }
}
