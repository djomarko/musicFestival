import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecordLabels } from '../../models/record-label.model';
import { SortByKeyPipe } from '../../pipes/sort-by-key.pipe';

import { FestivalDataTreeComponent } from './festival-data-tree.component';

describe('FestivalDataTreeComponent', () => {
  let component: FestivalDataTreeComponent;
  let fixture: ComponentFixture<FestivalDataTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FestivalDataTreeComponent, SortByKeyPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivalDataTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any li drawn on null', () => {
    component.recordLabels = null;
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));

    expect(listItems.length).toBe(0);
  });

  it('should draw the nested list tree depending on data given', () => {
    const label: RecordLabels = {
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
      ACR: {
        name: 'ACR',
        bands: {
          tes: {
            name: 'tes',
            festivals: {},
          },
          Propeller: {
            name: 'Propeller',
            festivals: {
              Festival3: {
                name: 'Festival3',
              },
              Festival2: {
                name: 'Festival2',
              },
            },
          },
        },
      },
    };

    component.recordLabels = label;
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(8); // all nesting included

    const recordLabels = fixture.debugElement.queryAll(By.css('.record-labels > li > label')).map(el => el.nativeElement.textContent);
    expect(recordLabels).toEqual(['ACR', 'Pacific Records']);

    const bands = fixture.debugElement
      .queryAll(By.css('.record-labels > li'))[0]
      .queryAll(By.css('.bands > li > label'))
      .map(el => el.nativeElement.textContent);
    expect(bands).toEqual(['Propeller', 'tes']);

    const festivals = fixture.debugElement
      .queryAll(By.css('.record-labels > li'))[0]
      .queryAll(By.css('.bands > li'))[0]
      .queryAll(By.css('.festivals > li > label'))
      .map(el => el.nativeElement.textContent);
    expect(festivals).toEqual(['Festival2', 'Festival3']);
  });
});
