class VLXLCItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public imgGray: fairygui.GImage;
	public imgLig: fairygui.GImage;
	public lab: fairygui.GTextField;

	public static URL: string = "ui://vrw7je9recsa13";

	public static createInstance(): VLXLCItem {
		return <VLXLCItem><any>(fairygui.UIPackage.createObject("huoDong", "VLXLCItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.imgGray = <fairygui.GImage><any>(this.getChild("imgGray"));
		this.imgLig = <fairygui.GImage><any>(this.getChild("imgLig"));
		this.lab = <fairygui.GTextField><any>(this.getChild("lab"));
	}
	//id	qishu	tianshu	jiangli	zhanshi
	public set vo(v) {
		this.lab.text = "累充" + v.tianshu + "天"
		let arr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(v.jiangli))
		this.grid.tipEnabled = true;
		this.grid.isShowEff = true;
		this.grid.vo = arr[0];

		
		if(Model_HuoDong.sevenKfCount < v.tianshu){
			this.imgGray.visible = true;
			this.imgLig.visible = false;
		}else{
			this.imgGray.visible = false;
			this.imgLig.visible = true;
		}
	}


	public clean(){
		super.clean();
		this.grid.tipEnabled = false;
		this.grid.showEff(false);
	}

}