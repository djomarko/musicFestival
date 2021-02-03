import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

const getErrorEl = fixture => fixture.debugElement.query(By.css('.warning'));
const getTreeEl = fixture => fixture.debugElement.query(By.css('ul'));

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should expect for the API endpoint to be called', () => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toEqual('GET');
    req.flush(
      {},
      {
        status: 200,
        statusText: 'OK',
      },
    );
  });

  it('should show the tree with the reformatted alphabetically sorted lists', () => {
    fixture.detectChanges();

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

    const req = httpTestingController.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toEqual('GET');
    req.flush(festivals, {
      status: 200,
      statusText: 'OK',
    });
    fixture.detectChanges();

    const errorMssg = getErrorEl(fixture);
    expect(errorMssg).toBeNull();

    const treeNodes = getTreeEl(fixture)
      .queryAll(By.css('li > label'))
      .map(node => node.nativeElement.textContent);
    expect(treeNodes).toEqual([
      'ACR',
      'Critter Girls',
      'Manish Ditch',
      'Trainerella',
      'Anti Records',
      'YOUKRANE',
      'Trainerella',
      'Monocracy Records',
      'Adrian Venti',
      'Trainerella',
      'Pacific Records',
      'Propeller',
      'Still Bottom Records',
      'Wild Antelope',
      'Trainerella',
    ]);
  });

  it('should show an error if the API returns an invalid response', () => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toEqual('GET');
    req.flush('', {
      status: 200,
      statusText: 'OK',
    });
    fixture.detectChanges();

    const errorMssg = getErrorEl(fixture).nativeElement.textContent;
    expect(errorMssg).toBe('Error: Unexpected response. Please try refreshing the page.');

    const tree = getTreeEl(fixture).query(By.css('li'));
    expect(tree).toBeNull();
  });

  it('should show an error if the API returns an invalid response', () => {
    fixture.detectChanges();

    const req = httpTestingController.expectOne(`/api/v1/festivals`);
    expect(req.request.method).toEqual('GET');
    req.flush('Too many requests, throttling', {
      status: 429,
      statusText: 'Too Many Requests',
    });
    fixture.detectChanges();

    const errorMssg = getErrorEl(fixture).nativeElement.textContent;
    expect(errorMssg).toBe('Error: Too many requests, throttling. Please try refreshing the page.');

    const tree = getTreeEl(fixture).query(By.css('li'));
    expect(tree).toBeNull();
  });
});
