class ViewSYZLBTeamInfo extends UIModalPanel {

	public c1: fairygui.Controller;
	public info1: ItemSYZLBTeamInfo;
	public info2: ItemSYZLBTeamInfo;
	public btnCge: Button1;
	public imgBg: fairygui.GImage;

	public static URL: string = "ui://3o8q23uuqqnwe";

	private infoArr: ItemSYZLBTeamInfo[];

	public static createInstance(): ViewSYZLBTeamInfo {
		return <ViewSYZLBTeamInfo><any>(fairygui.UIPackage.createObject("syzlb", "ViewSYZLBTeamInfo"));
	}

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("syzlb", "ViewSYZLBTeamInfo").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.infoArr = [s.info1, s.info2];
		s.isShowOpenAnimation = false;
		s.isShowMask = false;
		super.childrenCreated();
	}
	protected onShown(): void {
		let s = this;
		GGlobal.model_Syzlb.listen(Model_Syzlb.teamui, s.update, s)
		s.btnCge.addClickListener(s.onCge, s);
		s.update();
	}

	protected onHide(): void {
		let s = this;
		GGlobal.model_Syzlb.remove(Model_Syzlb.teamui, s.update, s)
		s.btnCge.removeClickListener(s.onCge, s);
	}

	public resetPosition(): void {
		super.resetPosition();
		// this.setXY(fairygui.GRoot.inst.width - this.width + GGlobal.layerMgr.offx, (fairygui.GRoot.inst.height - this.height) / 2);
		this.setXY(-GGlobal.layerMgr.offx, (fairygui.GRoot.inst.height - this.height) / 2);
	}

	public update() {
		let s = this;
		let m = GGlobal.model_Syzlb;
		m.teamMyArr
		let ct = 0;
		let isLeader = false;
		for (let i = 0; i < m.teamMyArr.length; i++) {
			let v = m.teamMyArr[i];
			if (v.pId == Model_player.voMine.id && v.type == 1) {
				isLeader = true;
				break;
			}
		}
		for (let i = 0; i < m.teamMyArr.length; i++) {
			let v = m.teamMyArr[i];
			if (v.pId == Model_player.voMine.id) {
				continue;
			}
			s.infoArr[ct].setVo(v, isLeader);
			ct++;
		}
		if (!isLeader) {
			s.visible = false;
			return;
		}
		s.visible = true;
		if (ct == 0) {
			s.imgBg.visible = false;
			s.infoArr[0].visible = false;
			s.infoArr[1].visible = false;
		} else {
			s.imgBg.visible = true;
			s.infoArr[0].visible = true;
			s.infoArr[1].visible = true;

			if (ct == 1) {
				s.c1.selectedIndex = 1;
			}
			else if (ct == 2) {
				s.c1.selectedIndex = 0;
			}
		}
	}

	private onCge() {
		GGlobal.model_Syzlb.CG_CHA_BOSS();
	}
}