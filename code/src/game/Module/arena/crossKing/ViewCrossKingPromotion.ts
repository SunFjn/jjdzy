class ViewCrossKingPromotion extends UIModalPanel {

	public ply0:VCrossKingPly;
	public ply1:VCrossKingPly;
	public ply2:VCrossKingPly;
	public lbBattleCount:fairygui.GRichTextField;
	public btnAdd:fairygui.GButton;
	public lbChangeCost:fairygui.GRichTextField;
	public lbTitle:fairygui.GRichTextField;
	public lbTips:fairygui.GRichTextField;
	public btnChange:fairygui.GButton;
	public lbPromotion:fairygui.GRichTextField;
	public imgMax:fairygui.GImage;

	public static URL:string = "ui://me1skowlhfct3r";

	public static createInstance(): ViewCrossKingPromotion {
		return <ViewCrossKingPromotion><any>(fairygui.UIPackage.createObject("Arena", "ViewCrossKingPromotion"));
	}

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("Arena");
		this.view = fairygui.UIPackage.createObject("Arena", "ViewCrossKingPromotion").asCom;
		this.contentPane = this.view;

		this.ply0 = <VCrossKingPly><any>(this.view.getChild("ply0"));
		this.ply1 = <VCrossKingPly><any>(this.view.getChild("ply1"));
		this.ply2 = <VCrossKingPly><any>(this.view.getChild("ply2"));
		this.lbBattleCount = <fairygui.GRichTextField><any>(this.view.getChild("lbBattleCount"));
		this.btnAdd = <fairygui.GButton><any>(this.view.getChild("btnAdd"));
		this.lbChangeCost = <fairygui.GRichTextField><any>(this.view.getChild("lbChangeCost"));
		this.lbTitle = <fairygui.GRichTextField><any>(this.view.getChild("lbTitle"));
		this.lbTips = <fairygui.GRichTextField><any>(this.view.getChild("lbTips"));
		this.btnChange = <fairygui.GButton><any>(this.view.getChild("btnChange"));
		this.lbPromotion = <fairygui.GRichTextField><any>(this.view.getChild("lbPromotion"));
		this.imgMax = <fairygui.GImage><any>(this.view.getChild("imgMax"));
		super.childrenCreated();
	}
	public resetPosition(): void {
		this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, (fairygui.GRoot.inst.height - this.height) >> 1);
	}
	protected onShown(): void {
		this.addListen();
		this.update();
		GGlobal.modelCrossKing.CG_GET_JING_JI();
	}

	protected onHide(): void {
		this.removeListen();
	}

	private addListen(): void {
		this.btnChange.addClickListener(this.onChange, this);
		this.btnAdd.addClickListener(this.onAdd, this);
		GGlobal.control.listen(Enum_MsgType.CROSSKING_UP_PLY, this.update, this)
		GGlobal.control.listen(Enum_MsgType.CROSSKING_BUY_NUM, this.update, this)
	}

	private removeListen(): void {
		this.btnChange.removeClickListener(this.onChange, this);
		this.btnAdd.removeClickListener(this.onAdd, this);
		GGlobal.control.remove(Enum_MsgType.CROSSKING_UP_PLY, this.update, this)
		GGlobal.control.remove(Enum_MsgType.CROSSKING_BUY_NUM, this.update, this)
		GGlobal.layerMgr.close(UIConst.CROSS_KING_PROMOTE);
	}

	private update(): void {
		this.ply0.vo = Model_CrossKing.upPlyArr[0]
		this.ply0.type = 2
		this.ply1.vo = Model_CrossKing.upPlyArr[1]
		this.ply1.type = 2
		this.ply2.vo = Model_CrossKing.upPlyArr[2]
		this.ply2.type = 2

		var cfgGrade = Config.lsxx_232[Model_CrossKing.myGrade + 1]
		if(cfgGrade.dan >= 13){
			this.imgMax.visible = true
			this.lbPromotion.text = ""
		}else{
			this.imgMax.visible = false
			this.lbPromotion.text = "<font color=" + Color.getColorStr(cfgGrade.color) + ">" + cfgGrade.name + "</font>"
		}

		var BATTLE_MAX = ConfigHelp.getSystemNum(2205)
		var colorStr;
		if (Model_CrossKing.battleCount > 0) {
			colorStr = Color.GREENSTR;
		} else {
			colorStr = Color.REDSTR;
		}
		this.lbBattleCount.text = "挑战次数：" + "<font color='" + colorStr + "'>" + Model_CrossKing.battleCount + "/" + BATTLE_MAX + "</font>"

		var cost = ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(2206))[0][2]
		this.lbChangeCost.text = "" + cost
		if(Model_player.voMine.tongbi < Number(cost)){
			this.lbChangeCost.color = Color.REDINT;
		}else{
			this.lbChangeCost.color = Color.GREENINT;
		}
	}

	private onChange(): void {
		GGlobal.modelCrossKing.CG_CHANGE_RANKS(1)
	}

	private onAdd(): void {
		Model_CrossKing.onAdd();
	}
}