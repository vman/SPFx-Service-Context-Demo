declare interface IConsumerStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'consumerStrings' {
  const strings: IConsumerStrings;
  export = strings;
}
