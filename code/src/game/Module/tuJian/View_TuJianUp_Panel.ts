class View_TuJianUp_Panel extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public costLb1: ViewResource;
	public levelBar: fairygui.GProgressBar;
	public upLvBt: Button0;
	public upStarBt: Button4;
	public stargroup: fairygui.GGroup;
	public grid: ViewGrid;
	public jihuoBt: Button0;
	public jihuoGroup: fairygui.GGroup;
	public curAttLb: fairygui.GRichTextField;
	public nextAttLb: fairygui.GRichTextField;
	public powerLb: fairygui.GRichTextField;
	public itemNameLb: fairygui.GRichTextField;
	public item: TuJianItem;
	public showBt: fairygui.GButton;

	public static URL: string = "ui://m0rbmsgsrcvu27";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		CommonManager.parseChildren(a, a);
		a.grid.isShowEff = true;
		a.item.isShowMask = false;
		a.item.isShowNotice = false;
		a.jihuoBt.addClickListener(a.jihuoHandle, a);
		a.upStarBt.addClickListener(a.upStarHandle, a);
		a.upLvBt.addClickListener(a.upLvHandle, a);
		a.showBt.addClickListener(a.showHandler, a);
	}

	private showHandler() {
		if (!this.vo) return;
		GGlobal.modelchat.CG_CHAT_SHOW_DATA(1, this.vo.ID);
	}

	private upStarHandle(): void {
		GGlobal.layerMgr.open(UIConst.TUJIAN_UPSTAR, this.vo);
	}

	private upLvHandle(): void {
		let a = this;
		if (a.upLvBt.checkNotice) {
			GGlobal.modelTuJian.CG_TUJIAN_UPGRADE(a.vo.ID);
		} else {
			if (a.vo.level >= a.vo.levelMax && a.vo.next_star <= 0) {
				ViewCommonWarn.text("已达最高等级");
			} else if (a.vo.level >= a.vo.levelMax) {
				ViewCommonWarn.text("升星可提升等级上限");
			} else {
				let costArr1: Array<any> = a.vo.consume_level;
				let costVo1: VoItem = VoItem.create(costArr1[0][1]);
				View_CaiLiao_GetPanel.show(costVo1)
			}
		}
	}

	private jihuoHandle(): void {
		let a = this;
		if (a.jihuoBt.checkNotice) {
			GGlobal.modelTuJian.CG_TUJIAN_JIHUO(a.vo.ID);
		} else {
			let costArr0: Array<any> = a.vo.activation_jihuo;
			let costVo0: VoItem = VoItem.create(costArr0[0][1]);
			View_CaiLiao_GetPanel.show(costVo0)
		}
	}

	private STARMAX: number = 5;
	private vo: Vo_TuJian;
	private updateShow(vo: Vo_TuJian): void {
		let a = this;
		a.vo = vo;
		if (!a.vo) return;
		if (a.vo.isJiHuo) {
			a.showBt.visible = true;
			a.c1.selectedIndex = 1;
			if (a.vo.next_star > 0) {
				let costArr0: Array<any> = a.vo.consume_star;
				let costVo0: VoItem = VoItem.create(costArr0[0][1]);
				let count2 = Model_Bag.getItemCount(costArr0[0][1]);
				let color = count2 >= costArr0[0][2] ? 2 : 6;
				HtmlUtil.fontNoSize("(" + count2 + "/" + costArr0[0][2] + ")", Color.getColorStr(color));
				let count0 = Model_Bag.getItemCount(costArr0[0][1]);
				a.upStarBt.checkNotice = count0 >= costArr0[0][2];
			} else {
				a.upStarBt.checkNotice = false;
			}

			if (a.vo.level < a.vo.levelMax) {
				let costArr1: Array<any> = a.vo.consume_level;
				let costVo1: VoItem = VoItem.create(costArr1[0][1]);
				let count1 = Model_Bag.getItemCount(costArr1[0][1]);
				if (count1 >= costArr1[0][2]) {
					a.costLb1.setCount(HtmlUtil.fontNoSize(count1 + "/" + costArr1[0][2], Color.getColorStr(2)));
					a.upLvBt.checkNotice = true;
				} else {
					a.costLb1.setCount(HtmlUtil.fontNoSize(count1 + "/" + costArr1[0][2], Color.getColorStr(6)));
					a.upLvBt.checkNotice = false;
				}
				a.costLb1.setImgUrl(costVo1.icon);
				a.itemNameLb.visible = true;
				a.itemNameLb.text = costVo1.name;
				a.itemNameLb.color = costVo1.qColor;
			} else {
				a.upLvBt.checkNotice = false;
				a.costLb1.setCount("已满级");
				a.costLb1.setImgUrl();
				a.itemNameLb.visible = false;
			}
			a.levelBar.value = a.vo.level;
			a.levelBar.max = a.vo.levelMax;
			let attarr = a.vo.attr_level;
			let attstr: string = "";
			let attstr1: string = "";
			let nextcfg = Config.piclv_005[a.vo.next_level];
			if (nextcfg) {
				let attarr1 = JSON.parse(nextcfg.attr);
				for (let i = 0; i < attarr.length; i++) {
					if (i == 0) {
						attstr += Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
						attstr1 += "+" + (attarr1[i][1] + a.vo.attr_jihuo[i][1]);
					} else {
						attstr += "\n" + Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
						attstr1 += "\n+" + (attarr1[i][1] + a.vo.attr_jihuo[i][1]);
					}
				}
			} else {
				for (let i = 0; i < attarr.length; i++) {
					if (i == 0) {
						attstr += Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
						attstr1 += "已满级";
					} else {
						attstr += "\n" + Vo_attr.getShowStr(attarr[i][0], attarr[i][1] + a.vo.attr_jihuo[i][1]);
						attstr1 += "\n" + "已满级";
					}
				}
			}
			a.nextAttLb.text = attstr1;
			a.curAttLb.text = attstr;
			if (a.vo.level >= a.vo.levelMax && a.vo.next_star <= 0) {
				a.upLvBt.enabled = false;
			} else {
				a.upLvBt.enabled = true;
			}
			a.powerLb.text = "升级战力：" + (a.vo.power0 + a.vo.power1 + a.vo.power2) + "";
		} else {
			a.showBt.visible = false;
			a.c1.selectedIndex = 0;
			let costArr0: Array<any> = a.vo.activation_jihuo;
			let costVo0: VoItem = VoItem.create(costArr0[0][1]);
			costVo0.count = costArr0[0][2];
			a.grid.vo = costVo0;
			a.grid.tipEnabled = true;
			let count = Model_Bag.getItemCount(costArr0[0][1]);
			let color = count >= costVo0.count ? 2 : 6;
			a.grid.showText = HtmlUtil.fontNoSize(count + "/" + costVo0.count, Color.getColorStr(color));
			a.jihuoBt.checkNotice = count >= costVo0.count;
			let attarr = a.vo.attr_jihuo;
			let attstr0: string = "";
			let attstr1: string = "";
			for (let i = 0; i < attarr.length; i++) {
				if (i == 0) {
					attstr0 += Vo_attr.getShowStr(attarr[i][0], 0);
					attstr1 += "+" + attarr[i][1];
				} else {
					attstr0 += "\n" + Vo_attr.getShowStr(attarr[i][0], 0);
					attstr1 += "\n+" + attarr[i][1];
				}
			}
			a.curAttLb.text = attstr0;
			a.nextAttLb.text = attstr1;
			a.powerLb.text = "升级战力：0";
		}
		a.item.vo = a.vo;
	}

	public onShown(vo: Vo_TuJian): void {
		let a = this;
		a.updateShow(vo);
	}

	public onHide(): void {
		let a = this;
		a.grid.showEff(false);
		a.item.clean();
	}
}