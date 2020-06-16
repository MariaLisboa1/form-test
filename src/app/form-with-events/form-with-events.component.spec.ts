import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FormWithEventsComponent } from './form-with-events.component';
import { ConsoleSpy, dispatchEvent } from '../utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormWithEventsComponent', () => {
  let component: FormWithEventsComponent;
  let fixture: ComponentFixture<FormWithEventsComponent>;

  let originalConsole, fakeConsole;
  let el, input, form;

  beforeEach(async(() => {
     // replace the real window.console with our spy
     fakeConsole = new ConsoleSpy();
     originalConsole = window.console;
     (<any>window).console = fakeConsole;
 
     TestBed.configureTestingModule({
       imports: [ FormsModule, ReactiveFormsModule ],
       declarations: [ FormWithEventsComponent ]
     })
     .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWithEventsComponent);
    component = fixture.componentInstance;

    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
  });

  // restores the real console
  afterAll(() => (<any>window).console = originalConsole);

  it('displays errors with no sku', fakeAsync( () => {
    input.value = '';
    dispatchEvent(input, 'input');
    fixture.detectChanges();

    // no value on sku field, all error messages are displayed
    const msgs = el.querySelectorAll('.ui.error.message');
    expect(msgs[0].innerHTML).toContain('SKU is invalid');
    expect(msgs[1].innerHTML).toContain('SKU is required');
  }));

  it('displays no errors when sku has a value', fakeAsync(() => {
    input.value = 'XYZ';
    dispatchEvent(input, 'input');
    fixture.detectChanges();

    const msgs = el.querySelectorAll('.ui.error.message');
    expect(msgs.length).toEqual(0);
  }));

  it('handles sku value changes', fakeAsync( () => {
    input.value = 'XYZ';
    dispatchEvent(input, 'input');
    tick();

    expect(fakeConsole.logs).toContain('sku changed to: XYZ');
  }));

  it('handles form changes', fakeAsync( () => {
    input.value = 'XYZ';
    dispatchEvent(input, 'input');
    tick();

    expect(fakeConsole.logs).toContain('form changed to: [object Object]');
  }));

  it('handles form submission', fakeAsync( () => {
    input.value = 'XYZ';
    dispatchEvent(input, 'input');
    tick();

    fixture.detectChanges();

    dispatchEvent(form, 'submit');
    tick();

    expect(fakeConsole.logs).toContain('you submitted value: XYZ');
  }));
  
});
