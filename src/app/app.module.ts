import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirmaComponent } from './firma/firma.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {HttpClientModule} from '@angular/common/http';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule, DropdownModule, PanelMenuModule} from 'primeng/primeng';
import { MuavinComponent } from './muavin/muavin.component';
import { OtobusComponent } from './otobus/otobus.component';
import { SoforComponent } from './sofor/sofor.component';
import { TerminalComponent } from './terminal/terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    FirmaComponent,
    MuavinComponent,
    OtobusComponent,
    SoforComponent,
    TerminalComponent

  ],
  imports: [
    BrowserModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    CalendarModule,
    DropdownModule,
    PanelMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
