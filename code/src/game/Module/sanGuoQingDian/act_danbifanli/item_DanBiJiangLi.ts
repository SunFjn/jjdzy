class item_DanBiJiangLi extends fairygui.GComponent {
	public ylq:fairygui.GImage;
	public btnGet:fairygui.GButton;
	public btnGo:fairygui.GButton;
	public grid0:ViewGrid;
	public count:fairygui.GTextField;
	public desc: fairygui.GTextField;
	public noticeImg : fairygui.GImage;

	private VoDatas : VO_DanBiFanLi;

	public static URL:string = "ui://kdt501v2mq0c1d";

	public static createInstance():item_DanBiJiangLi {
		return <item_DanBiJiangLi><any>(fairygui.UIPackage.createObject("sanGuoQingDian","item_DanBiJiangLi"));
	}

	public constructor() {
		super();
	}


	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
		this.btnGet = <fairygui.GButton><any>(this.getChild("btnGet"));
		this.btnGo = <fairygui.GButton><any>(this.getChild("btnGo"));
		this.desc = <fairygui.GTextField><any>(this.getChild("desc"));
		this.count = <fairygui.GTextField><any>(this.getChild("count"));
		this.grid0 = <ViewGrid><any>(this.getChild("grid0"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.btnGo.addClickListener(this.onClickBtnGo, this)
		this.btnGet.addClickListener(this.onClickBtnGet, this)
	}

	private onClickBtnGo(){
		GGlobal.layerMgr.open(UIConst.CHONGZHI);
	}

	private onClickBtnGet(){  
		if(this.VoDatas.count > 0){
			//console.log("~~~~~~~~~~~~~~~~~~~~~~~~~", this.VoDatas)
			GGlobal.modelSGQD.CGGet4911(this.VoDatas.id);
		} else {
			ViewCommonWarn.text("领取条件不足");
		}
	} 

	public clean(){
		this.grid0.tipEnabled = false;
		this.grid0.isShowEff = false;
	}

	// 	interface Isgdbfl_261 { 
	// /**活动期数*/qs;
	// /**奖励*/reward;
	// /**充值id*/cz;
	// /**索引id*/id;
	// /**可领次数*/time;
	// } 
	public setData(data : VO_DanBiFanLi){ 
		this.VoDatas = data; 
		this.desc.text = "单笔充值[color=#33ff00]" + Config.shop_011[this.VoDatas.cz].RMB + "[/color]元";
		this.count.visible = true;
		this.count.text = "可充值领奖次数：[color=#33ff00]" + this.VoDatas.lastNum + "[/color]";
		let reward =  ConfigHelp.makeItemListArr(JSON.parse(this.VoDatas.reward));
		let temp = JSON.parse(this.VoDatas.reward) 
		this.grid0.tipEnabled = true;
		this.grid0.isShowEff = true;
		this.grid0.vo = reward[0];
		if(temp[0][2] >= 199800) 
		{
			this.grid0.lbNum.text = temp[0][2] + "";
		}
		let state = this.VoDatas.lastNum == 0;
		this.ylq.visible = state;
		if(state){ 
			this.count.visible = false; 
		} 
		this.noticeImg.visible = this.VoDatas.count > 0; 
		this.btnGet.visible = this.VoDatas.count > 0;
		this.btnGo.visible = this.VoDatas.lastNum > 0 && this.VoDatas.count <= 0;
		// if(this.VoDatas.count > 0){
		// 	this.count.text = "剩余领取次数：[color=#33ff00]" + this.VoDatas.count + "[/color]";
		// } else {
		// 	this.count.text = "剩余充值次数：[color=#33ff00]" + this.VoDatas.lastNum + "[/color]";
		// }
	}
}