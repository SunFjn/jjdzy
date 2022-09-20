class VPeacockPly extends fairygui.GComponent {

	public imgPass:fairygui.GImage;
	public lblayer:fairygui.GTextField;

	public static URL:string = "ui://pkuzcu87m1lm32";

	private awatar: UIRole = null;

	public static createInstance():VPeacockPly {
		return <VPeacockPly><any>(fairygui.UIPackage.createObject("FuBen","VPeacockPly"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.imgPass = <fairygui.GImage><any>(this.getChild("imgPass"));
		this.lblayer = <fairygui.GTextField><any>(this.getChild("lblayer"));

		this.addClickListener(this.onClick, this);
	}

	private _layer;
	public set vo(v:number){
		this._layer = v;
		let cfg = Config.tower_219[v]
		if(!cfg)return;
		let arr = ConfigHelp.SplitStr(cfg.boss);
		let bossId = Number(arr[0][0]);

		if (!this.awatar) {
			this.awatar = UIRole.create();
			this.awatar.setPos(this.imgPass.width / 2, this.imgPass.height + 20);
			this.awatar.setScaleXY(1, 1);
		}

		let boss = Config.NPC_200[bossId]
		this.awatar.setBody(boss.mod);
		if (boss.weapon) {
			this.awatar.setWeapon(boss.mod);
		} else {
			this.awatar.setWeapon(null);
		}
		this.awatar.uiparent = this.displayListContainer;
		this.awatar.onAdd();
		this.addChild(this.imgPass);
		this.lblayer.text = v + "层"

		var curLayer = Model_Peacock.curLayer + 1;
		if(v < curLayer){
			this.imgPass.visible = true;
		}else{
			this.imgPass.visible = false;
		}
	}

	public removeListen(): void {
		if (this.awatar) {
			this.awatar.onRemove();
			this.awatar = null;
		}
	}

	private onClick(e){
		var curLayer = Model_Peacock.curLayer + 1;
		if(this._layer < curLayer){
			ViewCommonWarn.text("已通关")
			return;
		}else if(this._layer > curLayer){
			ViewCommonWarn.text("请先挑战上一层")
			return;
		}
		GGlobal.modelPeacock.CG_UPTOWER();
	}
}