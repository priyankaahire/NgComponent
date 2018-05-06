import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//import { HomeComponent } from './shared/components/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
           // {path: '', component: HomeComponent},
            {path: 'setup', loadChildren: './components/setup/setup.module#SetupModule'},
            {path: 'theming', loadChildren: './components/theming/theming.module#ThemingModule'},
            {path: 'accordion', loadChildren: './components/accordion/accordiondemo.module#AccordionDemoModule'},
            {path: 'inputtext', loadChildren: './components/inputtext/inputtextdemo.module#InputTextDemoModule'},
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
