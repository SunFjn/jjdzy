class Child_ShenJiangKuangHuan extends fairygui.GComponent {

	public list:fairygui.GList;

	public static URL:string = "ui://yk4rwc6rl4a99";
	private vo;

	public static createInstance():Child_ShenJiangKuangHuan {
		return <Child_ShenJiangKuangHuan><any>(fairygui.UIPackage.createObject("kaifukuanghuan","Child_ShenJiangKuangHuan"));
	}

	public constructor() {
		super();
	}
 
	public clean(){
		if(this.list.numItems != 0){
			this.list.numItems = 0;
		}
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.list.itemRenderer = this.itemRender;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}
 
	public updateData(data){ 
		////console.log("GGlobal.model_KaiFKH.SJKHData.length", data.length)
	//	//console.log("Model_WuJiang.wuJiangArr", Model_WuJiang.wuJiangArr);
		this.vo = data; 
		this.vo.sort(function (a, b) { return a.getSortIndex2() < b.getSortIndex2() ? -1 : 1; });
		
		this.list.numItems = data.length//GGlobal.model_KaiFKH.SJKHData.length;
	}

	private itemRender(index : number, item : SJKH_Item){
		let data = this.vo[index];
		item.setData(data);
	}
}