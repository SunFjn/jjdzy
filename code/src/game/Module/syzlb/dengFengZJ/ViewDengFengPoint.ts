class ViewDengFengPoint extends UIModalPanel {

	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public lbRank: fairygui.GRichTextField;
	public lbPoint: fairygui.GRichTextField;

	public static URL: string = "ui://3o8q23uua0u32c";

	public static createInstance(): ViewDengFengPoint {
		return <ViewDengFengPoint><any>(fairygui.UIPackage.createObject("syzlb", "ViewDengFengPoint"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("syzlb", "ViewDengFengPoint").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderRew
		s.list.setVirtual();
		super.childrenCreated();
	}
	private _lstArr: Idfzjhx2_261[];
	protected onShown(): void {
		let s = this;
		s.registerEvent(true)
		let m = GGlobal.modelDengFengZJ
		m.CG_POINT_DAT()
	}

	protected onHide(): void {
		let s = this;
		s.registerEvent(false)
		s.list.numItems = 0;
	}

	private registerEvent(pFlag: boolean): void {
		let self = this;
		let m = GGlobal.modelDengFengZJ
		m.register(pFlag, Model_DengFengZJ.POINT_DAT, self.update, self);
	}

	private update() {
		let s = this;
		let m = GGlobal.modelDengFengZJ

		s.lbRank.text = "我的排名：" + (m.seaRank == 0 ? "未上榜" : HtmlUtil.fontNoSize(m.seaRank + "", Color.GREENSTR))
		s.lbPoint.text = "我的积分：" + HtmlUtil.fontNoSize(m.seaPoint + "", Color.GREENSTR)
		let arr = m.getCfgPointSea()
		//排序
		let arr1 = []//可领取
		let arr2 = []//未完成
		let arr3 = []//已领取
		for (let i = 0; i < arr.length; i++) {
			let v = arr[i];
			let st = m.pointDat[v.id];
			if (st) {
				arr3.push(v);
			} else if (m.seaPoint >= v.point) {
				arr1.push(v);
			} else {
				arr2.push(v);
			}
		}

		s._lstArr = arr1.concat(arr2).concat(arr3);
		s.list.numItems = s._lstArr.length;
	}

	private renderRew(index, obj: VDengFengPoint) {
		obj.vo = this._lstArr[index]
	}
}