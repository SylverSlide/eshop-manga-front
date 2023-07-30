import { NgModule } from '@angular/core';
import { NavbarModule } from '@coreui/angular';
import { GridModule } from '@coreui/angular';
import { DropdownModule } from '@coreui/angular';
import { NavModule } from '@coreui/angular';
import { CollapseModule } from '@coreui/angular';
@NgModule({
  exports: [
    NavbarModule,
    GridModule,
    DropdownModule,
    NavModule,
    CollapseModule,
  ],
})
export class CoreUIlModule {}
