import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PepAddonService } from '@pepperi-addons/ngx-lib';
import { PepButtonModule } from '@pepperi-addons/ngx-lib/button';
import { PepRemoteLoaderModule } from '@pepperi-addons/ngx-lib/remote-loader';

import { BlockEditorComponent } from './index';

import { config } from '../addon.config';

@NgModule({
    declarations: [BlockEditorComponent],
    imports: [
        CommonModule,
        PepButtonModule,
        PepRemoteLoaderModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: (addonService: PepAddonService) => 
                    PepAddonService.createMultiTranslateLoader(addonService, ['ngx-lib', 'ngx-composite-lib'], config.AddonUUID),
                deps: [PepAddonService]
            }, isolate: false
        }),
    ],
    exports: [BlockEditorComponent],
    providers: [
        TranslateStore,
        // Add here all used services.
    ]
})
export class BlockEditorModule {
    constructor(
        translate: TranslateService,
        private pepAddonService: PepAddonService
    ) {
        this.pepAddonService.setDefaultTranslateLang(translate);
    }
}
