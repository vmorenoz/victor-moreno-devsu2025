import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PaginatorComponent} from './paginator.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonComponent} from '../../atoms/button/button.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent, ReactiveFormsModule, ButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.totalItems()).toBe(0);
    expect(component.pageSize()).toBe(5);
    expect(component.currentPage()).toBe(0);
  });

  it('should calculate totalPages correctly', () => {
    fixture.componentRef.setInput('totalItems', 20);
    expect(component.totalPages()).toBe(4);
  });

  it('should update pageSize when form control changes', () => {
    component.pageSizeControl.setValue(5);
    expect(component.pageSize()).toBe(5);
  });

  it('should emit onPage event when page changes', () => {
    spyOn(component.onPage, 'emit');
    component.handlePageChange(2);
    expect(component.onPage.emit).toHaveBeenCalledWith({page: 2, size: 5});
  });

  it('should emit onPage event when pageSize changes', () => {
    spyOn(component.onPage, 'emit');
    component.handlePageSizeChange(15);
    expect(component.onPage.emit).toHaveBeenCalledWith({page: 0, size: 15});
  });

  it('should update currentPage when handlePageChange is called', () => {
    component.handlePageChange(3);
    expect(component.currentPage()).toBe(3);
  });
});
