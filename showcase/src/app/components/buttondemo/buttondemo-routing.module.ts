import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';
import {ButtonDemoComponent} from './buttondemo.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'buttondemo', component: ButtonDemoComponent}
		])
	],
	exports: [
		RouterModule
	]
})
export class ButtonDemoRoutingModule {}
