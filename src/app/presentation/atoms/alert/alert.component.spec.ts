import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AlertComponent} from './alert.component';
import {By} from '@angular/platform-browser';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values for inputs', () => {
    expect(component.type()).toBe('info');
    expect(component.titleText()).toBe('');
    expect(component.message()).toBe('');
    expect(component.icon()).toBe('fa-solid fa-triangle-exclamation');
  });

  it('should set the correct class based on type', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    expect(component.classes).toContain('alert-error');
  });

  it('should display title and message', () => {
    fixture.componentRef.setInput('titleText', 'Test Title');
    fixture.componentRef.setInput('message', 'This is a test message.');
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.alert-title'));
    const messageElement = fixture.debugElement.query(By.css('.alert-message'));

    expect(titleElement.nativeElement.textContent).toContain('Test Title');
    expect(messageElement.nativeElement.textContent).toContain('This is a test message.');
  });
});
