interface ICDButton
{
    title:string; 
    enabled:boolean;
    addEventListener(type: string, listener: Function, thisObject: any): void;
    removeEventListener(type: string, listener: Function, thisObject: any): void;
}