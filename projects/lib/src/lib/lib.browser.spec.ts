import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { userEvent } from 'vitest/browser';
import { NgxBootstrapIconsPickerIconPickerDirective } from './lib.directive';
import { NgxBootstrapIconsPickerService } from './lib.service';

@Component({
  imports: [NgxBootstrapIconsPickerIconPickerDirective],
  template: `
    <div style="position: fixed; left: 80px; width: 300px" [style.top.px]="top()">
      <input id="browser-trigger" aria-label="Icon" iconPicker="github" [bipPosition]="position()"
        [bipWidth]="width()" [bipMaxHeight]="maxHeight()" />
    </div>
    <button id="browser-outside" type="button">Outside</button>
  `,
})
class BrowserHost {
  readonly top = signal(400);
  readonly position = signal('top');
  readonly width = signal('270px');
  readonly maxHeight = signal('180px');
}

describe('Picker layout in a real browser', () => {
  it('opens with a small initial grid and searches the entire catalog', async () => {
    const fixture = TestBed.createComponent(BrowserHost);
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    try {
      root.querySelector<HTMLInputElement>('#browser-trigger')!.click();
      await fixture.whenStable();
      const popup = root.querySelector<HTMLDialogElement>('dialog.icon-picker')!;
      expect(popup.querySelectorAll('button').length).toBeLessThan(200);
      const lastIcon = TestBed.inject(NgxBootstrapIconsPickerService).getIcons().at(-1)!;
      expect(popup.querySelector('button[title="' + lastIcon + '"]')).toBeNull();
      const search = popup.querySelector('input')!;
      search.value = lastIcon;
      search.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      expect(popup.querySelector('button[title="' + lastIcon + '"]')).not.toBeNull();
      expect(popup.getBoundingClientRect().bottom).toBeCloseTo(root.querySelector('#browser-trigger')!.getBoundingClientRect().top - 10, 0);
    } finally {
      fixture.destroy();
    }
  });

  it('keeps subsequent batches reachable with Tab and scrolling', async () => {
    const fixture = TestBed.createComponent(BrowserHost);
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    const icons = TestBed.inject(NgxBootstrapIconsPickerService).getIcons();
    try {
      root.querySelector<HTMLInputElement>('#browser-trigger')!.click();
      await fixture.whenStable();
      const popup = root.querySelector<HTMLDialogElement>('dialog.icon-picker')!;
      const grid = popup.querySelector<HTMLElement>('.icon-grid')!;
      const initialButtons = popup.querySelectorAll<HTMLButtonElement>('button');
      initialButtons[initialButtons.length - 1].focus();
      await fixture.whenStable();
      await userEvent.keyboard('{Tab}');
      await fixture.whenStable();
      expect(document.activeElement).toBe(popup.querySelectorAll('button')[initialButtons.length]);
      expect(popup.open).toBe(true);

      for (let batch = 0; batch < 40 && popup.querySelectorAll('button').length < icons.length; batch++) {
        grid.scrollTop = grid.scrollHeight;
        grid.dispatchEvent(new Event('scroll'));
        await fixture.whenStable();
      }
      const allButtons = popup.querySelectorAll<HTMLButtonElement>('button');
      expect(allButtons).toHaveLength(icons.length);
      expect(allButtons[allButtons.length - 1].title).toBe(icons.at(-1));
      allButtons[allButtons.length - 1].click();
      await fixture.whenStable();
      expect(popup.open).toBe(false);
      root.querySelector<HTMLInputElement>('#browser-trigger')!.click();
      await fixture.whenStable();
      expect(popup.querySelector<HTMLButtonElement>('button.active')!.title).toBe(icons.at(-1));

      const search = popup.querySelector('input')!;
      search.focus();
      search.value = 'github';
      search.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      expect(popup.querySelectorAll('button')).toHaveLength(1);
      search.value = '';
      search.dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      expect(popup.querySelectorAll('button').length).toBeLessThan(200);
      expect(grid.scrollTop).toBe(0);
    } finally {
      fixture.destroy();
    }
  });

  it('fills large custom viewports before scrolling', async () => {
    const fixture = TestBed.createComponent(BrowserHost);
    fixture.componentInstance.width.set('800px');
    fixture.componentInstance.maxHeight.set('400px');
    await fixture.whenStable();
    const root: HTMLElement = fixture.nativeElement;
    try {
      root.querySelector<HTMLInputElement>('#browser-trigger')!.click();
      await fixture.whenStable();
      const grid = root.querySelector<HTMLElement>('.icon-grid')!;
      expect(grid.clientHeight).toBe(400);
      expect(grid.scrollHeight).toBeGreaterThan(grid.clientHeight);
      expect(grid.querySelectorAll('button').length).toBeLessThan(TestBed.inject(NgxBootstrapIconsPickerService).getIcons().length);
    } finally {
      fixture.destroy();
    }
  });

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
