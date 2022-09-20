/**
 * @author: lujiahao 
 * @date: 2019-10-23 14:51:57 
 */
class frame1 extends fairygui.GComponent {

    //>>>>start
	public closeButton: fairygui.GButton;
	//>>>>end

    public static URL:string = "ui://jvxpx9emf1cf47";

    public static createInstance():frame1 {
        return <frame1><any>(fairygui.UIPackage.createObject("common","frame1"));
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let Child = ["closeButton",];
        for(let i = 0; i<Child.length; i++)
            this[Child[i]] = <any>this.getChild(Child[i]);
    }
}