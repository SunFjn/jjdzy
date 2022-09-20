class ViewGrid extends fairygui.GComponent {

	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public lbNum: fairygui.GTextField;
	public equipLb: fairygui.GTextField;
	public noticeImg: fairygui.GImage;
	public selectImg: fairygui.GImage;
	public isinsertImg: fairygui.GImage;
	public chipImg: fairygui.GImage;
	public static URL: string = "ui://jvxpx9emetorm";

	public static createInstance(): ViewGrid {
		return <ViewGrid><any>(fairygui.UIPackage.createObject("common", "ViewGrid"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}


	public static create(): ViewGrid {
		return ViewGrid.createInstance()
	}


	private effPart: Part;
	public showEff(v: boolean): void {
		let self = this;
		if (v && self.vo && self.vo.showEffect) {
			if (self.effPart) {
				EffectMgr.instance.removeEff(self.effPart);
				self.effPart = null;
			}
			if (self.effPart == null) {
				var idx = 0;
				if (self.vo.quality >= 8) {
					idx = 10055;
				} else {
					idx = 10001 + (self.vo.quality - 5);
					idx = idx > 10002 ? 10002 : idx;
				}
				self.effPart = EffectMgr.addEff("uieff/" + idx, self.displayListContainer, self.width / 2, self.height / 2, 800, -1);
			}
		} else {
			if (self.effPart) {
				EffectMgr.instance.removeEff(self.effPart);
				self.effPart = null;
			}
		}
	}
	public setEffScale(value: number) {
		let self = this;
		if (self.effPart) {
			self.effPart.mc.scaleX = self.effPart.mc.scaleY = value;
		}
	}

	public isShowEff: boolean = false;
	public tipUse: boolean = false;//是否可以使用穿戴;
	/**设置是否显示tip */
	set tipEnabled(bo: boolean) {
		let self = this;
		if (bo) {
			self.addClickListener(self.onTips, self);
		} else {
			self.removeClickListener(self.onTips, self);
		}
	}

	private onTips(e: egret.TouchEvent): void {
		let self = this;
		if (!self._vo) {
			return;
		}
		FastAPI.showItemTips(self._vo, self.gridSource);
		e.stopImmediatePropagation();
		e.stopPropagation();
	}

	private _vo: IGridImpl;
	set vo(v: IGridImpl) {
		let self = this;
		self._vo = v;
		if (v) {
			IconUtil.setImg(self.imgIcon, Enum_Path.ICON70_URL + v.icon + ".png")
			// ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", self.imgIcon);
			self.imgIcon.visible = true;
			IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png")
			// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + v.quality + ".png", self.bg);
			if (v.count > 1) {
				self.lbNum.text = ConfigHelp.getYiWanText(v.count);
			} else {
				self.lbNum.text = "";
			}
			self.showEff(self.isShowEff);
			self.chipImg.visible = (v.gType == Enum_Attr.ITEM && (v as VoItem).type == 18);
			if (v.gType == Enum_Attr.EQUIP && (v as VoEquip).tips != "0") {
				self.equipLb.text = (v as VoEquip).tips;
				self.equipLb.visible = true;
			} else {
				self.equipLb.visible = false;
			}
		} else {
			IconUtil.setImg(self.imgIcon, null);
			// self.imgIcon.url = null;
			self.imgIcon.visible = false;
			IconUtil.setImg(self.bg, Enum_Path.ICON70_URL + "BmG_1.png");
			// ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_1.png", self.bg);
			self.lbNum.text = "";
			self.noticeImg.visible = false;
			self.chipImg.visible = false;
			self.equipLb.visible = false;
			self.showEff(false);
		}
	}

	get vo(): IGridImpl {
		return this._vo;
	}

	public set checkNotice(value: boolean) {
		this.noticeImg.visible = value;
	}

	public get checkNotice() {
		return this.noticeImg.visible;
	}

	public set choose(value: boolean) {
		this.selectImg.visible = value;
	}

	public set isinsert(value: boolean) {
		this.isinsertImg.visible = value;
	}

	/**缩放格子图片的大小 */
	set iconScale(v: number) {
		let self = this;
		if (self.group) {
			self.group.scaleX = self.group.scaleY = v;
			// var num = 64 * (1 - v);
			// self.lbNum.right = 3 + num/2;
		}
	}

	set showText(str: string) {
		this.lbNum.text = str;
	}

	static ROLE: number = 1;
	static BAG: number = 2;
	public gridSource: number = 0;//格子来源
	//是否需要回收
	public disposePanel() {
		this.clean();
	}

	public clean(): void {
		super.clean();
		let self = this;
		self.showEff(false);
		self.removeClickListener(self.onTips, self);
		self.gridSource = 0;
		self.checkNotice = false;
		self.choose = false;
		self.isinsert = false;
		self.chipImg.visible = false;

		IconUtil.setImg(self.imgIcon, null);
		IconUtil.setImg(self.bg, null);
	}

	public setGrayBg(icon): void {
		let self = this;
		ImageLoader.instance.loader(Enum_Path.ICON70_URL + "gray" + icon + ".png", self.imgIcon);
		self.imgIcon.visible = true;
	}
}
/**额外功能添加 */
class ExtralFunc {
	private static effDic = {};
	public static addBigAdEff(sysKey: string, target: fairygui.GObject, source: string = "uieff/10022", childIndex: number = -1) {
		let self = this;
		if (source == null) {
			if (self.effDic[sysKey]) {
				EffectMgr.instance.removeEff(self.effDic[sysKey]);
				self.effDic[sysKey] = null;
			}
		} else {
			if (!self.effDic[sysKey]) {
				var eff = self.effDic[sysKey] = EffectMgr.addEff(source, target.parent.displayListContainer, target.x + target.width / 2, target.y + target.height / 2, 800, -1);
				if (childIndex >= 0) {
					target.parent.displayListContainer.setChildIndex(eff.mc, childIndex);
				}
			}
		}
	}
}