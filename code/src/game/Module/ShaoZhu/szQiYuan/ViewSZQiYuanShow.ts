class ViewSZQiYuanShow extends UIModalPanel {

	public list: fairygui.GList;
	public surebt: Button0;
	public continuebt: Button1;
	public lab: fairygui.GRichTextField;
	public img: fairygui.GLoader;

	public constructor() {
		super();
		this.loadRes("bossTiShi", "bossTiShi_atlas0");
	}

	protected childrenCreated(): void {
		GGlobal.createPack("bossTiShi");
		this.view = fairygui.UIPackage.createObject("bossTiShi", "View_Reward_Show2").asCom;
		this.contentPane = this.view;

		this.list = <fairygui.GList><any>(this.view.getChild("list"));
		this.surebt = <Button0><any>(this.view.getChild("surebt"));
		this.continuebt = <Button1><any>(this.view.getChild("continuebt"));
		this.lab = <fairygui.GRichTextField><any>(this.view.getChild("lab"));
		this.img = <fairygui.GLoader><any>(this.view.getChild("img"));

		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHandler;
		this.surebt.addClickListener(this.OnSure, this);
		this.continuebt.addClickListener(this.OnContinue, this);
		this.isShowOpenAnimation = false;
		this.closeButton = this.view.getChild("closeButton");
		super.childrenCreated();
	}

	private _cost1
	private _cost10

	protected onShown() {
		let $arg = this._args
		let arr1 = []
		let arr2 = []
		for(let i = 0; i < $arg.length; i++){
			if($arg[i].isBig > 0){
				arr1.push($arg[i])
			}else{
				arr2.push($arg[i])
			}
		}
		this.rewardArr = arr1.concat(arr2);;

		let model = GGlobal.modelSZQiYuan
		this.list.numItems = this.rewardArr.length;
		this.times = 11;
		Timer.instance.listen(this.timeHandler, this, 1000);

		if (!this._cost1) {
			this._cost1 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6101))[0][2])
		}
		if (!this._cost10) {
			this._cost10 = Number(ConfigHelp.SplitStr(ConfigHelp.getSystemDesc(6102))[0][2])
		}

		if (this.rewardArr.length > 9) {
			this.continuebt.text = "再来十次"

			if (model.qyCount > 9) {
				this.lab.text = "" + model.qyCount + "/10"
				this.lab.color = Color.WHITEINT;

				let v = VoItem.create(Model_SZQiYuan.qiyuanId);
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
			} else {
				this.lab.text = "" + this._cost10
				if (Model_player.voMine.yuanbao >= this._cost10) {
					this.lab.color = Color.GREENINT;
				} else {
					this.lab.color = Color.REDINT;
				}
				this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
			}
		} else {
			this.continuebt.text = "再来一次"

			if (model.qyCount > 0) {
				this.lab.text = "" + model.qyCount + "/1"
				this.lab.color = Color.WHITEINT;

				let v = VoItem.create(Model_SZQiYuan.qiyuanId);
				ImageLoader.instance.loader(Enum_Path.ICON70_URL + v.icon + ".png", this.img);
			} else {
				this.lab.text = "" + this._cost1
				if (Model_player.voMine.yuanbao >= this._cost1) {
					this.lab.color = Color.GREENINT;
				} else {
					this.lab.color = Color.REDINT;
				}
				this.img.url = CommonManager.getMoneyUrl(Enum_Attr.yuanBao);//元宝
			}
		}
	}

	protected onHide(): void {
		GGlobal.control.notify(Enum_MsgType.SZQIYUAN_PRAY_OVER);
		this.list.numItems = 0;
		Timer.instance.remove(this.timeHandler, this);
		GGlobal.layerMgr.close(UIConst.SHAOZHU_QIYUAN_SHOW);
		
	}

	private OnSure() {
		this.doHideAnimation();
	}

	private OnContinue(): void {
		if (!GGlobal.layerMgr.isOpenView(UIConst.SHAOZHU)) {
			ViewCommonWarn.text("请先进入少主祈愿");
			// GGlobal.layerMgr.open(UIConst.SHAOZHU_QIYUAN_SHOW)
		}else{
			if (this.rewardArr.length > 9) {
				this.onBuy10()
			} else {
				this.onBuy1()
			}
		}
		this.doHideAnimation();
	}

	private onBuy1(): void {
		if (GGlobal.modelSZQiYuan.qyCount > 0) {
			GGlobal.modelSZQiYuan.CG_PRAY(1);
		} else {
			if (Model_player.voMine.yuanbao < this._cost1) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			GGlobal.modelSZQiYuan.CG_PRAY(1);
		}
	}

	private onBuy10(): void {
		if (GGlobal.modelSZQiYuan.qyCount > 9) {
			GGlobal.modelSZQiYuan.CG_PRAY(10);
		} else {
			if (Model_player.voMine.yuanbao < this._cost10) {
				ModelChongZhi.guideToRecharge()
				return;
			}
			GGlobal.modelSZQiYuan.CG_PRAY(10);
		}
	}
	public bigAward: any
	private renderHandler(index: number, obj: fairygui.GObject) {
		let grid = obj as ViewGridRender;
		let v = this.rewardArr[index];
		grid.vo = v.item
		grid.isShowExtra(v.isBig > 1 ? 4 : v.isBig);
	}

	private rewardArr:{ item: IGridImpl, isBig: number }[] = [];
	private times = 10;

	private timeHandler() {
		this.times--;
		this.surebt.text = "确定(" + this.times + ")";
		if (this.times <= 0) {
			this.doHideAnimation();
		}
	}
}