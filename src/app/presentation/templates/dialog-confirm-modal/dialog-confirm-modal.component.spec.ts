import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmModalComponent } from './dialog-confirm-modal.component';

describe('DialogConfirmModalComponent', () => {
  let component: DialogConfirmModalComponent;
  let fixture: ComponentFixture<DialogConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConfirmModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
