/**
 * 矿藏item
 */
class MineralItem extends fairygui.GComponent {
	public refreshBtn: Button1;
	public mineInfoGroup: fairygui.GGroup;
	public noAssGroup: fairygui.GGroup;
	public txtGroup: fairygui.GGroup;
	private _select: boolean = false;
	public selectImg: fairygui.GImage;
	public typeIcon0: fairygui.GLoader;
	public typeIcon1: fairygui.GLoader;
	public mineIcon: fairygui.GLoader;
	public moneyLb0: fairygui.GRichTextField;
	public moneyLb1: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public nameIcon: fairygui.GLoader;
	public sourceLb: fairygui.GRichTextField;
	public numLb0: fairygui.GRichTextField;
	public numLb1: fairygui.GRichTextField;
	public c1: fairygui.Controller;

	public static URL: string = "ui://yqpfulefnyv753";

	public static createInstance(): MineralItem {
		return <MineralItem><any>(fairygui.UIPackage.createObject("crossKing", "MineralItem"));
	}

	public constructor(type: number) {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.refreshBtn.addClickListener(this.onRefresh, this);
	}

	public set select(bol: boolean) {
		this._select = bol;
		this.selectImg.visible = bol;
	}

	public removeListen(): void {
		this.refreshBtn.removeClickListener(this.onRefresh, this);
	}

	public vo: Vo_MineData;
	/**
	 * 更新信息
	 */
	public updateInfo(vo: Vo_MineData) {
		let self = this;
		self.vo = vo;
		if (!vo) {
			self.c1.selectedIndex = 2;
		} else {
			let cfg = vo.cfg;
			if (vo.mineID == Model_player.voMine.id) {
				self.c1.selectedIndex = 0;
			} else {
				self.c1.selectedIndex = 1;
			}
			self.nameIcon.url = CommonManager.getUrl("crossKing", "k" + vo.cfg.pz);
			if (vo.itemArr.length > 0) {
				let itemVo0 = ConfigHelp.makeItem(vo.itemArr[0]);
				let itemVo1 = ConfigHelp.makeItem(vo.itemArr[1]);
				IconUtil.setImg(self.typeIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
				IconUtil.setImg(self.typeIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
				if (vo.itemArr[0][3] > 0) {
					self.moneyLb0.text = itemVo0.count + HtmlUtil.fontNoSize("(-" + vo.itemArr[0][3] + ")", Color.getColorStr(6));
				} else {
					self.moneyLb0.text = itemVo0.count + "";
				}
				if (vo.itemArr[1][3] > 0) {
					self.moneyLb1.text = itemVo1.count + HtmlUtil.fontNoSize("(-" + vo.itemArr[1][3] + ")", Color.getColorStr(6));
				} else {
					self.moneyLb1.text = itemVo1.count + "";
				}
			} else {
				let arr = vo.mineID == Model_player.voMine.id ? JSON.parse(cfg.max1) : JSON.parse(cfg.max2);
				let itemVo0 = ConfigHelp.makeItem(arr[0]);
				let itemVo1 = ConfigHelp.makeItem(arr[1]);
				IconUtil.setImg(self.typeIcon0, Enum_Path.ICON70_URL + itemVo0.icon + ".png");
				IconUtil.setImg(self.typeIcon1, Enum_Path.ICON70_URL + itemVo1.icon + ".png");
				self.moneyLb0.text = itemVo0.count + "";
				self.moneyLb1.text = itemVo1.count + "";
			}
			self.numLb0.text = "被顺次数:" + vo.mySteal + "/" + Config.xtcs_004[6602].num;
			self.numLb1.text = "被抢次数:" + vo.myLoot + "/" + Config.xtcs_004[6601].num;
			IconUtil.setImg(self.mineIcon, Enum_Path.PIC_URL + "k" + cfg.pz + ".png");
			self.txtGroup.visible = true;
			self.refreshBtn.visible = false;
			if (vo.times > 0) {
				self.timeLb.text = "采集时间：" + DateUtil.getHMSBySecond(vo.times);
				self.sourceLb.text = "已采资源：";
				if (!Timer.instance.has(self.timeHandler, self)) {
					Timer.instance.listen(self.timeHandler, self, 1000);
				}
			} else {
				Timer.instance.remove(self.timeHandler, self);
				if (vo.times == -1) {
					self.txtGroup.visible = false;
					self.refreshBtn.visible = true;
					self.timeLb.text = "采集时间：" + DateUtil.getHMSBySecond(vo.cfg.time);
					self.sourceLb.text = "满采资源：";
				} else {
					self.sourceLb.text = "已采资源：";
					self.timeLb.text = HtmlUtil.fontNoSize("采矿完毕", Color.getColorStr(6));
				}
			}
		}
	}

	private timeHandler() {
		let self = this;
		self.vo.times--;
		self.timeLb.text = "采集时间：" + DateUtil.getHMSBySecond(self.vo.times);
		if (self.vo.times <= 0) {
			self.timeLb.text = HtmlUtil.fontNoSize("采矿完毕", Color.getColorStr(6));
			Timer.instance.remove(self.timeHandler, self);
		}
	}

	/**
	 * 刷新按钮事件
	 */
	private onRefresh(): void {
		if (Model_CrossMineral.state == 1) {
			return ViewCommonWarn.text("不在活动时间内");
		}
		GGlobal.layerMgr.open(UIConst.CROSS_MINERAL_REFRESH);
	}

	public clean() {
		let self = this;
		Timer.instance.remove(self.timeHandler, self);
		IconUtil.setImg(self.mineIcon, null);
		IconUtil.setImg(self.typeIcon0, null);
		IconUtil.setImg(self.typeIcon1, null);
	}
}