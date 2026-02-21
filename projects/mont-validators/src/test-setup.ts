import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import {
  getTestBed,
} from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';

// Инициализация TestBed (без setupTestBed из-за несовместимости ɵgetCleanupHook с Angular 19)
getTestBed().initTestEnvironment(
  [BrowserTestingModule],
  platformBrowserTesting()
);
