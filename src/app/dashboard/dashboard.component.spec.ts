import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(async(() => {
    const svcSpy = jasmine.createSpyObj<HeroService>(['getHeroes']);
    svcSpy.getHeroes.and.returnValue(of(HEROES));

    TestBed.configureTestingModule({
      providers: [
        DashboardComponent,
        { provide: HeroService, useValue: svcSpy }
      ],
    });
  }));

  beforeEach(() => {
    component = TestBed.get(DashboardComponent);
    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should skip the first hero', () => {
    expect(component.heroes.length).toBe(4);
    expect(component.heroes[0]).toBe(HEROES[1]);
  });

});
