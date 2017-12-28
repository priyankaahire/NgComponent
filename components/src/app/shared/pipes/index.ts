import { NgModule } from '@angular/core';
import { AggregatePipesModule } from './aggregate/index';
import { ArrayPipesModule } from './array/index';
import { BooleanPipesModule } from './boolean/index';
import { MathPipesModule } from './math/index';
import { ObjectPipesModule } from './object/index';
import { StringPipesModule } from './string/index';


@NgModule({
  exports: [
    ArrayPipesModule,
    MathPipesModule,
    BooleanPipesModule,
    StringPipesModule,
    ObjectPipesModule,
    AggregatePipesModule
  ]
})
export class PipesModule {}

// Export individual pipes and modules
export * from './aggregate/index';
export * from './array/index';
export * from './boolean/index';
export * from './math/index';
export * from './object/index';
export * from './string/index';
