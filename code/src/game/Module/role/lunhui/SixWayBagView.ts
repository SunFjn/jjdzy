/**
 * 六道印记背包
 */
class SixWayBagView extends UIPanelBase{
	public list: fairygui.GList;
	public BtnGo: fairygui.GButton;
	public labT: fairygui.GLabel;
	public lbTip: fairygui.GTextField;
	public vEqu: SixWayBagItem;

	private _equipPos:number = 0;
	private _showArr: VoSixWay[];

	public static URL: string = "ui://ehelf5bh11m1wx";

	public static createInstance(): SixWayBagView {
		return <SixWayBagView><any>(fairygui.UIPackage.createObject("lunhui", "SixWayBagView"));
	}

	public constructor() {
		super();
		this.setSkin("lunhui", "lunhui_atlas0", "SixWayBagView");
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	protected initView(): void {
		super.initView();

		let s = this;
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandler;
		s.list.setVirtual();
	}

	protected onShown(): void {
		this._equipPos = this._args;

		this.addListen();
		this.update();
	}

	protected onHide(): void {
		let s = this;
		s.removeListen();
		// GGlobal.layerMgr.close(UIConst.SIXWAY_BAG);
		s.list.numItems = 0;
		GGlobal.layerMgr.open(UIConst.SIXWAY_YINJI, Model_LunHui.type);
	}

	private addListen(): void {
		GGlobal.control.listen(Model_LunHui.UP_LEVEL, this.update, this);
		this.BtnGo.addClickListener(this.onGo, this);
	}

	private removeListen(): void {
		// this.vEqu.grid.showEff(false);
		GGlobal.control.remove(Model_LunHui.UP_LEVEL, this.update, this);
		this.BtnGo.removeClickListener(this.onGo, this);
	}

	private update() {
		let s = this;
		let modellh = GGlobal.modellh;
		s._showArr = [];
		let len = Model_LunHui.bagArr.length;
		let arr1 = [];//红点替换
		let arr2 = [];//无
		let equip = modellh.equipArr[s._equipPos];
		// let typeArr = {};
		// for (let j = 0; j < modellh.equipArr.length; j++) {
		// 	let eq = modellh.equipArr[j];
		// 	if (!eq || eq.id == 0) continue;
		// 	typeArr[eq.type] = true;
		// }

		for (let i = 0; i < Model_LunHui.bagArr.length; i++) {
			let v = Model_LunHui.bagArr[i];
			if (v == null || v.type == 0) {
				continue;
			}
			if (equip == null || equip.id == 0) {//没装备
				if (v.type == s._equipPos) {//同类型
					arr1.push(v)
				}
			} else {//有装备
				if (v.power > equip.power) {
					if (v.type == equip.type) {
						arr1.push(v)
					}
				} else {
					if (v.type == equip.type) {
						arr2.push(v)
					}
				}
			}
		}
		arr1.sort(s.sortFunc);
		arr2.sort(s.sortFunc);
		s._showArr = arr1.concat(arr2);
		len = s._showArr.length;
		s.list.numItems = len;
		s.BtnGo.visible = true;
		if (len > 0) {
			s.list.scrollToView(0);
			s.BtnGo.visible = false;
		}
		s.vEqu.grid.isShowEff = true;
		s.vEqu.setEqu(modellh.equipArr[s._equipPos], s._equipPos);
	}

	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as SixWayBagItem;
		grid.grid.isShowEff = true;
		grid.setBag(this._showArr[index], this._equipPos);
	}

	private sortFunc(a: VoSixWay, b: VoSixWay) {
		if (a.pz != b.pz) {
			return b.pz - a.pz;
		}
		if (a.star != b.star) {
			return b.star - a.star;
		}
		if (a.lv != b.lv) {
			return b.lv - a.lv;
		}
		return b.id - a.id;
	}

	private onGo() {
		let s = this;
		GGlobal.layerMgr.open(UIConst.LHFB);
		s.closeEventHandler(null);
	}

}