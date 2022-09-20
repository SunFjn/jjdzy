class ItemHomeTarget extends fairygui.GComponent {

	public lbHuoYue: fairygui.GRichTextField;
	public gird: ViewGrid;
	public btn: fairygui.GButton;
	public imgYWC: fairygui.GImage;
	public btnLQ: fairygui.GButton;
	public progress: fairygui.GProgressBar;

	public static URL: string = "ui://oy62ymetd8t65";

	public static createInstance(): ItemHomeTarget {
		return <ItemHomeTarget><any>(fairygui.UIPackage.createObject("homeTask", "ItemHomeTarget"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		s.btnLQ.addClickListener(s.onGet, s);
		s.btn.addClickListener(s.onGo, s);
	}

	private _vo: Vo_HomeGoal
	public set vo(v: Vo_HomeGoal) {
		let s = this;
		s._vo = v;
		s.lbHuoYue.text = v.name
		//领取状态
		s.imgYWC.visible = v.state == 2;
		s.btn.visible = v.state == 0;
		s.btnLQ.visible = v.state == 1;
		//奖励
		let icon = ConfigHelp.makeItemListArr(JSON.parse(v.award));
		s.gird.tipEnabled = s.gird.isShowEff = true;
		s.gird.vo = icon[0];

		// if (v.lib.type == 301 || v.lib.type == 302) {//特殊处理 by 苏波
		// 	s.progress.max = 1
		// 	s.progress.value = v.state == 0 ? 0 : 1
		// } else {
		if (v.lib.type == 301) {//激活紫色侍女1名
			let m = GGlobal.model_HomeMaid
			let ct = m.getQualityCt(v.lib.canshu1)//
			//进度
			s.progress.max = v.lib.canshu2;
			// let val = GGlobal.model_HomeTask.progreGoal[v.lib.type]
			let val = ct > v.lib.canshu2 ? v.lib.canshu2 : ct;
			s.progress.value = val ? val : 0;
		}
		else if (v.lib.type == 302) {//1名侍女5星
			let m = GGlobal.model_HomeMaid
			let ct = m.getStarCt(v.lib.canshu2)//
			//进度
			s.progress.max = v.lib.canshu1;
			// let val = GGlobal.model_HomeTask.progreGoal[v.lib.type]
			let val = ct > v.lib.canshu1 ? v.lib.canshu1 : ct;
			s.progress.value = val ? val : 0;
		}
		else {
			//进度
			s.progress.max = v.lib.canshu1;
			let val = GGlobal.model_HomeTask.progreGoal[v.lib.type]
			s.progress.value = val ? val : 0;
		}
	}

	private onGet() {
		let s = this;
		if (!s._vo) {
			return;
		}
		GGlobal.model_HomeTask.CG_GET_GOAL_REWARD_11415(s._vo.id);
	}

	private onGo() {
		let s = this;
		if (!s._vo) {
			return;
		}
		if (s._vo.nextto == 0) {
			let arr = JSON.parse(s._vo.lib.nextto2);
			let min = 0;
			let builderID = 0;
			for (let i = 0; i < arr.length; i++) {
				let cfg = Config.zsfl_019[arr[i][0]];
				let builderLv = GGlobal.homemodel.getBuildCfgIDByType(cfg.zslx);
				if (i == 0) {
					min = builderLv;
					builderID = cfg.npc;
				} else if (builderLv < min) {
					min = builderLv;
					builderID = cfg.npc;
				}
			}
			GGlobal.layerMgr.open(UIConst.HOME_JIAJU_UI, builderID);
		} else {
			GGlobal.layerMgr.open(s._vo.nextto);
		}
		GGlobal.layerMgr.close2(UIConst.HOME_TASK)
	}

	public clean() {
		super.clean();
		this.gird.clean();
	}
}