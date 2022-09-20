class SJKH_Item extends fairygui.GComponent {
	public btnGoLeft:fairygui.GButton;
	public ylq:fairygui.GImage;
	public btnLeft:fairygui.GButton;
	public btnGoRight:fairygui.GButton;
	public yqw:fairygui.GImage;
	public btnRight:fairygui.GButton;
	public ylq2:fairygui.GImage;
	// public grid:ViewGrid;
	// public grid_2:ViewGrid;
	// public grid_3:ViewGrid; 
	// public grid_4:ViewGrid;
	public des : fairygui.GTextField;
	public residue : fairygui.GTextField;
	public girdListLeft : fairygui.GList;
	public girdListRight : fairygui.GList;
	private leftRaward : any[];
	private rightRaward : any[];
	private noticeImgRight : fairygui.GImage;
	private noticeImgLeft : fairygui.GImage;

	private voData : Vo_KaiFuKH;
	public static URL:string = "ui://yk4rwc6rinpxl";

	public static createInstance():SJKH_Item {
		return <SJKH_Item><any>(fairygui.UIPackage.createObject("kaifukuanghuan","SJKH_Item"));
	}
 
	public constructor() {
		super();
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
	}
 
	private onRemove(){ 
		GGlobal.control.remove(Enum_MsgType.SJKHITEMREFRESH, this.update, this);
		this.displayObject.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
	} 
	private onAdd(){
		GGlobal.control.listen(Enum_MsgType.SJKHITEMREFRESH, this.update, this);
		this.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
	}
 
	private update(arg){
		////console.log("argragrga", arg);
		////console.log("this.voData.id", this.voData);
		if(this.voData.lib.id == arg.id){
			if(arg.type == 0){	//普通奖励 
				if(arg.state == 1){
					this.ylq.visible = true;
					this.btnGoLeft.visible = false;
					this.btnLeft.visible = false;
				}
				this.voData.reward = 2;
			} else {	//限量奖励
				if(arg.state == 1){
					this.ylq2.visible = true;
					this.yqw.visible = false; 
					this.voData.limitSt = 2;
				} else {
					this.ylq2.visible = false;
					this.yqw.visible = true;
					this.voData.limitSt = 3;
					this.voData.lastNum = arg.lastNum;
				}
				this.btnGoRight.visible = false;
				this.btnRight.visible = false;
				
				this.residue.text = "(" + arg.lastNum +"/" + this.voData.lib.sl + ")";
				//this.des.text = this.voData.lib.tips + "[color=#7bde2b](" + arg.lastNum + "/" + this.voData.lib.yq[0][1] + ")[/color]";
			}
		}
		GGlobal.control.notify(Enum_MsgType.SJKHREFRESHLIST, {data : this.voData});
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml); 
		this.btnGoLeft = <fairygui.GButton><any>(this.getChild("btnGoLeft"));
		this.btnGoLeft.addClickListener(this.onClickBtnGo, this);
		this.ylq = <fairygui.GImage><any>(this.getChild("ylq"));
		this.btnLeft = <fairygui.GButton><any>(this.getChild("btnLeft"));
		this.btnLeft.addClickListener(this.onClickBtnLeft, this);
		this.btnGoRight = <fairygui.GButton><any>(this.getChild("btnGoRight"));
		this.btnGoRight.addClickListener(this.onClickBtnGo, this);
		this.yqw = <fairygui.GImage><any>(this.getChild("yqw"));
		this.ylq2 = <fairygui.GImage><any>(this.getChild("ylq2"));
		this.btnRight = <fairygui.GButton><any>(this.getChild("btnRight"));
		this.btnRight.addClickListener(this.onClickBtnRight, this);
		// this.grid = <ViewGrid><any>(this.getChild("grid"));
		// this.grid_2 = <ViewGrid><any>(this.getChild("grid"));
		// this.grid_3 = <ViewGrid><any>(this.getChild("grid"));
		// this.grid_4 = <ViewGrid><any>(this.getChild("grid")); 
		this.des = <fairygui.GTextField><any>(this.getChild("des"));
		this.residue = <fairygui.GTextField><any>(this.getChild("residue"));
		this.girdListLeft = <fairygui.GList><any>(this.getChild("girdListLeft"))
		this.girdListRight = <fairygui.GList><any>(this.getChild("girdListRight"))
		this.noticeImgLeft = <fairygui.GImage><any>(this.getChild("noticeImgLeft"));
		this.noticeImgRight = <fairygui.GImage><any>(this.getChild("noticeImgRight"));


		this.girdListLeft.setVirtual();
		this.girdListLeft.itemRenderer = this.renderLeft;
		this.girdListRight.setVirtual();
		this.girdListRight.itemRenderer = this.renderRight;
		this.girdListLeft.callbackThisObj = this;
		this.girdListRight.callbackThisObj = this;
	}

	private onClickBtnGo(){
		GGlobal.layerMgr.open(this.voData.lib.sys);
	}
	private onClickBtnLeft(){
		if(this.voData.reward != 1){
			ViewCommonWarn.text("领取条件不足");
		} else {
			GGlobal.model_KaiFKH.CG_GETREWARD(this.voData.id, 0);
		}
	}
	private onClickBtnRight(){ 
		if(this.voData.limitSt != 1){
			ViewCommonWarn.text("领取条件不足");
		} else {
			GGlobal.model_KaiFKH.CG_GETREWARD(this.voData.id, 1);
		}
	}
	//灰色是 1，绿色 2， 蓝色 3， 紫色 4，橙色 5， 红色6
	// #7bde2b
	public setData(vo : Vo_KaiFuKH)
	{ 
		////console.log("VVOVOVOVOVO", vo);
		this.voData = vo;
		this.des.text = this.voData.lib.tips;
		this.leftRaward = ConfigHelp.makeItemListArr(JSON.parse(this.voData.lib.reward));
		this.rightRaward = ConfigHelp.makeItemListArr( JSON.parse(this.voData.lib.xl));
		this.girdListLeft.numItems = this.leftRaward.length;
		this.girdListRight.numItems = this.rightRaward.length;
		this.showTips();
	 }
	// /**限量奖励(特殊奖励)状态，0:未达到，1:可领取，2:已领取，3:已抢完 */
	// limitSt = 0;	//限量奖励
	// /**B:达标奖励状态，0:未达到，1:可领取，2:已领取 */ 
	// reward = 0;		//达标奖励 
	private showTips(){  
		let temp = 0;
		this.noticeImgLeft.visible = false;
		this.noticeImgRight.visible = false;
		let s : string = this.voData.lib.tips; 
		let st = s.split("总");
		if(st.length <= 1){ 
			temp = Model_WuJiang.getWUjiangStar(this.voData.lib.yq[0][0]).length; 
		} else {
			temp = Model_WuJiang.getAllWujiangStarByPinzhi(this.voData.lib.yq[0][0]); 
		}
		if((this.voData.reward == 1 || this.voData.reward == 2) && temp >= this.voData.lib.yq[0][1]){
			this.des.text = this.voData.lib.tips + "[color=#7bde2b]("+ temp + "/" + this.voData.lib.yq[0][1] + ")[/color]";
		} else {
			this.des.text = this.voData.lib.tips + "[color=#FF0000]("+ temp + "/" + this.voData.lib.yq[0][1] + ")[/color]"
		}
		if(this.voData.limitSt == 3){
			this.residue.color = 0xff0000;
		} else {
			this.residue.color = 0x7bde2b;
		}
		this.residue.visible = true;
		this.yqw.visible = true;
		this.residue.text = "还剩" + this.voData.lastNum + "个"//"(" + this.voData.lastNum +"/" + this.voData.lib.sl + ")";
		//前往按钮
		this.btnGoLeft.visible = this.voData.reward == 0;
		this.btnGoRight.visible = this.voData.limitSt == 0;
		//领取按钮
		this.btnLeft.visible = this.voData.reward == 1; 
		this.btnRight.visible = this.voData.limitSt == 1;
		//领取标识
		this.ylq.visible = this.voData.reward == 2;
		this.yqw.visible = this.voData.limitSt == 3;
		this.ylq2.visible = this.voData.limitSt == 2;
		//红点
		this.noticeImgLeft.visible = this.voData.reward == 1;
		this.noticeImgRight.visible = this.voData.limitSt == 1;
		
		if(this.voData.lastNum == 0){
			this.btnGoRight.visible = false;
			this.residue.visible = false;
			this.yqw.visible = true;
			this.btnRight.visible = false;
			this.noticeImgRight.visible = false;
		}
		if(this.voData.limitSt == 2){
			this.residue.visible = false;
			this.btnGoRight.visible = false;
			this.ylq2.visible = true;
			this.btnRight.visible = false;
			this.yqw.visible = false;
		}
	}

	public clean() {
		ConfigHelp.cleanGridview(this.girdListLeft);
		ConfigHelp.cleanGridview(this.girdListRight);
	}

	private renderLeft(index : number, item : ViewGrid)
	{
		let vo = this.leftRaward[index];
		item.vo = vo; 
		item.tipEnabled = true;
		item.isShowEff = true; 
	}
	private renderRight(index : number, item : ViewGrid)
	{
		let vo = this.rightRaward[index];
		item.vo = vo;
		item.tipEnabled = true;
		item.isShowEff = true;
	}
}