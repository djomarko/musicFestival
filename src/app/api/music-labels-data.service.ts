import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FestivalResponse } from '../models/festivals-response.model';
import { RecordLabels } from '../models/record-label.model';
import { set } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class MusicLabelsDataService {
  private readonly url = '/api/v1/festivals';

  constructor(private httpClient: HttpClient) {}

  public getMusicLabels(): Observable<RecordLabels> {
    return this.httpClient.get<FestivalResponse[]>(this.url).pipe(map(festivals => this.convertToRecordLabels(festivals)));
  }

  private convertToRecordLabels(festivals: FestivalResponse[]): RecordLabels {
    const labels: RecordLabels = {};

    if (!Array.isArray(festivals)) {
      throw Error('Unknown response');
    }

    festivals.forEach(festival => {
      festival?.bands.forEach(band => {
        const { name: festivalName = '' } = festival;
        const { name = '', recordLabel = '' } = band;

        set(labels, [recordLabel, 'bands', name, 'festivals', festivalName, 'name'], festivalName);
        labels[recordLabel].name = recordLabel;
        labels[recordLabel].bands[name].name = name;

        if (!festivalName) {
          delete labels[recordLabel].bands[name].festivals[festivalName];
        }
      });
    });

    return labels;
  }
}
