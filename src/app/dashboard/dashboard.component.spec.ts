import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const svcSpy = jasmine.createSpyObj<HeroService>(['getHeroes']);
    svcSpy.getHeroes.and.returnValue(of(HEROES));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: HeroService, useValue: svcSpy }
      ],
      // schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should skip the first hero', () => {
    expect(component.heroes.length).toBe(4);
    expect(component.heroes[0]).toBe(HEROES[1]);
  });

  it('should display 4 links', () => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(4);
    // expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(4);
  });

});
