class View_ShiHun_Panel extends UIModalPanel {

	public grid: ViewGrid;
	public tunshiBt: Button0;
	public keyBtn: Button1;
	public messageLb: fairygui.GRichTextField;
	public desLb: fairygui.GRichTextField;
	public attLb: fairygui.GRichTextField;
	public promptLb: fairygui.GTextField;
	public upgroup: fairygui.GGroup;

	public static URL: string = "ui://pofv8989tlm32d";

	public constructor() {
		super();
		this.loadRes();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("DuanZao", "View_ShiHun_Panel").asCom;
		s.contentPane = s.view;
		s.tunshiBt = <Button0><any>(s.view.getChild("tunshiBt"));
		s.grid = <ViewGrid><any>(s.view.getChild("grid"));
		s.messageLb = <fairygui.GRichTextField><any>(s.view.getChild("messageLb"));
		s.messageLb.leading = 11;
		s.desLb = <fairygui.GRichTextField><any>(s.view.getChild("desLb"));
		s.attLb = <fairygui.GRichTextField><any>(s.view.getChild("attLb"));
		s.promptLb = <fairygui.GRichTextField><any>(s.view.getChild("promptLb"));
		s.keyBtn = <Button1><any>(s.view.getChild("keyBtn"));
		s.upgroup = <fairygui.GGroup><any>(s.view.getChild("upgroup"));
		super.childrenCreated();
		s.tunshiBt.addClickListener(s.tunshiHandle, this);
		s.keyBtn.addClickListener(s.tunshiHandle, this);
	}

	private tunshiHandle(event: egret.TouchEvent): void {
		let s = this;
		switch (event.target.id) {
			case s.tunshiBt.id:
				if (s.tunshiBt.checkNotice) {
					GGlobal.modelDuanZao.CG_DUANZAO_SHIHUN(s._args.id, 1);
				} else {
					let cfg = Config.dzinsoul_209[s._args.id];
					let itemArr: Array<any> = JSON.parse(cfg.consume);
					let itemID = itemArr[0][1];
					let num = Model_Bag.getItemCount(itemID);
					if (num == 0) {
						View_CaiLiao_GetPanel.show(VoItem.create(itemID));
					} else {
						ViewCommonWarn.text("已达吞噬上限");
					}
				}
				break;
			case s.keyBtn.id:
				if (s.keyBtn.checkNotice) {
					GGlobal.modelDuanZao.CG_DUANZAO_SHIHUN(s._args.id, 2);
				} else {
					let cfg = Config.dzinsoul_209[s._args.id];
					let itemArr: Array<any> = JSON.parse(cfg.consume);
					let itemID = itemArr[0][1];
					let num = Model_Bag.getItemCount(itemID);
					if (num == 0) {
						View_CaiLiao_GetPanel.show(VoItem.create(itemID));
					} else {
						ViewCommonWarn.text("已达吞噬上限");
					}
				}
				break;
		}
	}

	private itemVo: VoItem;
	public updateShow(): void {
		let s = this;
		let cfg = Config.dzinsoul_209[s._args.id];
		let itemArr: Array<any> = JSON.parse(cfg.consume);
		let itemID = itemArr[0][1];
		s.itemVo = VoItem.create(itemID);
		s.grid.vo = s.itemVo;
		let num = Model_Bag.getItemCount(itemID);

		s.desLb.text = s.itemVo.cfg.miaoshu;
		let attArr: Array<any> = JSON.parse(cfg.attr);
		let attstr = "";
		for (let i = 0; i < attArr.length; i++) {
			if (i == 0) {
				attstr += Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_DuanZao.drugArr[cfg.id - 1]);
			} else {
				attstr += "\n" + Vo_attr.getShowStr(attArr[i][0], attArr[i][1] * Model_DuanZao.drugArr[cfg.id - 1]);
			}
		}
		s.attLb.text = attstr;
		let index = 0;
		let index1 = 0;
		let index2 = 0;
		let arr: Array<any> = JSON.parse(cfg.num);
		let zhuHunMinLV = Model_DuanZao.getZhuHunLv();
		if (zhuHunMinLV < arr[0][0]) {
			index1 = arr[0][0];
			index = arr[0][1];
		} else {
			index2++;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] <= zhuHunMinLV) {
					index = arr[i][1];
				} else {
					index1 = arr[i][0];
					index2 = arr[i][1];
					break;
				}
			}
		}
		s.messageLb.setVar("name", "[color=" + Color.getColorStr(s.itemVo.quality) + "]" + s.itemVo.name + "[/color]").setVar("count ", Model_DuanZao.drugArr[cfg.id - 1] + "").setVar("max", index + "").setVar("num", num + "").flushVars();
		if (Model_DuanZao.drugArr[s._args.id - 1] >= index || index2 == 0) {
			if (index1 != 0) {
				s.promptLb.visible = true;
				if (index2 == 0) {
					s.promptLb.text = "全身铸魂" + index1 + "阶开启";
				} else {
					s.promptLb.text = "全身铸魂" + index1 + "阶可提升吞噬上限" + (index2 - index) + "颗";
				}
			} else {
				s.promptLb.visible = false;
			}
			s.tunshiBt.visible = s.keyBtn.visible = false;
		} else {
			s.promptLb.visible = false;
			s.tunshiBt.visible = s.keyBtn.visible = true;
			s.keyBtn.checkNotice = s.tunshiBt.checkNotice = num > 0;
		}
		s.upgroup.y = s.attLb.y + s.attLb.height + 20;
	}

	protected onShown(): void {
		let s = this;
		GGlobal.control.listen(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
		s.updateShow();
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.DUANZAO_ZHUHUN_SHIHUN);
		GGlobal.control.remove(Enum_MsgType.DUANZAO_DATA_UPDATE, s.updateShow, this);
	}
}