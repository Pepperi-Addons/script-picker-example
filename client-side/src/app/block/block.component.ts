import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPepButtonClickEvent } from '@pepperi-addons/ngx-lib/button';


@Component({
    selector: 'page-block',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    inputParams: string = "None";

    constructor(private translate: TranslateService) {
    }
    firstTB: string = "{}"
    secondTB: string = "{}"
    ngOnInit(): void {
        this.inputParams = this.hostObject.configuration?.runScriptData ? JSON.stringify(this.hostObject.configuration?.runScriptData) : "None";
        debugger;
    }


    ngOnChanges(e: any): void {
        debugger;
        console.log(this.hostObject.configuration);
        this.inputParams = this.hostObject.configuration?.runScriptData ? JSON.stringify(this.hostObject.configuration?.runScriptData) : "None";
    }

    getParamsData()
    {
        let data = {};          
        if (this.hostObject.configuration?.runScriptData?.ScriptData)
        {
            const params = this.hostObject.configuration?.runScriptData?.ScriptData;
            let paramName: keyof typeof params;
            for (paramName in params) {
                if (params[paramName].Source == "static")
                {
                    data[paramName] = params[paramName].Value;
                }
                else 
                {

                }
            }
        }
        return data;
    }

    onRunScript()
    {
        debugger;
        if (this.hostObject.configuration?.runScriptData?.ScriptKey)
        {
            const eventData   = {
                ScriptKey : this.hostObject.configuration?.runScriptData?.ScriptKey,
                ScriptParams : this.getParamsData()
            };
            this.emitEvent(eventData);
        }
    }
    
    emitEvent(eventData): void {
        const dispEventData = {
            detail: {
                // the key of the event to emit
                eventKey: 'RunScript',
                
                // the data for the event
                eventData: eventData,
                
                // when the event loop finishes running this function will be called
                completion: () => {}
            },
          };
        
        const event = new CustomEvent('emit-event', dispEventData);
        window.dispatchEvent(event);
    }
}
