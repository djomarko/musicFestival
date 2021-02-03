import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MusicLabelsDataService } from './api/music-labels-data.service';
import { RecordLabels } from './models/record-label.model';

@Component({
  selector: 'ea-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  public data$: Observable<RecordLabels>;
  public error: string;

  constructor(musicLabelDataService: MusicLabelsDataService) {
    this.data$ = musicLabelDataService.getMusicLabels().pipe(
      catchError((err: HttpErrorResponse) => {
        this.error = err.error ?? 'Unexpected response';

        return EMPTY;
      }),
    );
  }
}
