class ViewZhuanPanTargetReward extends UIModalPanel {
	public frame: fairygui.GLabel;
	public list: fairygui.GList;
	public numlb: fairygui.GRichTextField;
	public static URL: string = "ui://kdt501v2dg2218";
	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("sanGuoQingDian", "VieZhuanPanTargetReward").asCom;
		s.contentPane = s.view;
		s.list = <fairygui.GList><any>(s.view.getChild("list"));
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandle;
		s.numlb = <fairygui.GRichTextField><any>(s.view.getChild("numlb"));
		super.childrenCreated();
	}

	private renderHandle(index: number, obj: ChildZhuanPanTargetReward) {
		obj.updateShow(ModelSGQD.zpRewardArr[index]);
	}

	private updateShow() {
		let arr = ModelSGQD.zpRewardArr;
		let index = 0;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].state == 1) {
				index++;
				GGlobal.reddot.setCondition(UIConst.SG_ZHUANPAN, 0, true);
				GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
				break;
			}
		}
		if (index <= 0) {
			GGlobal.reddot.setCondition(UIConst.SG_ZHUANPAN, 0, false);
			GGlobal.modelSGQD.notify(ModelSGQD.msg_notice);
		}
		arr.sort(GGlobal.modelSGQD.sortReward)
		this.list.numItems = arr.length;
		this.numlb.text = "转盘次数：" + ModelSGQD.zpCtMy;
	}

	protected onShown(): void {
		let s = this;
		s.updateShow();
		GGlobal.control.listen(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.updateShow, s);
		GGlobal.modelSGQD.CGOpenUI4127();
	}

	protected onHide(): void {
		let s = this;
		s.list.numItems = 0;
		GGlobal.layerMgr.close(UIConst.SG_ZHUANPAN_TARGET_REWARD);
		GGlobal.control.remove(UIConst.SG_ZHUANPAN_TARGET_REWARD, s.updateShow, s);
	}
}