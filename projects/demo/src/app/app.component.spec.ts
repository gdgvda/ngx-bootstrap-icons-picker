import { TestBed } from '@angular/core/testing';
import { expect, it } from 'vitest';
import { AppComponent } from './app.component';

it('renders the packaged standalone picker and keeps the selected value on reopening', async () => {
  const fixture = TestBed.createComponent(AppComponent);
  await fixture.whenStable();
  const root: HTMLElement = fixture.nativeElement;
  const input = root.querySelector<HTMLInputElement>('#selected-icon')!;
  input.click();
  await fixture.whenStable();
  const search = root.querySelector<HTMLInputElement>('.icon-search input')!;
  search.value = 'github';
  search.dispatchEvent(new Event('input', { bubbles: true }));
  await fixture.whenStable();
  root.querySelector<HTMLButtonElement>('button[title="github"]')!.click();
  await fixture.whenStable();
  expect(input.value).toBe('github');
  input.click();
  await fixture.whenStable();
  expect(search.value).toBe('');
  search.value = 'github';
  search.dispatchEvent(new Event('input', { bubbles: true }));
  await fixture.whenStable();
  expect(root.querySelector<HTMLButtonElement>('.ip-button-icon.active')!.title).toBe('github');
});
