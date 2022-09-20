class ViewNianShouReward extends UIModalPanel {

	public list: fairygui.GList;
	public lbPoint: fairygui.GTextField;

	public static URL: string = "ui://ht2966i4dsuf8";

	public static createInstance(): ViewNianShouReward {
		return <ViewNianShouReward><any>(fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouReward"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("actComNianShou", "ViewNianShouReward").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		super.childrenCreated();
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.itemRender;
		s.list.setVirtual();
	}

	protected onShown(): void {
		let s = this;
		s.upView();
		GGlobal.model_ActNianShou.listen(Model_ActNianShou.get_goal_reward, s.upView, s)
	}

	protected onHide(): void {
		let s = this;
		GGlobal.model_ActNianShou.remove(Model_ActNianShou.get_goal_reward, s.upView, s)
	}

	private upView() {
		let m = GGlobal.model_ActNianShou
		let s = this;
		//排序
		let arr1 = []
		let arr2 = []
		let arr3 = []
		for (let i = 0; i < m.rewardArr.length; i++) {
			let v = m.rewardArr[i];
			let st = m.rewStObj[v.id]
			let point = m.point
			if (st == 1) {//已领取
				arr3.push(v)
			} else if (point >= v.point) {//可领取
				arr1.push(v)
			} else {
				arr2.push(v)
			}
		}
		s._lisDat = arr1.concat(arr2).concat(arr3);
		s.list.numItems = s._lisDat.length;
		s.lbPoint.text = "已获得" + m.point + "积分";
	}

	private _lisDat: Inianpoint_299[];
	private itemRender(idx, g: ItemNianShouReward) {
		g.vo = this._lisDat[idx];
	}
}