class ViewGridRender extends fairygui.GComponent {

	public grid: ViewGrid;
	public lbName: fairygui.GTextField;
	public extraImg: fairygui.GLoader;

	public static URL: string = "ui://jvxpx9emetorn";

	public static createInstance(): ViewGridRender {
		return <ViewGridRender><any>(fairygui.UIPackage.createObject("common", "ViewGridRender"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.lbName = <fairygui.GTextField><any>(this.getChild("lbName"));
		this.extraImg = <fairygui.GLoader><any>(this.getChild("extraImg"));
	}

	set vo(v: IGridImpl) {
		this.grid.vo = v;
		if (v != null) {
			if (v.gType == Enum_Attr.ITEM) {
				var voi: VoItem = v as VoItem;
				this.lbName.text = voi.name;
				this.showNotice = (voi.canUse && this.grid.gridSource == 2 && Model_Bag.secCheckBag(voi));
				if(this.showNotice){
					if(voi.tz == UIConst.TUJIAN){//图鉴
						this.showNotice = Model_TuJian.checkItemVo(voi)
					}
				}
				this.lbName.color = voi.qColor;
			} else if (v.gType == Enum_Attr.EQUIP) {
				var voe: VoEquip = v as VoEquip;
				this.lbName.text = voe.gridName;
				this.lbName.color = voe.qColor;
			} else {
				var voc: Vo_Currency = v as Vo_Currency;
				this.lbName.text = voc.name;
				this.lbName.color = voc.qColor;
			}
			this.grid.tipEnabled = this.tipEnabled;
			//显示特效
			this.grid.showEff(v.showEffect);


			this.lbNum.visible = false;
			if (v.count > 1) {
				this.lbNum.visible = true;
				this.lbNum.text = ConfigHelp.numToStr(v.count);
			}
			this.isShowExtra(v.extra)
		} else {
			this.lbName.text = "";
			this.lbNum.visible = false;
			this.grid.tipEnabled = false;
			this.grid.showEff(false);
		}
	}

	public tipEnabled: boolean = true;

	get vo(): IGridImpl {
		if (this.grid) {
			return this.grid.vo;
		}
		return null;
	}

	protected dataChanged(): void {
		var d: Object = this.data;
	}

	get lbNum(): fairygui.GTextField {
		if (this.grid) {
			return this.grid.lbNum;
		}
		return null;
	}

	public set choose(value: boolean) {
		this.grid.choose = value;
	}

	public set isinsert(value: boolean) {
		this.grid.isinsert = value;
	}

	_showNotice: boolean;
	set showNotice(val: boolean) {
		this.grid.checkNotice = val;
		this._showNotice = val;
	}

	get showNotice(): boolean {
		return this._showNotice;
	}
	//选中
	set selected(v) {
		this.grid.selectImg.visible = v;
	}
	get selected() {
		return this.grid.selectImg.visible
	}

	/**是否显示额外奖励 */
	public isShowExtra(value) {
		this.extraImg.visible = true;
		switch(value) {
			case 0:
				this.extraImg.visible = false;
				break;
			case 1:
				this.extraImg.url = "ui://jvxpx9emrxjy3dl";//额外
				break;
			case 2:
				this.extraImg.url = "ui://jvxpx9emik2r3dt";//首通
				break;
			case 3:
				this.extraImg.url = "ui://jvxpx9emik2r3du";//协助
				break;
			case 4:
				this.extraImg.url = "ui://jvxpx9emdr4r3fv";//双倍
				break;
			case 5:
				this.extraImg.url = "ui://jvxpx9emc6yy3dg";//大奖
				break;
			case 6:
				this.extraImg.url = "ui://jvxpx9emgit23fx";//满员
				break;	
			default:
				this.extraImg.visible = false;
				break;
		}
	}

	extra: any

	public clean(): void {
		super.clean();
		this.grid.clean();
	}

	public setGrayBg(icon):void{
		this.grid.setGrayBg(icon);
	}
}