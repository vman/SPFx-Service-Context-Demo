import { IListService } from '../services';
import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { PageContext } from '@microsoft/sp-page-context';
import pnp, { List } from "sp-pnp-js";

export class ListService implements IListService {

    public static readonly serviceKey: ServiceKey<IListService> = ServiceKey.create<IListService>('vrd:IListService', ListService);
    private _spHttpClient: SPHttpClient;
    private _pageContext: PageContext;
    private _currentWebUrl: string;

    constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
                this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                this._pageContext = serviceScope.consume(PageContext.serviceKey);
                this._currentWebUrl = this._pageContext.web.absoluteUrl;
                
                //Setup pnp-js to work with the current web url
                pnp.setup({
                    baseUrl: this._currentWebUrl,
                });
        });
    }

    public getDocumentLibraryWithSPHttpClient(): Promise<JSON> {
        return this._spHttpClient.get(`${this._currentWebUrl}/_api/lists/GetByTitle('Documents')`, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json();
        });
    }

    public getDocumentLibraryWithPnPJS(): Promise<JSON>{
        return pnp.sp.web.lists.getByTitle("Documents").get().then((list: JSON) => {
            return list;
        });
    }

}