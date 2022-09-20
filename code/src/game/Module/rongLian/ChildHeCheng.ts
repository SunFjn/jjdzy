class ChildHeCheng extends fairygui.GComponent implements IPanel {

	//>>>>start
	public c1: fairygui.Controller;
	public grid: ViewGridRender;
	public listCost: fairygui.GList;
	public btnMin: Button2;
	public btnReduce: Button2;
	public btnAdd: Button2;
	public lbCount: fairygui.GTextField;
	public btnMax: Button2;
	public btnHe: Button1;
	public list: fairygui.GList;
	public labCost: fairygui.GRichTextField;
	public imgCost: fairygui.GLoader;
	public tab0: TabButton;
	public tab1: TabButton;
	public txtVIP: fairygui.GTextField;
	public txtTips: fairygui.GTextField;
	//>>>>end

	public static URL: string = "ui://ny9kb4yznflud";

	private _clickVo: any
	private _consumeCount: number;
	private _costArr: Array<any>;
	private currentVo: IGridImpl;
	private count: number = 0;

	public static createInstance(): ChildHeCheng {
		return <ChildHeCheng><any>(fairygui.UIPackage.createObject("rongLian", "ChildHeCheng"));
	}

	public constructor() {
		super();
	}

	protected _viewParent: fairygui.GObject;
	initView(pParent: fairygui.GObject) {
		this._viewParent = pParent;
		this.addRelation(this._viewParent, fairygui.RelationType.Size);
	}

	openPanel(pData?: any) {
		this.addListen();
		this.update();
	}

	closePanel(pData?: any) {
		this.removeListen();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		CommonManager.parseChildren(this, this);

		this.list.setVirtual();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandle;

		this.listCost.callbackThisObj = this;
		this.listCost.itemRenderer = this.renderCost;
		this.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, this.update, this);
		// ImageLoader.instance.loader(Enum_Path.BACK_URL + "hechen.jpg", this.imgBg);
	}
	public addListen(): void {
		// IconUtil.setImg(this.imgBg, Enum_Path.BACK_URL + "hechen.jpg");
		this.list.addEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		this.btnHe.addClickListener(this.onHeCheng, this);
		this.btnMin.addClickListener(this.onMinCountHandler, this);
		this.btnMax.addClickListener(this.onMaxCountHandler, this);
		this.btnReduce.addClickListener(this.onReduceHandler, this);
		this.btnAdd.addClickListener(this.onAddHandler, this);
		GGlobal.control.listen(Enum_MsgType.HE_CHENG_SUCCESS, this.success, this);
	}

	public removeListen(): void {
		// IconUtil.setImg(this.imgBg, null);
		this.list.removeEventListener(fairygui.ItemEvent.CLICK, this.itemClick, this);
		this.btnHe.removeClickListener(this.onHeCheng, this);
		this.btnMin.removeClickListener(this.onMinCountHandler, this);
		this.btnMax.removeClickListener(this.onMaxCountHandler, this);
		this.btnReduce.removeClickListener(this.onReduceHandler, this);
		this.btnAdd.removeClickListener(this.onAddHandler, this);
		GGlobal.control.remove(Enum_MsgType.HE_CHENG_SUCCESS, this.success, this);
		this.currentVo = null;
		this.list.numItems = 0;
		this.listCost.numItems = 0;
	}

	public update(): void {
		var arr = Model_RongLian.getHeCheng(this.c1.selectedIndex + 1);
		this.list.numItems = arr.length
		let index = 0;
		for (let i = 0; i < arr.length; i++) {
			if (Model_RongLian.checkHeChengVo(arr[i])) {
				index = i;
				break;
			}
		}
		this.list.selectedIndex = index;
		this.list.scrollToView(index);
		this.selectdUpdate(Model_RongLian.getHeCheng(this.c1.selectedIndex + 1)[index]);
	}

	private itemClick(e: fairygui.ItemEvent): void {
		var clickItem = e.itemObject as VHeChengTab
		this.selectdUpdate(clickItem.vo)
	}

	private selectdUpdate(vo: any): void {
		this._clickVo = vo
		this.grid.tipEnabled = true;
		this.currentVo = this.grid.vo = Model_RongLian.getHCItem(vo);

		if (vo.itemArr == null) {
			var iArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(vo.item))
			for (let i = 0; i < iArr.length; i++) {
				if (iArr[i] instanceof Vo_Currency) {
					vo.itemCost = iArr[i]
					iArr.splice(i, 1);
					break;
				}
			}
			vo.itemArr = iArr
		}
		this._costArr = vo.itemArr
		this.lbCount.text = "1";
		this.count = 1;
		this._consumeCount = vo.itemCost.count
		this.imgCost.url = CommonManager.getMoneyUrl(vo.itemCost.gType)
		this.upCount();
		this.btnHe.checkNotice = Model_RongLian.checkHeChengVo(vo);
		this.txtVIP.text = "VIP" + vo.vip + "可合成";
		if (Model_player.voMine.viplv < vo.vip) {
			this.txtVIP.visible = true;
			this.imgCost.visible = false;
			this.labCost.visible = false;
		} else {
			this.txtVIP.visible = false;
			this.imgCost.visible = true;
			this.labCost.visible = true;
		}
		this.tab0.checkNotice = Model_RongLian.getNotByType(1);
		this.tab1.checkNotice = Model_RongLian.getNotByType(2);

		this.txtTips.text = ""
		let headItem: VoItem = this._costArr[0]
		if (headItem && headItem.cfg.sys == UIConst.SETTING_HEAD) {//头像
			let headid = parseInt(headItem.cfg.use)
			if (Model_Setting.frameIdArr.indexOf(headid) == -1 && Model_Setting.headIdArr.indexOf(headid) == -1) {
				this.txtTips.text = "你还未激活过该头像或头像框"
			}
		}

	}


	private renderHandle(index: number, obj: fairygui.GObject): void {
		var item: VHeChengTab = obj as VHeChengTab;
		item.vo = Model_RongLian.getHeCheng(this.c1.selectedIndex + 1)[index];
	}

	private renderCost(index: number, obj: fairygui.GObject): void {
		var item: ViewGridRender = obj as ViewGridRender;
		item.tipEnabled = true;
		item.vo = this._costArr[index];
		if (item.vo) {
			let count = item.vo.count * this.count
			let hasCout = Model_Bag.getItemCount(item.vo.id)
			item.grid.lbNum.text = hasCout + "/" + count
			item.grid.lbNum.visible = true;
			if (hasCout >= count) {
				item.grid.lbNum.color = Color.GREENINT;
			} else {
				item.grid.lbNum.color = Color.REDINT;
			}
		}
	}


	public onMinCountHandler(event: egret.TouchEvent): void {
		if (this.currentVo == null) {
			return;
		}
		this.count -= 10;
		if (this.count < 1) {
			this.count = 1;
		}
		this.upCount();
	}

	public onMaxCountHandler(event: egret.TouchEvent): void {
		if (this.currentVo == null) {
			return;
		}
		this.count += 10;
		if (this.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			this.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
		}
		this.upCount();
	}

	public onReduceHandler(event: egret.TouchEvent): void {
		if (this.currentVo == null) {
			return;
		}
		this.count--;
		if (this.count < 1) {
			this.count = 1
		}
		this.upCount();
	}

	public onAddHandler(event: egret.TouchEvent): void {
		if (this.currentVo == null) {
			return;
		}
		this.count++;
		if (this.count > Model_Bag.CONST_MAX_MUL_USE_NUM) {
			this.count = Model_Bag.CONST_MAX_MUL_USE_NUM;
		}
		this.upCount();
	}

	private upCount(): void {
		this.lbCount.text = "" + this.count;
		this.listCost.numItems = this._costArr.length;;
		this.labCost.text = (this._consumeCount * this.count) + ""
		if (Model_player.voMine.tongbi < this._consumeCount * this.count) {
			this.labCost.color = Color.REDINT;
		} else {
			this.labCost.color = Color.GREENINT;
		}
	}

	private onHeCheng(): void {
		if (!this.currentVo) {
			return;
		}

		var CurCount = Model_player.getCurrencyCount(this._clickVo.itemCost.gType)
		if (CurCount < this._consumeCount * this.count) {
			if (this._clickVo.itemCost.gType == Enum_Attr.yuanBao) {
				ModelChongZhi.guideToRecharge();
				return;
			}
			if (this._clickVo.itemCost.gType == Enum_Attr.TONGBI) {
				ViewCommonWarn.text("铜钱不足");
				return;
			}
		}
		var isFull = true;
		for (let i = 0; i < this._costArr.length; i++) {
			let costVo = this._costArr[i];
			let count = costVo.count * this.count
			let hasCout = Model_Bag.getItemCount(costVo.id)
			if (hasCout < count) {
				isFull = false;
				break;
			}
		}
		if (!isFull) {
			ViewCommonWarn.text("材料不足");
			return;
		}
		if (this.currentVo instanceof VoItem) {
			GGlobal.modelRL.CG_HE_CHENG(this.currentVo.id, this.count)
		}
	}

	private success(): void {
		this.list.numItems = Model_RongLian.getHeCheng(this.c1.selectedIndex + 1).length;
		this.selectdUpdate(this._clickVo)
	}
}