import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when handleClick is called', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should return correct classes based on color input', () => {
    fixture.componentRef.setInput('color', 'primary');
    expect(component.classes).toBe('app-btn btn-primary');
    fixture.componentRef.setInput('color', 'secondary');
    expect(component.classes).toBe('app-btn btn-secondary');
  });
});
