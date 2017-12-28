
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app.module';
enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule).then(
  (success: any) => console.log('App bootstrapped'))
  .catch((err: any) => console.error(err));

  // Angular calls these hook methods in the following order:

  //   ngOnChanges - when an input/output binding value changes.
  //   ngOnInit - after the first ngOnChanges.
  //   ngDoCheck - developer's custom change detection.
  //   ngAfterContentInit - after component content initialized.
  //   ngAfterContentChecked - after every check of component content.
  //   ngAfterViewInit - after component's view(s) are initialized.
  //   ngAfterViewChecked - after every check of a component's view(s).
  //   ngOnDestroy - just before the directive is destroyed.
