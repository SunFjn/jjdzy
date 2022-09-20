/**累充返利 */
class Child_LeiChongFanLi extends fairygui.GComponent implements IPanel {

	public list: fairygui.GList;
	public upGrad: Button4;
	public gridArr: ViewGrid[];
	public txtLeftTime: fairygui.GRichTextField;
	/**当前选择的 */
	private currentItem: item_LeiChongFanLiBtn;
	private VOdata: any[];
	/**当前的页面数据 */
	private currentData: VO_LeiChongFanLi;
	/**当前的充值金额 */
	private currentValue: number;
	private times: number;
	public desc: fairygui.GImage;
	public ylq: fairygui.GImage;
	public backImg: fairygui.GLoader;
	public rewardBackImg: fairygui.GLoader;
	public lbTitle: fairygui.GRichTextField;

	public static pkg = "sanGuoQingDian";
	public static URL: string = "ui://kdt501v2mq0c1i";
	public static createInstance(): Child_LeiChongFanLi {
		return <Child_LeiChongFanLi><any>(fairygui.UIPackage.createObject("sanGuoQingDian", "Child_LeiChongFanLi"));
	}

	public static setExtends() {
	}

	protected _viewParent: fairygui.GObject;
	public initView(pParent: fairygui.GObject) {
		let self = this;
		self._viewParent = pParent;
		self.addRelation(self._viewParent, fairygui.RelationType.Size);
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		const self = this;
		CommonManager.parseChildren(self, self);
		self.list.itemRenderer = self.itemRender;
		self.list.setVirtual();
		self.list.callbackThisObj = self;
		self.currentData = new VO_LeiChongFanLi();
		self.currentValue = 0;
		self.desc.color = 0xffffff;
	}
	/**列表点击事件 */
	private onListClick(evt: fairygui.ItemEvent) {
		let item = evt.itemObject as item_LeiChongFanLiBtn;
		this.setSelected(item.getData());
	}
	/**设置选中的项 */
	private setSelected(data) {
		let item = this.getItem(data.id);
		if (item) {
			this.showSelectedItem(item);
		}
	}
	private showSelectedItem(curItem: item_LeiChongFanLiBtn) {
		this.currentData = curItem.getData();
		this.currentItem.setSelectedState(false);
		curItem.setSelectedState(true);
		this.currentItem = curItem;
		this.setReward(curItem.getData().reward);
		this.setDesc();
		this.upGrad.noticeImg.visible = this.currentData.state == 1;
	}
	/**根据id 获得选中的项 */
	private getItem(id) {
		let arr = this.list._children;
		for (let i = 0; i < arr.length; ++i) {
			let item = arr[i] as item_LeiChongFanLiBtn;
			if (item.getData().id == id) {
				return item;
			}
		}
		return null;
	}

	private itemRender(index: number, item: item_LeiChongFanLiBtn) {
		item.setData(this.VOdata[index]);
	}

	private vo: Vo_Activity;
	public openPanel(pData?: Vo_Activity) {
		let self = this;
		self.vo = pData;
		self.initGrid();
		self.startTime();
		self.list.numItems = 0;
		self.list.addEventListener(fairygui.ItemEvent.CLICK, self.onListClick, self);
		GGlobal.control.listen(Enum_MsgType.LEICHONGFANLI, self.setList, self);
		GGlobal.control.listen(Enum_MsgType.LEICHONGFANLIReward, self.refreshPanel, self);
		self.upGrad.addClickListener(self.onClickUpgrad, self);
		GGlobal.modelActivity.CG_OPENACT(UIConst.LEICHONGFANLI);
		IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "LeiChongBack.png");
		IconUtil.setImg(self.rewardBackImg, Enum_Path.BACK_URL + "leichongFanliBack.png");
	}
	/**领取奖励后刷新当前页 */
	private refreshPanel(arg) {
		let id = arg.id;
		let index = 0;
		for (let i = 0; i < this.VOdata.length; ++i) {
			let temp = this.VOdata[i];
			if (id == temp.id) {
				temp.state = 2;
				index = i;
				break;
			}
		}
		this.VOdata.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		this.list.numItems = this.VOdata.length;
		for (let i = 0; i < this.VOdata.length; ++i) {
			let state = this.VOdata[i].state == 1;
			GGlobal.reddot.setCondition(UIConst.LEICHONGFANLI, 0, state);
			if (state) {
				break;
			}
		}
		GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
		GGlobal.control.notify(Enum_MsgType.ACTIVITY_ACTOPENSTATE);
		this.setSelected(index == this.VOdata.length - 1 ? this.VOdata[0] : this.VOdata[index]);
	}
	/**点击领取 */
	private onClickUpgrad() {
		if (this.currentData.state == 1) {
			GGlobal.modelSGQD.CGGET4931(this.currentData.id);
		} else if (this.currentData.state == 0) {
			GGlobal.layerMgr.open(UIConst.CHONGZHI);
		} else if (this.currentData.state == 2) {
			ViewCommonWarn.text("您已领取奖励");
		}
	}
	/**设置列表 */
	private setList(arg) {
		this.VOdata = arg.data;
		//this.VOdata = GGlobal.modelSGQD.LeiChongFanLiCfg;
		this.currentValue = arg.currentValue;
		this.VOdata.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		let id = 0;
		let temp;
		let isFind = false;
		for (let i = 0; i < this.VOdata.length; i++) {
			temp = this.VOdata[i];
			if (temp.state == 1) {
				this.currentData = temp;
				id = temp.id;
				this.setReward(temp.reward);
				isFind = true;
				break;
			} else if (this.currentValue <= temp.lj) {
				this.currentData = temp;
				id = temp.id;
				this.setReward(temp.reward);
				isFind = true;
				break;
			}
		}
		if (temp && !isFind) {//如果循环没有获得数据，说明充值金额已经突破了最大值，这个时候，就显示最小的值
			temp = this.VOdata[0];
			this.currentData = temp;
			id = temp.id;
			this.setReward(temp.reward);
		}
		this.list.numItems = this.VOdata.length;
		let arr = this.list._children;
		for (let i = 0; i < arr.length; ++i) {
			let temp = arr[i] as item_LeiChongFanLiBtn;
			if (temp.getData().id == id) {
				temp.setSelectedState(true);
				this.currentItem = temp;
				break;
			}
		}
		this.setDesc();
		this.upGrad.noticeImg.visible = this.currentData.state == 1;
	}
	public closePanel() {
		let self = this;
		self.list.removeEventListener(fairygui.ItemEvent.CLICK, self.onListClick, self);
		Timer.instance.remove(self.timeHandler, self);
		GGlobal.control.remove(Enum_MsgType.LEICHONGFANLI, self.setList, self);
		GGlobal.control.remove(Enum_MsgType.LEICHONGFANLIReward, self.refreshPanel, self);
		self.upGrad.removeClickListener(self.onClickUpgrad, self);
		let len = self.gridArr.length;
		for (let i = 0; i < len; ++i) {
			self.gridArr[i].tipEnabled = false;
			self.gridArr[i].isShowEff = false;
		}
		self.gridArr = [];
		self.VOdata = [];
		self.list.numItems = 0;
		IconUtil.setImg(self.backImg, null);
		IconUtil.setImg(self.rewardBackImg, null);
	}
	/**设置奖励的显示 */
	private setReward(data) {
		let rewardItem = ConfigHelp.makeItemListArr(JSON.parse(data));
		if (rewardItem) {
			for (let i = 0; i < rewardItem.length; ++i) {
				this.gridArr[i].tipEnabled = true;
				this.gridArr[i].isShowEff = true;
				this.gridArr[i].vo = rewardItem[i];
			}
		}
	}
	private initGrid() {
		this.gridArr = [];
		for (let i = 0; i < 6; ++i) {
			this.gridArr[i] = this["grid" + i];
		}
	}
	private setDesc() {
		this.ylq.visible = false;
		this.upGrad.visible = true;
		if (this.currentData.lj <= this.currentValue) {
			this.desc.text = "已充值[color=#00ff00]" + this.currentValue + "[/color]元"
			if (this.currentData.state == 1) {
				this.upGrad.text = "领取"
			} else if (this.currentData.state == 2) {
				this.ylq.visible = true;
				this.upGrad.visible = false;
			}
		} else {
			this.desc.text = "已充值[color=#ff0000]" + this.currentValue + "[/color]元"
			this.upGrad.text = "前往充值"
		}
		this.lbTitle.text = this.currentData.tips;
	}

	private startTime() {
		let self = this;
		let vo = self.vo;
		self.times = vo.getSurTime();
		self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
		if (self.times > 0) {
			Timer.instance.listen(self.timeHandler, self, 1000);
		} else {
			Timer.instance.remove(self.timeHandler, self);
		}
	}
	private timeHandler() {
		let s = this;
		s.times--;
		s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
		if (s.times <= 0) {
			Timer.instance.remove(s.timeHandler, s);
		}
	}
}