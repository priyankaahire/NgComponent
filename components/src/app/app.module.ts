import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, Router, RouterModule, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from "./app.component";
import { HttpModule } from '@angular/http';
import { appRouting, appRoutingProviders } from './app.routing';
import { AppErrorHandler, InputModule, ButtonModule} from '../app/shared/index';
/*


NgModule is a decorator function that takes a single metadata object whose properties describe the module. The most important properties are:

declarations - the view classes that belong to this module. Angular has three kinds of view classes: components, directives, and pipes.

exports - the subset of declarations that should be visible and usable in the component templates of other modules.

imports - other modules whose exported classes are needed by component templates declared in this module.

providers - creators of services that this module contributes to the global collection of services; they become accessible in all parts of the app.

bootstrap - the main application view, called the root component, that hosts all other app views. Only the root module should set this bootstrap property.

symbols -
    {{ }} for interpolation.
    [] for property binding.
    () for event binding.
    # for variable declaration.
    * for structural directives.

    A Component - using @Component()
    A Structural Directive - using @Directive() - usually changes the DOM of an element - NgIf
    An Attribute Directive - using @Directive() - doesn't change the DOM, but adding behaviour

*/
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, InputModule, ButtonModule],
  exports: [],
  providers: [RouterLink, FormBuilder, appRoutingProviders, { provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
