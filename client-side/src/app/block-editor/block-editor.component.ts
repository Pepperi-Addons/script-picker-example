import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PepAddonBlockLoaderService } from '@pepperi-addons/ngx-lib/remote-loader';

interface IScriptPickerRunScriptData {
    ScriptKey: string,
    ScriptData: any
}

interface IScriptPickerData {
    runScriptData?: IScriptPickerRunScriptData,
    fields?: any,
  }

@Component({
    selector: 'page-block-editor',
    templateUrl: './block-editor.component.html',
    styleUrls: ['./block-editor.component.scss']
})

export class BlockEditorComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    dialogRef: MatDialogRef<any>;
    
    constructor(
        private translate: TranslateService,
        private viewContainerRef: ViewContainerRef,
        private addonBlockLoaderService: PepAddonBlockLoaderService
        ) {
    }

    ngOnInit(): void {
        debugger;
    }

    ngOnChanges(e: any): void {
    }

    openScriptPickerDialog() {

        const scriptObject : IScriptPickerData = {};

        this.dialogRef = this.addonBlockLoaderService.loadAddonBlockInDialog({
            container: this.viewContainerRef,
            name: 'ScriptPicker',
            hostObject: scriptObject,
            hostEventsCallback: (event) => { 
                if (event.action === 'script-picked') {
                    debugger;
                    this.hostEvents.emit({
                        action: 'set-configuration',
                        configuration: event.data,
                        updatePageConfiguration: true
                    });
                    this.dialogRef.close();
                } else if (event.action === 'close') {
                    this.dialogRef.close();
                }
            }
        });
    }
}
