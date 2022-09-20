/**
 * 连充豪礼item
 */
class WSZW_LianChong_Item extends fairygui.GComponent {
	public lab: fairygui.GRichTextField;
	public btnGet: Button1;
	public btnRec: Button1;
	public imgGet: fairygui.GImage;
	public list: fairygui.GList;
	private _vo: Vo_HuoDong;
	private _status: number;
	private _listData: Array<IGridImpl>;
	private _hid: number;
	private _cfg: Ilxcz_764 | Ilchl_756;
	private _index: number = 0;

	public static URL: string = "ui://niyo89miq6qw2";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	public clean(){
		this.list.numItems = 0;
	}

	public setVo(v: Vo_HuoDong, hid: number, index: number) {
		let self = this;
		self._vo = v;
		self._hid = hid;
		if (self._hid == UIConst.WSZW_LIANCHONGHAOLI) {
			self._cfg = Config.lchl_756[self._vo.id];
			let day: number = 0;
			if (index == 0) {
				day = Model_WanShouZhiWang.days[0];
			} else if (index == 1) {
				day = Model_WanShouZhiWang.days[1];
			} else {
				day = Model_WanShouZhiWang.days[2];
			}
			self._index = index;
			self._status = v ? v.status : 0;
			var colorStr = day >= self._cfg.tianshu ? Color.GREENSTR : Color.REDSTR;
			self.lab.text = "累计" + self._cfg.tianshu + "天充值满" + self._cfg.rmb + "元" + HtmlUtil.fontNoSize("（" + day + "/" + self._cfg.tianshu + "）", colorStr);
		} else if (self._hid == UIConst.XINHD_LXCZ) {
			self._cfg = Config.lxcz_764[self._vo.id];
			let day: number = 0;
			if (index == 0) {
				day = Model_WanShouZhiWang.days[0];
			} else if (index == 1) {
				day = Model_WanShouZhiWang.days[1];
			} else {
				day = Model_WanShouZhiWang.days[2];
			}
			self._index = index;
			self._status = v ? v.status : 0;
			var colorStr = day >= self._cfg.tianshu ? Color.GREENSTR : Color.REDSTR;
			self.lab.text = "累计" + self._cfg.tianshu + "天充值满" + self._cfg.rmb + "元" + HtmlUtil.fontNoSize("（" + day + "/" + self._cfg.tianshu + "）", colorStr);
		}

		if (self._status == 0) {//前往充值
			self.btnGet.touchable = self.btnGet.visible = false;
			self.btnRec.touchable = self.btnRec.visible = true;
			self.imgGet.visible = false
		} else if (self._status == 1) {//领取
			self.btnGet.checkNotice = self.btnGet.touchable = self.btnGet.visible = true;
			self.btnRec.touchable = self.btnRec.visible = false;
			self.imgGet.visible = false
		} else if (self._status == 2) {//已领取
			self.btnGet.touchable = self.btnGet.visible = false;
			self.btnRec.touchable = self.btnRec.visible = false;
			self.imgGet.visible = true
		} else {
			self.btnGet.touchable = self.btnGet.visible = false;
			self.btnRec.touchable = self.btnRec.visible = false;
			self.imgGet.visible = false
		}
		self._listData = null;
		//奖励显示
		self._listData = ConfigHelp.makeItemListArr(self._cfg.jiangli);
		self.list.numItems = self._listData ? self._listData.length : 0;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	private onClickGet(): void {
		if (this._status == 0) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}
		if (this._hid == UIConst.WSZW_LIANCHONGHAOLI) {
			GGlobal.modelWanShouZhiWang.CG_LIANCHONG_GETAWARD(this._vo.id, this._index);
		} else if (this._hid == UIConst.XINHD_LXCZ) {
			GGlobal.modelWanShouZhiWang.CG_GETAWARD10201(this._vo.id, this._index);
		}
	}

	private onClickRec(): void {
		ViewChongZhi.tryToOpenCZ();
	}
}