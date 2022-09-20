class View_Rebirth_DS extends UIModalPanel {

	public c1:fairygui.Controller;
	public upgradeBt:Button0;
	public suitLb:fairygui.GRichTextField;
	public powerLb:fairygui.GRichTextField;
	public nextLb:fairygui.GRichTextField;
	public nextAttLb:fairygui.GRichTextField;
	public curLb:fairygui.GRichTextField;
	public curAttLb:fairygui.GRichTextField;


	public static URL:string = "ui://3tzqotadpwxe43";

	public static createInstance():View_Rebirth_DS {
		return <View_Rebirth_DS><any>(fairygui.UIPackage.createObject("role","View_Rebirth_DS"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("role");
		this.view = fairygui.UIPackage.createObject("role", "View_Rebirth_DS").asCom;
		this.contentPane = this.view;
		
		this.c1 = this.view.getController("c1");
		this.upgradeBt = <Button0><any>(this.view.getChild("upgradeBt"));
		this.suitLb = <fairygui.GRichTextField><any>(this.view.getChild("suitLb"));
		this.powerLb = <fairygui.GRichTextField><any>(this.view.getChild("powerLb"));
		this.nextLb = <fairygui.GRichTextField><any>(this.view.getChild("nextLb"));
		this.nextAttLb = <fairygui.GRichTextField><any>(this.view.getChild("nextAttLb"));
		this.curLb = <fairygui.GRichTextField><any>(this.view.getChild("curLb"));
		this.curAttLb = <fairygui.GRichTextField><any>(this.view.getChild("curAttLb"));
		super.childrenCreated();
		this.nextAttLb.leading = 6;
		this.curAttLb.leading = 6;
	}

	protected onShown(): void {
		var a = this;
		a.upgradeBt.addClickListener(a.upHandle, a);
		GGlobal.control.listen(Enum_MsgType.REBIRTH_EQUIP_UPDATA, this.updateShow, this);
		this.updateShow();
	}

	protected onHide(): void {
		super.onHide()
		GGlobal.layerMgr.close(UIConst.VIEW_REBIRTH_DS);
		GGlobal.control.remove(Enum_MsgType.REBIRTH_EQUIP_UPDATA, this.updateShow, this);
	}

	private upHandle(): void {
		let lv: number = Model_Equip.lhLevel;
		let arr = Model_Equip.lhArr;
		var nextCfg = Config.zhuanshenglhds_256[lv + 1];
		if(!nextCfg){
			ViewCommonWarn.text("已满级");
			return;
		}
		var boo = true;
		for(let i = 0; i < arr.length; i++){
			if(arr[i].lv < nextCfg.lv){
				boo = false;
				break;
			}
		}
		if(!boo){
			ViewCommonWarn.text("未达到条件，不能进阶");
			return;
		}
		GGlobal.modelEquip.addLHDaShiLv();
	}

	private cfg: any;
	public updateShow(): void {
		let a = this;

		let lv: number = Model_Equip.lhLevel;
		a.suitLb.text = "转生大师"+lv+"阶";
		
		let arr = Model_Equip.lhArr;
		var curCfg = Config.zhuanshenglhds_256[lv];
		a.powerLb.text = "战力 +" + curCfg.fight
		var nextCfg = Config.zhuanshenglhds_256[lv + 1];
		if(!nextCfg){//已满级
			a.c1.selectedIndex = 2;
		}
		else if(lv == 0){
			a.c1.selectedIndex = 0;
		}else{
			a.c1.selectedIndex = 1;
		}
		if(curCfg){
			a.curLb.text = "[color=#FFC334]当前阶段[/color]  全身炼魂+"+curCfg.lv+" [color=#16f60b](已激活)[/color]"
			a.curAttLb.text = ConfigHelp.attrString(ConfigHelp.SplitStr(curCfg.attr),"+")
		}
		
		if(nextCfg){
			a.nextLb.text = "[color=#FFC334]下一阶段[/color]  全身炼魂+"+nextCfg.lv
			a.nextAttLb.text = ConfigHelp.attrString(ConfigHelp.SplitStr(nextCfg.attr),"+")
		}
		
		var boo = true;
		if(!nextCfg){
			boo = false;
		}else{
			for(let i = 0; i < arr.length; i++){
				if(arr[i].lv < nextCfg.lv){
					boo = false;
					break;
				}
			}
		}
		a.upgradeBt.enabled = a.upgradeBt.checkNotice = boo;
	}
}
