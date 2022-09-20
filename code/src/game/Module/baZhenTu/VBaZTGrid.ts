class VBaZTGrid extends fairygui.GComponent {

	public bg:fairygui.GLoader;
	public imgIcon:fairygui.GLoader;
	public starLb:fairygui.GRichTextField;
	public starGroup:fairygui.GGroup;

	public static URL:string = "ui://xrzn9ppaf8nk4";

	public static createInstance():VBaZTGrid {
		return <VBaZTGrid><any>(fairygui.UIPackage.createObject("baZhenTu","VBaZTGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		let s = this;
		CommonManager.parseChildren(s, s)
	}

	private _vo:VoBaZhenTu;
	public set vo(v:VoBaZhenTu){
		this._vo = v
		if(v && v.id > 0){
			this.starLb.text = v.starLv + ""
			this.starGroup.visible = true;
			ImageLoader.instance.loader(Enum_Path.BAZHENTU_URL + v.icon + ".png", this.imgIcon);
			this.imgIcon.visible = true;
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + v.pz + ".png", this.bg);
			this.showEff(this.isShowEff);
		}else{
			this.starLb.text = "";
			this.starGroup.visible = false;
			this.imgIcon.visible = false;
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", this.bg);
			this.showEff(false);
		}
	}
	public get vo():VoBaZhenTu{
		return this._vo;
	}
	private _temp:Ibztzf_261;
	public setTemp(v:Ibztzf_261){
		this._temp = v;
		if(v){
			ImageLoader.instance.loader(Enum_Path.BAZHENTU_URL + v.icon + ".png", this.imgIcon);
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + v.pz + ".png", this.bg);
			this.imgIcon.visible = true;
			this.starLb.text = 1 + "";
			this.showEffTemp(this.isShowEff)
		}else{
			ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", this.bg);
			this.imgIcon.visible = false;
			this.starLb.text = "";
			this.showEffTemp(false)
		}
	}
	public isShowEff: boolean = false;
	public set tipEnable(bo){
		if (bo) {
			this.addClickListener(this.onTips, this);
		} else {
			this.removeClickListener(this.onTips, this);
		}
	}

	private onTips(){
		if(this._vo && this._vo.id > 0){
			GGlobal.layerMgr.open(UIConst.TIP_BAZHENTU_ITEM, this._vo)
		}
	}

	private effPart: Part;
	public showEff(v: boolean): void {
		if (v && this.vo && this.vo.id > 0) {
			this._temp = this.vo.cfg
			this.showEffTemp(v)
		} else {
			if (this.effPart) {
				EffectMgr.instance.removeEff(this.effPart);
				this.effPart = null;
			}
		}
	}

	private showEffTemp(v:boolean){
		if (v && this._temp && this._temp.pz >= 5) {
			if (this.effPart) {
				EffectMgr.instance.removeEff(this.effPart);
				this.effPart = null;
			}
			if (this.effPart == null) {
				var idx = 0;
				if (this._temp.pz >= 8) {
					idx = 10055;
				} else {
					idx = 10001 + (this._temp.pz - 5);
					idx = idx > 10002 ? 10002 : idx;
				}
				this.effPart = EffectMgr.addEff("uieff/" + idx, this.displayListContainer, this.width / 2 + 3, this.height / 2 - 1, 800, -1);
			}
		} else {
			if (this.effPart) {
				EffectMgr.instance.removeEff(this.effPart);
				this.effPart = null;
			}
		}
	}

	public clean(){
		super.clean();
		this.showEff(false);
		this.removeClickListener(this.onTips, this);
	}
}