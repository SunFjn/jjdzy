class ChildRoleBtn extends fairygui.GButton {

	public imgSel:fairygui.GLoader;

	public static URL:string = "ui://hpazy1tefurki";

	public static createInstance():ChildRoleBtn {
		return <ChildRoleBtn><any>(fairygui.UIPackage.createObject("createRole","ChildRoleBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgSel = <fairygui.GLoader><any>(this.getChild("imgSel"));
	}

	public set vo(v){
		if(v == 1){
			this.imgSel.url = "ui://hpazy1telg3qw"
		}else if(v == 2){
			this.imgSel.url = "ui://hpazy1telg3qq"
		}else{
			this.imgSel.url = "ui://hpazy1telg3qt"
		}
	}
}