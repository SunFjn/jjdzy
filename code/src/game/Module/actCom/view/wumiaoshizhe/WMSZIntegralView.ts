/**
 * 武庙十哲 - 积分目标
 */
class WMSZIntegralView extends UIModalPanel{
	public list: fairygui.GList;
	public lbMyRank: fairygui.GRichTextField;
	public lbMyInte: fairygui.GRichTextField;

	private _cfgs: Array<Iwmjf_779>;
	private _qs:number = 0;
	private dataArr: any[];
	private _maxRank:number = 0;
	
	public static URL: string = "ui://5na9ulpxgv3t2";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let self = this;
		self.view = fairygui.UIPackage.createObject("ActCom_WMSZ", "WMSZIntegralView").asCom;
		self.contentPane = self.view;
		CommonManager.parseChildren(self.view, self);

		self.list.itemRenderer = self.renderHandle;
		self.list.callbackThisObj = self;
		self.list.setVirtual();
		super.childrenCreated();
	}

	protected onShown(): void {
		let self = this;
		self._qs = self._args.qs;
		self._maxRank = self._args.maxRank;
		GGlobal.control.listen(UIConst.WMSZ_INTEGRAL, self.updateLlist, self);
		self.update();
	}

	protected onHide(): void {
		let self = this;
		self.list.numItems = 0;
		GGlobal.layerMgr.close(this.panelId);
		GGlobal.control.remove(UIConst.WMSZ_INTEGRAL, self.updateLlist, self);
	}

	private update() {
		let self = this;
		let model = GGlobal.model_ActWMSZ;
		self.updateLlist();

		self.lbMyInte.text = "我的积分：" + model.myIntegral;
		if(model.myRank <= 0)
		{
			self.lbMyRank.text = "我的排名：" + self._maxRank + "+";
		}else{
			self.lbMyRank.text = "我的排名：" + model.myRank;
		}
	}

	private updateLlist()
	{
		let self = this;
		let model = GGlobal.model_ActWMSZ;
		self.dataArr = model.targetArr;
		self.dataArr.sort(self.funcSort);
		self.list.numItems = self.dataArr.length;
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var v: WMSZIntegralItem = obj as WMSZIntegralItem;
		v.setData(this.dataArr[index]);
	}

	private funcSort(a: WMSZVO, b: WMSZVO) {
		if (a.status == b.status) {
			return a.id - b.id;
		} else {
			if (a.status == 1) {
				return -1;
			}
			if (b.status == 1) {
				return 1;
			}
			if (a.status == 0) {
				return -1;
			}
			if (b.status == 0) {
				return 1;
			}
		}
		return 1;
	}

}