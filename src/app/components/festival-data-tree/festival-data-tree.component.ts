import { Component, Input } from '@angular/core';
import { RecordLabels } from '../../models/record-label.model';

@Component({
  selector: 'ea-festival-data-tree',
  templateUrl: './festival-data-tree.component.html',
})
export class FestivalDataTreeComponent {
  @Input() recordLabels: RecordLabels;
}
