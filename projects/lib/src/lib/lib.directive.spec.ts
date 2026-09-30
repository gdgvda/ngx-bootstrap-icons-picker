import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NgxBootstrapIconsPickerModule } from './lib.module';
import { NgxBootstrapIconsPickerService } from './lib.service';

@Component({
  imports: [NgxBootstrapIconsPickerModule],
  template: `
    @if (visible()) {
      <input id="trigger" aria-label="Icon" [iconPicker]="icon()"
        [bipPosition]="position()" [bipWidth]="width()" [bipPlaceholder]="placeholder()"
        [bipKeepSearchFilter]="keepSearchFilter()"
        (iconPickerSelect)="icon.set($event)" />
    }
    <button id="outside" type="button">Outside</button>
  `,
})
class TestHost {
  readonly visible = signal(true);
  readonly icon = signal('terminal-fill');
  readonly position = signal('top');
  readonly width = signal('270px');
  readonly placeholder = signal('Search icon..');
  readonly keepSearchFilter = signal<boolean | string>(false);
}

describe('Icon picker interactions', () => {
  let fixture: ComponentFixture<TestHost>;
  let root: HTMLElement;
  let trigger: HTMLInputElement;

  async function settle(): Promise<void> {
    await fixture.whenStable();
  }

  async function open(): Promise<HTMLElement> {
    trigger.click();
    await settle();
    return root.querySelector<HTMLElement>('.icon-picker')!;
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{
        provide: NgxBootstrapIconsPickerService,
        useValue: { getIcons: () => ['alarm', 'github', 'terminal-fill'] },
      }],
    });
    fixture = TestBed.createComponent(TestHost);
    root = fixture.nativeElement;
    await settle();
    trigger = root.querySelector<HTMLInputElement>('#trigger')!;
  });

  afterEach(() => {
    // Close before teardown to prevent a failing cleanup test leaking into another test.
    root.querySelector('#outside')?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    fixture.destroy();
    vi.restoreAllMocks();
  });

  it('measures the visible popup on every top-positioned opening', async () => {
    const popup = await open();
    vi.spyOn(popup, 'offsetHeight', 'get').mockImplementation(() => popup.hidden ? 0 : 230);
    root.querySelector('#outside')!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await settle();
    expect(popup.hidden).toBe(true);
    await open();
    expect(popup.querySelector<HTMLElement>('.arrow')!.style.top).toBe('229px');
  });

  it('updates configuration after the popup has already been created', async () => {
    const popup = await open();
    fixture.componentInstance.width.set('400px');
    fixture.componentInstance.placeholder.set('Find an icon');
    fixture.componentInstance.icon.set('github');
    await settle();
    expect(popup.style.width).toBe('400px');
    expect(popup.querySelector('input')!.placeholder).toBe('Find an icon');
    expect(popup.querySelector<HTMLButtonElement>('.active')!.title).toBe('github');
  });

  it('removes document and window listeners when its host is removed', async () => {
    const addDocument = vi.spyOn(document, 'addEventListener');
    const addWindow = vi.spyOn(window, 'addEventListener');
    const removeDocument = vi.spyOn(document, 'removeEventListener');
    const removeWindow = vi.spyOn(window, 'removeEventListener');
    await open();
    const mouseListener = addDocument.mock.calls.find(call => call[0] === 'mousedown')![1];
    const resizeListener = addWindow.mock.calls.find(call => call[0] === 'resize')![1];
    fixture.componentInstance.visible.set(false);
    await settle();
    expect(removeDocument.mock.calls.some(call => call[0] === 'mousedown' && call[1] === mouseListener)).toBe(true);
    expect(removeWindow.mock.calls.some(call => call[0] === 'resize' && call[1] === resizeListener)).toBe(true);
  });

  it('opens with Enter, focuses search, and closes with Escape restoring focus', async () => {
    trigger.focus();
    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await settle();
    const popup = root.querySelector<HTMLElement>('.icon-picker');
    expect(popup).not.toBeNull();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(document.activeElement).toBe(popup!.querySelector('input'));
    popup!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await settle();
    expect(popup!.hidden).toBe(true);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(trigger);
  });

  it('filters icons and reports a selection to the consuming component', async () => {
    const popup = await open();
    const search = popup.querySelector('input')!;
    search.value = '  GITHUB  ';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await settle();
    const buttons = popup.querySelectorAll<HTMLButtonElement>('button');
    expect(buttons.length).toBe(1);
    expect(buttons[0].title).toBe('github');
    buttons[0].click();
    await settle();
    expect(fixture.componentInstance.icon()).toBe('github');
    expect(popup.hidden).toBe(true);
  });

  it('supports boolean inputs and the existing string false value', async () => {
    fixture.componentInstance.keepSearchFilter.set(true);
    await settle();
    const popup = await open();
    expect(popup.querySelector('input')!.value).toBe('terminal-fill');
    fixture.componentInstance.keepSearchFilter.set('false');
    await settle();
    expect(popup.querySelector('input')!.value).toBe('');
    expect(popup.querySelectorAll('button').length).toBe(3);
  });

  it('updates the DOM when a resize moves the trigger', async () => {
    let top = 100;
    vi.spyOn(trigger, 'getBoundingClientRect').mockImplementation(() => new DOMRect(50, top, 100, 30));
    fixture.componentInstance.position.set('bottom');
    const popup = await open();
    const before = Number.parseFloat(popup.style.top);
    top += 100;
    window.dispatchEvent(new Event('resize'));
    await settle();
    expect(Number.parseFloat(popup.style.top)).toBe(before + 100);
  });

  it('cancels the pending render when the trigger disappears immediately after opening', async () => {
    trigger.click();
    fixture.componentInstance.visible.set(false);
    await settle();
    expect(root.querySelector('.icon-picker')).toBeNull();
  });

  it('closes when keyboard focus leaves the trigger and popup', async () => {
    const popup = await open();
    root.querySelector<HTMLButtonElement>('#outside')!.focus();
    await settle();
    expect(popup.hidden).toBe(true);
    expect(document.activeElement).toBe(root.querySelector('#outside'));
  });
});
