class item_DeLuYouJiang extends fairygui.GComponent {
	public ylq:fairygui.GImage;
	public btnGet:fairygui.GButton;
	public desc:fairygui.GTextField;
	public day:fairygui.GTextField;
	public noticeImg : fairygui.GImage;
	public girdList : fairygui.GList;

	private VODatas : any;

	private rewardVO : any[];

	public static URL:string = "ui://kdt501v2mq0c1f";

	public static createInstance():item_DeLuYouJiang {
		return <item_DeLuYouJiang><any>(fairygui.UIPackage.createObject("sanGuoQingDian","item_DeLuYouJiang"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml); 
		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
		this.btnGet = <fairygui.GButton><any>(this.getChild("btnGet"));
		this.desc = <fairygui.GTextField><any>(this.getChild("desc"));
		this.day = <fairygui.GTextField><any>(this.getChild("day"));
		this.noticeImg = <fairygui.GImage><any>(this.getChild("noticeImg"));
		this.girdList = <fairygui.GList><any>(this.getChild("girdList"));
		this.btnGet.addClickListener(this.onClickBtnGet, this);
		this.girdList.setVirtual();
		this.girdList.callbackThisObj = this;
		this.girdList.itemRenderer = this.itemRenderer;
	} 

	private itemRenderer(index : number, item : ViewGrid){
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this.rewardVO[index]; 
	}
 
	private onClickBtnGet(){  
		if(this.VODatas.state == 1){
			GGlobal.modelSGQD.CGGET4891(this.VODatas.id);
		} else {
			ViewCommonWarn.text("暂不可领取")
		}
	}

	public clean(){
		this.girdList.numItems = 0;
	}

	// interface Isgdlyj_261 {
	// /**奖励*/reward;
	// /**登录天数*/day;
	// /**活动期数*/qs;
	// /**索引id*/id;
	// }
	public setData(data : any){
		this.VODatas = data;
		this.btnGet.visible = this.VODatas.state == 1;
		this.desc.text = "累计登陆" + this.VODatas.day + "天";
		if(this.VODatas.day <= this.VODatas.loginDay){
			//this.day.color = 0x00ff00;
			this.day.text = "(" + this.VODatas.loginDay + "/" + this.VODatas.day + ")";
		} else { 
			this.day.text = "[color=#ff0000](" + this.VODatas.loginDay + "/" + this.VODatas.day + ")[/color]";
		}
		this.noticeImg.visible = this.VODatas.state == 1;
		this.ylq.visible = this.VODatas.state == 2;
		let reward =  ConfigHelp.makeItemListArr(JSON.parse(this.VODatas.reward));
		this.rewardVO = reward; 
		this.girdList.numItems = this.rewardVO.length;
	} 
}