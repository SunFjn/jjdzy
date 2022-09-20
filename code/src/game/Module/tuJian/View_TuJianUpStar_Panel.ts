class View_TuJianUpStar_Panel extends UIModalPanel {

	public powerLb: fairygui.GTextField;
	public starLb: fairygui.GTextField;
	public levelLb: fairygui.GRichTextField;
	public grid: ViewGrid;
	public upBt: Button1;
	public upstarGroup: fairygui.GGroup;
	public maxGroup: fairygui.GGroup;
	public list: fairygui.GList;

	public static URL: string = "ui://m0rbmsgsrkgc2k";

	public constructor() {
		super();
		this.childrenCreated();
	}

	protected childrenCreated(): void {
		let s = this;
		s.view = fairygui.UIPackage.createObject("TuJian", "View_TuJianUpStar_Panel").asCom;
		s.contentPane = s.view;
		CommonManager.parseChildren(s.view, s);
		s.list.callbackThisObj = s;
		s.list.itemRenderer = s.renderHandler;
		s.list.foldInvisibleItems = true;
		super.childrenCreated();
		s.upBt.addClickListener(s.upHandle, s);
		Model_TuJian.tuJianStarArr();
	}

	private renderHandler(index: number, obj: TuJianUpStarItem) {
		let cfg: Ipicstar_005 = Model_TuJian.starObj[this.vo.ID][index]
		obj.updateShow(this.vo, cfg);
		obj.visible = cfg.describe != "0";
	}

	private upHandle(): void {
		let s = this;
		if (s.upBt.checkNotice) {
			GGlobal.modelTuJian.CG_TUJIAN_UPSTAR(s.vo.ID);
		} else {
			if (s.vo.next_star <= 0) {
				ViewCommonWarn.text("已达升星上限");
			} else {
				let itemVo: VoItem = VoItem.create(s.vo.consume_star[0][1]);
				itemVo.count = s.vo.consume_star[0][2];
				View_CaiLiao_GetPanel.show(itemVo);
			}
		}
	}

	private vo: Vo_TuJian;
	private STARMAX: number = 5;
	public updateShow(): void {
		let s = this;
		s.vo = s._args;
		if (!s.vo) return;
		s.powerLb.text = s.vo.power1 + "";
		let starstr: string = "";
		let starNum = Math.floor(s.vo.starLv / s.STARMAX);
		let starNum1 = s.vo.starLv % s.STARMAX;
		for (let i = 0; i < s.STARMAX; i++) {
			if (i < starNum1) {
				starstr += "" + (starNum + 1);
			} else {
				starstr += "" + starNum;
			}
		}
		s.starLb.text = starstr
		s.levelLb.text = "等级上限增加至" + s.vo.levelMax;
		s.list.numItems = Model_TuJian.starObj[s.vo.ID].length;
		if (s.vo.next_star > 0) {
			let num = Model_Bag.getItemCount(s.vo.consume_star[0][1]);
			let itemVo: VoItem = VoItem.create(s.vo.consume_star[0][1]);
			itemVo.count = s.vo.consume_star[0][2];
			s.grid.vo = itemVo;
			let color = num >= itemVo.count ? 2 : 6;
			s.grid.showText = HtmlUtil.fontNoSize(num + "/" + itemVo.count, Color.getColorStr(color));
			s.upBt.checkNotice = num >= itemVo.count;
			s.upstarGroup.visible = true;
			s.maxGroup.visible = false;
		} else {
			s.upBt.checkNotice = false;
			s.upstarGroup.visible = false;
			s.maxGroup.visible = true;
		}
	}

	protected onShown(): void {
		let s = this;
		s.updateShow();
		GGlobal.control.listen(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
	}

	protected onHide(): void {
		let s = this;
		GGlobal.layerMgr.close(UIConst.TUJIAN_UPSTAR);
		GGlobal.control.remove(Enum_MsgType.TUJIAN_DATA_UPDATE, s.updateShow, s);
		s.list.numItems = 0;
	}

	public resetPosition(): void {
		let s = this;
		s.setXY((fairygui.GRoot.inst.width - s.width) / 2, (fairygui.GRoot.inst.height - s.height) / 2);
	}
}