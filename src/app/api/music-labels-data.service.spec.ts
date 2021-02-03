import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RecordLabels } from '../models/record-label.model';

import { MusicLabelsDataService } from './music-labels-data.service';

describe('MusicLabelsDataService', () => {
  let service: MusicLabelsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MusicLabelsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('convertToRecordLabels', () => {
    const functionName = 'convertToRecordLabels';
    let func;

    beforeEach(() => {
      func = service[functionName];
    });

    it('should convert a list of festivals into a list of record labels', () => {
      const festivals = [
        {
          bands: [
            { name: 'Propeller', recordLabel: 'Pacific Records' },
            { name: 'Critter Girls', recordLabel: 'ACR' },
          ],
        },
        {
          name: 'Trainerella',
          bands: [
            { name: 'Adrian Venti', recordLabel: 'Monocracy Records' },
            { name: 'Manish Ditch', recordLabel: 'ACR' },
            { name: 'YOUKRANE', recordLabel: 'Anti Records' },
            { name: 'Wild Antelope', recordLabel: 'Still Bottom Records' },
          ],
        },
      ];

      const label: RecordLabels = {
        ACR: {
          name: 'ACR',
          bands: {
            'Critter Girls': {
              name: 'Critter Girls',
              festivals: {},
            },
            'Manish Ditch': {
              name: 'Manish Ditch',
              festivals: {
                Trainerella: {
                  name: 'Trainerella',
                },
              },
            },
          },
        },
      };
      const results = func(festivals);

      expect(Object.keys(results).length).toBe(5);
      expect(results).toEqual(jasmine.objectContaining(label));
    });

    it('should allow for empty name festivals', () => {
      const festivals = [
        {
          bands: [
            { name: 'Propeller', recordLabel: 'Pacific Records' },
            { name: 'Critter Girls', recordLabel: 'ACR' },
          ],
        },
      ];

      const label: RecordLabels = {
        ACR: {
          name: 'ACR',
          bands: {
            'Critter Girls': {
              name: 'Critter Girls',
              festivals: {},
            },
          },
        },
      };
      const results = func(festivals);
      expect(results).toEqual(jasmine.objectContaining(label));
    });

    it('should allow for same band but different labels (historical records)', () => {
      const festivals = [
        {
          name: 'Festival1',
          bands: [
            { name: 'Propeller', recordLabel: 'Pacific Records' },
            { name: 'Propeller', recordLabel: 'ACR' },
          ],
        },
      ];

      const label: RecordLabels = {
        ACR: {
          name: 'ACR',
          bands: {
            Propeller: {
              name: 'Propeller',
              festivals: {
                Festival1: {
                  name: 'Festival1',
                },
              },
            },
          },
        },
        'Pacific Records': {
          name: 'Pacific Records',
          bands: {
            Propeller: {
              name: 'Propeller',
              festivals: {
                Festival1: {
                  name: 'Festival1',
                },
              },
            },
          },
        },
      };
      const results = func(festivals);
      expect(results).toEqual(label);
    });

    it('should allow for same label with multiple bands', () => {
      const festivals = [
        {
          name: 'Festival1',
          bands: [
            { name: 'Propeller', recordLabel: 'Pacific Records' },
            { name: 'Zeplin', recordLabel: 'ACR' },
          ],
        },
        {
          name: 'Festival2',
          bands: [
            { name: 'ters', recordLabel: 'ACR' },
            { name: 'Propeller', recordLabel: 'ACR' },
          ],
        },
      ];

      const label: RecordLabels = {
        ACR: {
          name: 'ACR',
          bands: {
            Propeller: {
              name: 'Propeller',
              festivals: {
                Festival2: {
                  name: 'Festival2',
                },
              },
            },
            Zeplin: {
              name: 'Zeplin',
              festivals: {
                Festival1: {
                  name: 'Festival1',
                },
              },
            },
            ters: {
              name: 'ters',
              festivals: {
                Festival2: {
                  name: 'Festival2',
                },
              },
            },
          },
        },
      };
      const results = func(festivals);
      expect(results).toEqual(jasmine.objectContaining(label));
    });

    it('should allow for same band to play at different festivals', () => {
      const festivals = [
        {
          name: 'Festival1',
          bands: [{ name: 'Propeller', recordLabel: 'ACR' }],
        },
        {
          name: 'Festival2',
          bands: [{ name: 'Propeller', recordLabel: 'ACR' }],
        },
      ];

      const label: RecordLabels = {
        ACR: {
          name: 'ACR',
          bands: {
            Propeller: {
              name: 'Propeller',
              festivals: {
                Festival1: {
                  name: 'Festival1',
                },
                Festival2: {
                  name: 'Festival2',
                },
              },
            },
          },
        },
      };
      const results = func(festivals);

      expect(results).toEqual(label);
    });

    it('should filter out any duplicates', () => {
      const festivals = [
        {
          name: 'Festival1',
          bands: [{ name: 'Propeller', recordLabel: 'ACR' }],
        },
        {
          name: 'Festival1',
          bands: [
            { name: 'Propeller', recordLabel: 'ACR' },
            { name: 'Propeller', recordLabel: 'ACR' },
          ],
        },
      ];

      const label: RecordLabels = {
        ACR: {
          name: 'ACR',
          bands: {
            Propeller: {
              name: 'Propeller',
              festivals: {
                Festival1: {
                  name: 'Festival1',
                },
              },
            },
          },
        },
      };
      const results = func(festivals);
      expect(results).toEqual(label);
    });

    it('should allow for all 3 names to be empty and handle them gracefully', () => {
      const festivals = [
        {
          name: undefined,
          bands: [{ name: undefined, recordLabel: undefined }],
        },
      ];

      const label: RecordLabels = {
        '': {
          name: '',
          bands: {
            '': {
              name: '',
              festivals: {},
            },
          },
        },
      };
      const results = func(festivals);
      expect(results).toEqual(label);
    });
  });
});
