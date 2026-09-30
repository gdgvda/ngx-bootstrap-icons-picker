import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { NgxBootstrapIconsPickerIconPickerDirective } from './lib.directive';

@Component({
  imports: [NgxBootstrapIconsPickerIconPickerDirective],
  template: `
    <div style="position: fixed; left: 80px; width: 300px" [style.top.px]="top()">
      <input id="browser-trigger" aria-label="Icon" iconPicker="github" [bipPosition]="position()" />
    </div>
    <button id="browser-outside" type="button">Outside</button>
  `,
})
class BrowserHost {
  readonly top = signal(400);
  readonly position = signal('top');
}

describe('Picker layout in a real browser', () => {
  it('keeps the popup above the trigger after reopening and repositioning', async () => {
    const fixture = TestBed.createComponent(BrowserHost);
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    const trigger = root.querySelector<HTMLInputElement>('#browser-trigger')!;
    const outside = root.querySelector<HTMLButtonElement>('#browser-outside')!;
    try {
      for (let opening = 0; opening < 2; opening++) {
        trigger.click();
        await fixture.whenStable();
        const popup = root.querySelector<HTMLElement>('.icon-picker')!;
        expect(popup.getBoundingClientRect().height).toBeGreaterThan(100);
        expect(popup.getBoundingClientRect().bottom).toBeCloseTo(trigger.getBoundingClientRect().top - 10, 0);
        expect(document.activeElement).toBe(popup.querySelector('input'));
        outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        await fixture.whenStable();
      }
      fixture.componentInstance.position.set('bottom');
      trigger.click();
      await fixture.whenStable();
      fixture.componentInstance.top.set(450);
      await fixture.whenStable();
      window.dispatchEvent(new Event('resize'));
      await fixture.whenStable();
      const popup = root.querySelector<HTMLElement>('.icon-picker')!;
      expect(popup.getBoundingClientRect().top).toBeCloseTo(trigger.getBoundingClientRect().bottom + 10, 0);
      expect(popup.querySelector<HTMLElement>('.arrow')!.style.top).toBe('');
    } finally {
      fixture.destroy();
    }
  });
});
