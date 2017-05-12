export interface IListService {
     getDocumentLibraryWithSPHttpClient(): Promise<JSON>;
     getDocumentLibraryWithPnPJS(): Promise<JSON>;
}