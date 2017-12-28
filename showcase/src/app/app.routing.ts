import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
//import { AppTestComponent} from './app.test';

const appRoutes: Routes = [
  //  { path: 'test/:id', component: AppTestComponent },
];
export const appRoutingProviders: any[] = [];
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
