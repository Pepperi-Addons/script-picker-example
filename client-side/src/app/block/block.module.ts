import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PepAddonService, PepNgxLibModule } from '@pepperi-addons/ngx-lib';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { BlockComponent } from './index';
import { PepTextareaModule } from '@pepperi-addons/ngx-lib/textarea';

import { config } from '../addon.config';

export const routes: Routes = [
    {
        path: '',
        component: BlockComponent
    }
];

@NgModule({
    declarations: [BlockComponent],
    imports: [
        CommonModule,
        PepTextareaModule,
        PepButtonModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(addonService, ['ngx-lib', 'ngx-composite-lib'], config.AddonUUID),
                deps: [PepAddonService]
            }, isolate: false
        }),
        RouterModule.forChild(routes)
    ],
    exports: [BlockComponent],
    providers: [
        TranslateStore,
        // Add here all used services.
    ]
})
export class BlockModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
