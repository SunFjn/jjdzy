class RewardBack extends fairygui.GComponent {

	public getAll:fairygui.GButton;
	public lbYB:fairygui.GRichTextField;
	public list:fairygui.GList;
	public image : fairygui.GLoader;
	public n111 : fairygui.GLoader;
	public desc : fairygui.GTextField;

	public static URL:string = "ui://ye1luhg3o9c217";

	private VOData : RewardBackItemVO[]; 

	private yuanbao : number;

	public static createInstance():RewardBack {
		return <RewardBack><any>(fairygui.UIPackage.createObject("Welfare","RewardBack"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.list.setVirtual();
		self.list.callbackThisObj = self;
		self.list.itemRenderer = self.itemRenderer;

		self.getAll.addClickListener(self.onClickGetAll, self);
	}

	private onClickGetAll(){
		if(this.VOData.length == 0){ 
			ViewCommonWarn.text("没有可找回的奖励"); 
			return; 
		} else if(this.lbYB.text == '0'){
			ViewCommonWarn.text("已找回所有奖励");
			return;
		} else if(Model_player.voMine.yuanbao < this.yuanbao){
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelwelfare.CG_APPLY_GETREWARD(3, 0);
	} 

	private itemRenderer(index : number, item : RewardBackItem){
		item.setData(this.VOData[index]);
	}

	public show(){ 
		let self = this;
		GGlobal.control.listen(Enum_MsgType.REWARDBACK, self.setList, self);
		GGlobal.control.listen(Enum_MsgType.REWARDBACKITEM, self.updateList, self);
		GGlobal.modelwelfare.CG_OPEN_REWARDBACK();
		self.setState(true);
		IconUtil.setImg(self.n111, Enum_Path.BACK_URL+"backawards.jpg");
		IconUtil.setImg(self.image, Enum_Path.BACK_URL+"caocao.png");
	} 

	private setState(state : boolean){
		this.list.visible = state;
		this.image.visible = !state;
		this.desc.visible = !state;
	}

	private updateList(arg){  
		let self = this;
		if(arg.id == 0 && arg.type == 3){ 
			for(let i = 0;i < self.VOData.length; i++){
				self.VOData[i].state = 2;
			}
			self.lbYB.text = "0";
			GGlobal.mainUICtr.removeReportBTN(UIConst.REWARD_BACK);
			GGlobal.reddot.setCondition(UIConst.REWARD_BACK, 0, false);
		} else { 
			for(let i = 0;i < self.VOData.length; i++){ 
				let vo = self.VOData[i];
				if(arg.id == vo.sys){
					self.VOData[i].state = 2;
					self.yuanbao = self.yuanbao - self.VOData[i].conmuse1; 
					self.setlbYB(self.yuanbao);
					break;  
				} 
			}
			for(let i = 0; i < self.VOData.length; ++i){
				let state = self.VOData[i].state == 1;
				GGlobal.reddot.setCondition(UIConst.REWARD_BACK, 0, state);
				if(state){
					break;
				}
			}
		} 
		//如果没有红点了，移除战斗界面的找字
		if(!GGlobal.reddot.checkCondition(UIConst.REWARD_BACK, 0)){
			GGlobal.mainUICtr.removeReportBTN(UIConst.REWARD_BACK);
		}
		self.VOData.sort(function (a, b) { return a.sortIndex() < b.sortIndex() ? -1 : 1; }); 
		GGlobal.reddot.notify(UIConst.WELFARE);
		self.list.numItems = self.VOData.length;
	} 
  
	private setList(arg){ 
		let self = this;
		self.list.numItems = 0;
		self.VOData = arg.rewardVO 
		self.yuanbao = arg.all;
		//this.lbYB.text = this.yuanbao + ""; 
		self.setlbYB(self.yuanbao);
		self.VOData.sort(function (a, b) { return a.sortIndex() < b.sortIndex() ? -1 : 1; });
		self.list.numItems = self.VOData.length;
		self.image.visible = self.desc.visible = self.VOData.length == 0;
	//	this.list.visible = this.VOData.length == 0;
	}
 
	public clean(){ 
		IconUtil.setImg(this.n111, null);
		IconUtil.setImg(this.image, null);
		GGlobal.control.remove(Enum_MsgType.REWARDBACK, this.setList);
		GGlobal.control.remove(Enum_MsgType.REWARDBACKITEM, this.updateList);
		this.list.numItems = 0;
		this.VOData = [];
	}
 
	public setlbYB(amount : number){ 
		let ret : boolean = Model_player.voMine.yuanbao < amount;	
		if(ret){//不能购买,显示红色
			this.lbYB.text = "[color=#ff0000]" + ConfigHelp.getYiWanText(amount) + "[/color]"
		} else {
			this.lbYB.text = ConfigHelp.getYiWanText(amount) + "";
		}
	}
}