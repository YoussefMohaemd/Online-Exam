import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPassComponent } from './set-pass.component';

describe('SetPassComponent', () => {
  let component: SetPassComponent;
  let fixture: ComponentFixture<SetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
