/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class ViewCityInfo extends UIModalPanel {
	public c1: fairygui.Controller;
	public frame: fairygui.GComponent;
	public n11: fairygui.GImage;
	public n10: fairygui.GLoader;
	public n14: ViewGrid;
	public n15: ViewGrid;
	public n16: ViewGrid;
	public n19: fairygui.GImage;
	public n17: fairygui.GImage;
	public n21: fairygui.GLoader;
	public lb1: fairygui.GTextField;
	public lbMember: fairygui.GTextField;
	public lbTime: fairygui.GTextField;
	public n22: fairygui.GTextField;
	public n25: fairygui.GImage;
	public n30: fairygui.GImage;
	public n26: fairygui.GTextField;
	public barHp: fairygui.GProgressBar;
	public imgHead: fairygui.GLoader;
	public imgHeadGird: fairygui.GLoader;
	public n29: fairygui.GImage;
	public lbPlayerName: fairygui.GTextField;
	public lbPower: fairygui.GTextField;
	public groupOwner: fairygui.GGroup;
	public lbCity: fairygui.GTextField;
	public n34: fairygui.GLoader;
	public n40: fairygui.GImage;
	public n36: fairygui.GList;
	public memberGroup: fairygui.GGroup;
	public n41: fairygui.GImage;
	public lbtitle: fairygui.GTextField;
	public lb2: fairygui.GTextField;
	public n44: ViewGrid;
	public n46: ViewGrid;
	public n47: ViewGrid;
	public n48: ViewGrid;

	public static URL: string = "ui://edvdots4srrs9";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		GGlobal.createPack("FengHuoLY");
		let sf = this;
		sf.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewCityInfo").asCom;
		sf.contentPane = sf.view;
		CommonManager.parseChildren(sf.view, sf);
		sf.groupOwner.visible = false;
		sf.memberGroup.visible = false;

		sf.n36.callbackThisObj = sf;
		sf.n36.itemRenderer = sf.listRender;

		sf.barHp.max = 100;
		sf.grids = [sf.n14, sf.n15, sf.n16];
		sf.gridsLeft = [sf.n44, sf.n46];
		sf.gridsRight = [sf.n47, sf.n48];
		super.childrenCreated();
	}

	private listRender(idx, obj) {
		let item: FengHuoLstIt = obj as FengHuoLstIt;
		item.setdate(this.nowOccupier[idx], this._vo.camp);
	}

	private grids: ViewGrid[] = [];
	private gridsLeft: ViewGrid[] = [];
	private gridsRight: ViewGrid[] = [];
	private initUI() {
		let sf = this;
		let id = Number(sf._args);
		let cfg = Config.fhly_254[id];
		IconUtil.setImg(sf.n10, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/city" + cfg.type + ".png");
		if (!sf.isInit) return;

		sf.lbCity.text = ModelFengHuoLY.CITYNAME[cfg.type];
		sf.lbCity.color = ModelFengHuoLY.CITYNAMECOLOR[cfg.type];
		sf.lbTime.text = "征收时长：" + cfg.time + "s";

		let type = cfg.type;
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
		let vojifen = ConfigHelp.makeItem([1, 12, cfg.potion]);
		arr.push(vojifen);
		if (type == 3) {
			sf.c1.setSelectedIndex(0);
			for (let i = 0; i < 3; i++) {
				if (arr[i]) {
					sf.grids[i].vo = arr[i];
					sf.grids[i].showEff(true);
					sf.grids[i].tipEnabled = true;
					sf.grids[i].visible = true;
				} else {
					sf.grids[i].visible = false;
				}
			}
		} else {
			sf.c1.setSelectedIndex(1);
			let arr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
			let vojifen1 = ConfigHelp.makeItem([1, 12, cfg.potion1]);
			arr1.push(vojifen1);
			for (let i = 0; i < 2; i++) {
				sf.gridsLeft[i].vo = arr1[i];
				sf.gridsLeft[i].showEff(true);
				sf.gridsLeft[i].tipEnabled = true;

				sf.gridsRight[i].vo = arr[i];
				sf.gridsRight[i].showEff(true);
				sf.gridsRight[i].tipEnabled = true;
			}
		}
	}

	private _vo;
	private updateUI() {
		let sf = this;
		let m = GGlobal.modelFengHuoLY;
		let vo = m.getCity(m.checkID);
		sf._vo = vo;
		sf.lbMember.text = "当前征收人数：" + vo.hasTakeCount + "/" + vo.maxTakeCount;
		if (vo.owerID > 0) {
			sf.n22.text = "";
			sf.groupOwner.visible = true;
			sf.barHp.value = vo.hp;
			sf.lbPlayerName.text = vo.ower;
			sf.lbPower.text = "战力：" + vo.power;
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(vo.head), sf.imgHead);
			ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(vo.headGrid), sf.imgHeadGird);
		} else {
			if (vo && vo.cfg.type == 3) {
				sf.n22.text = "不可占领";
				sf.n22.color = 0xfe0000;
			} else {
				sf.n22.text = "无人占领";
				sf.n22.color = 0xffffff;
			}
			sf.groupOwner.visible = false;
		}
	}

	private nowOccupier = [];
	private setOCcupier(data) {
		let sf = this;

		sf.nowOccupier = data;
		let len = data.length;
		sf.n36.numItems = len;
		len = len == 0 ? 1 : len;
		sf.n40.height = 30 * len;
	}

	private getOccupiers() {
		this.memberGroup.visible = !this.memberGroup.visible;
		GGlobal.modelFengHuoLY.CG_CHECK_3577(this._vo.id);
	}

	protected onShown() {
		let sf = this;
		sf.initUI();
		sf.n34.addClickListener(sf.getOccupiers, sf);
		GGlobal.control.listen(Enum_MsgType.FHLY_CHECKCITY, sf.updateUI, sf);
		GGlobal.control.listen(Enum_MsgType.FHLY_CITY_PEOPLE, sf.setOCcupier, sf);
		IconUtil.setImg(sf.n21, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/quan.png");
	}

	protected onHide() {
		let sf = this;
		for (let i = 0; i < 3; i++) {
			sf.grids[i].showEff(false);
		}
		for (let i = 0; i < 2; i++) {
			sf.gridsLeft[i].showEff(false);
			sf.gridsRight[i].showEff(false);
		}
		sf.memberGroup.visible = false;
		sf.n34.removeClickListener(sf.getOccupiers, sf);
		GGlobal.control.remove(Enum_MsgType.FHLY_CITY_PEOPLE, sf.setOCcupier, sf);
		GGlobal.control.remove(Enum_MsgType.FHLY_CHECKCITY, sf.updateUI, sf);
		GGlobal.layerMgr.close(UIConst.FHLY_INFO);
		IconUtil.setImg(sf.n10, null);
		IconUtil.setImg(sf.n21, null);
		sf.n36.numItems = 0;
	}
}