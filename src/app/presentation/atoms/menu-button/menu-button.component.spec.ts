import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuButtonComponent } from './menu-button.component';
import { ElementRef } from '@angular/core';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have isOpen as false initially', () => {
    expect(component.isOpen).toBeFalse();
  });

  it('should toggle isOpen when toggleDropdown() is called', () => {
    component.toggleDropdown();
    expect(component.isOpen).toBeTrue();

    component.toggleDropdown();
    expect(component.isOpen).toBeFalse();
  });

  it('should emit selected value and close dropdown when handleSelect() is called', () => {
    spyOn(component.onSelect, 'emit');

    component.handleSelect('test-value');

    expect(component.onSelect.emit).toHaveBeenCalledWith('test-value');
    expect(component.isOpen).toBeFalse();
  });
});
