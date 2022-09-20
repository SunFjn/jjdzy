class RewardBackItem extends fairygui.GComponent {
	public itemName:fairygui.GTextField;
	public get:Button0;
	public getAll:Button1;
	public lbYB1:fairygui.GRichTextField;
	public lbYB2:fairygui.GRichTextField;
	public desc1:fairygui.GTextField;
	public itemParent:fairygui.GGroup;
	public hadGet : fairygui.GImage;
	public list : fairygui.GList;

	private rewardData : any[];
	private voData : RewardBackItemVO;
	/**元宝 */
	private yuanbao : number;
	/**铜钱 */
	private tongqian : number;

	public static URL:string = "ui://ye1luhg3o9c21b";

	public static createInstance():RewardBackItem {
		return <RewardBackItem><any>(fairygui.UIPackage.createObject("Welfare","RewardBackItem"));
	}

	public constructor() {
		super();
	}
 
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml); 

		this.itemName = <fairygui.GTextField><any>(this.getChild("itemName"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.get = <Button0><any>(this.getChild("get"));
		this.getAll = <Button1><any>(this.getChild("getAll"));
		this.lbYB1 = <fairygui.GRichTextField><any>(this.getChild("lbYB1"));
		this.lbYB2 = <fairygui.GRichTextField><any>(this.getChild("lbYB2")); 
		this.desc1 = <fairygui.GTextField><any>(this.getChild("desc1"));
		this.itemParent = <fairygui.GGroup><any>(this.getChild("itemParent")).asGroup;
		this.hadGet = <fairygui.GImage><any>(this.getChild("hadGet"));
		this.hadGet.visible = false;
		this.itemParent.visible = true;
		this.desc1.text = "50%奖励"

		this.list.setVirtual();
		this.list.itemRenderer = this.itemRender;
		this.list.callbackThisObj = this;
		this.get.addClickListener(this.onClickGet, this);
		this.getAll.addClickListener(this.onClickGetAll, this);
	} 
 
	private itemRender(index : number, item : ViewGrid){
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this.rewardData[index]; 
	}
 
	public clean(){
		this.list.numItems = 0; 
	}
 
	public setData(vo : RewardBackItemVO){
		this.voData = vo;
		this.list.numItems = 0;
		this.itemParent.visible = true; 
		this.hadGet.visible = false; 
		let reward = ConfigHelp.makeItemListArr((this.voData.reward));
		this.rewardData = reward;
		this.list.numItems = this.rewardData.length;
		this.itemName.text = this.voData.name; 
		if(this.voData.state == 2){ //已领取
			this.itemParent.visible = false; 
			this.hadGet.visible = true;
		} else {
			this.get.noticeImg.visible = this.voData.state == 1;
			this.getAll.noticeImg.visible = this.voData.state == 1; 
			this.yuanbao = this.voData.conmuse1;
			this.tongqian = this.voData.conmuse;
			this.setTextState(this.lbYB1, this.yuanbao); 
			this.setTextState(this.lbYB2, this.tongqian, 2);
		}
	}

	private setTextState(text : fairygui.GTextField, amount : number, type = 1){
		//								 元宝的判断								铜钱的判断
		let ret : boolean = type == 1 ?  Model_player.voMine.yuanbao < amount : Model_player.voMine.tongbi < amount;
		if(ret){
			text.text = "[color=#ff0000]" + ConfigHelp.getYiWanText(amount) + "[/color]"
		} else {
			text.text = ConfigHelp.getYiWanText(amount) + "";
		}
	} 
  
	private onClickGet(){
		if(Model_player.voMine.tongbi < this.tongqian){
			ViewCommonWarn.text("铜币不足");
			return; 
		}
		GGlobal.modelwelfare.CG_APPLY_GETREWARD(1, this.voData.sys);
	}
 
	private onClickGetAll(){
		if(Model_player.voMine.yuanbao < this.yuanbao){
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelwelfare.CG_APPLY_GETREWARD(2, this.voData.sys);
	}
}