
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { PapiClient, Relation } from '@pepperi-addons/papi-sdk'
import MyService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    // For block template uncomment this.
    const papiClient = new PapiClient({
        baseURL: client.BaseURL,
        token: client.OAuthAccessToken,
        addonUUID: client.AddonUUID,
        addonSecretKey: client.AddonSecretKey
    });
    const res = await createBlockRelation(client, true);
    return res;
    // return {success:true,resultObject:{}}
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    const res = await createBlockRelation(client, true);
    return res;
    // return {success:true,resultObject:{}}
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}
async function createBlockRelation(client: Client, isPageBlock: boolean): Promise<any> {
    try {
        // TODO: change to block name (this is the unique relation name and the description that will be on the block).
        const blockName = 'ScriptPickerTester';

        const filename = `file_${client.AddonUUID}`;

        const pageComponentRelation: Relation = {
            RelationName: isPageBlock ? 'PageBlock' : 'AddonBlock',
            Name: blockName,
            Description: `${blockName} block`,
            Type: "NgComponent",
            SubType: "NG14",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: filename,
            ComponentName: `BlockComponent`, // This is should be the block component name (from the client-side)
            ModuleName: `BlockModule`, // This is should be the block module name (from the client-side)
            ElementsModule: 'WebComponents',
            ElementName: `block-element-${client.AddonUUID}`,
        };

        // For Page block we need to declare the editor data.
        if (isPageBlock) {
            pageComponentRelation['EditorComponentName'] = `BlockEditorComponent`; // This is should be the block editor component name (from the client-side)
            pageComponentRelation['EditorModuleName'] = `BlockEditorModule`; // This is should be the block editor module name (from the client-side)}
            pageComponentRelation['EditorElementName'] = `block-editor-element-${client.AddonUUID}`;
        }

        const service = new MyService(client);
        const result = await service.upsertRelation(pageComponentRelation);
        return { success:true, resultObject: result };
    } catch(err) {
        return { success: false, resultObject: err , errorMessage: `Error in upsert relation. error - ${err}`};
    }
}