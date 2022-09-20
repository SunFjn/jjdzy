// class View_ShouLing_Panel extends UIModalPanel {

// 	public c1: fairygui.Controller;
// 	public levelName: fairygui.GRichTextField;
// 	public curAttLb: fairygui.GRichTextField;
// 	public nextAttLb: fairygui.GRichTextField;
// 	public costItem: ViewResource;
// 	public powerLb: fairygui.GLabel;
// 	public upBt: Button0;
// 	public tabArr: Array<TabButton> = [];
// 	public typeImg: fairygui.GLoader;
// 	public upBtGroup: fairygui.GGroup;
// 	public attgroup: fairygui.GGroup;
// 	public maxGroup: fairygui.GGroup;
// 	public attLb: fairygui.GRichTextField;

// 	public static URL: string = "ui://3tzqotadi7mo5";

// 	public constructor() {
// 		super();
// 		if (GGlobal.packDic["role"]) {
// 			this.childrenCreated();
// 		} else {
// 			this.loadRes("role", "role_atlas0");
// 		}
// 	}

// 	protected childrenCreated(): void {
// 		GGlobal.createPack("role");
// 		let a = this;
// 		a.view = fairygui.UIPackage.createObject("role", "View_ShouLing_Panel").asCom;
// 		a.contentPane = a.view;
// 		a.c1 = a.view.getController("c1");
// 		a.levelName = <fairygui.GRichTextField><any>(a.view.getChild("levelName"));
// 		a.curAttLb = <fairygui.GRichTextField><any>(a.view.getChild("curAttLb"));
// 		a.attLb = <fairygui.GRichTextField><any>(a.view.getChild("attLb"));
// 		a.nextAttLb = <fairygui.GRichTextField><any>(a.view.getChild("nextAttLb"));
// 		a.costItem = <ViewResource><any>(a.view.getChild("costItem"));
// 		a.powerLb = <fairygui.GLabel><any>(a.view.getChild("powerLb"));
// 		a.upBt = <Button0><any>(a.view.getChild("upBt"));
// 		a.typeImg = <fairygui.GLoader><any>(a.view.getChild("typeImg"));
// 		a.attgroup = <fairygui.GGroup><any>(a.view.getChild("attgroup"));
// 		a.upBtGroup = <fairygui.GGroup><any>(a.view.getChild("upBtGroup"));
// 		a.maxGroup = <fairygui.GGroup><any>(a.view.getChild("maxGroup"));
// 		for (let i = 0; i < 4; i++) {
// 			let tab: TabButton = <TabButton><any>(a.view.getChild("tab" + i));
// 			a.tabArr.push(tab);
// 		}
// 		super.childrenCreated();
// 		a.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, a.checkTabNotice, this);
// 		GGlobal.modelsl.CG_OPEN_SHOULING();
// 		a.upBt.addClickListener(a.upHandle, this);
// 	}

// 	public upHandle(): void {
// 		let a = this;
// 		if (a.upBt.checkNotice) {
// 			GGlobal.modelsl.CG_UPGRADE_SHOULING(Model_ShouLing.slArr[a.c1.selectedIndex]);
// 		} else {
// 			let cfg = Config.shoulin_704[Model_ShouLing.slArr[a.c1.selectedIndex]];
// 			let costArr: Array<any> = JSON.parse(cfg.consume);
// 			let itemVo: VoItem = VoItem.create(costArr[0][1]);
// 			View_CaiLiao_GetPanel.show(itemVo);
// 		}
// 	}

// 	public updateShow(): void {
// 		let a = this;
// 		let cfg = Config.shoulin_704[Model_ShouLing.slArr[a.c1.selectedIndex]];
// 		ImageLoader.instance.loader("resource/image/shouling/" + (a.c1.selectedIndex + 1) + ".png", a.typeImg);
// 		let nextcfg;
// 		let attArr0: Array<any>;
// 		let attArr1: Array<any>;
// 		let attstr0: string = "";
// 		let attstr1: string = "";
// 		a.powerLb.text = cfg.fight + "";
// 		a.levelName.text = cfg.name + "  Lv." + cfg.lv;
// 		nextcfg = Config.shoulin_704[cfg.next];
// 		a.attgroup.visible = false;
// 		a.upBtGroup.visible = true;
// 		a.attLb.visible = false;
// 		a.maxGroup.visible = false;
// 		if (cfg.lv != 0) {
// 			attArr0 = JSON.parse(cfg.attr);
// 			if (cfg.next > 0) {
// 				attArr1 = JSON.parse(nextcfg.attr);
// 				for (let i = 0; i < attArr0.length; i++) {
// 					if (i == 0) {
// 						attstr0 += Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
// 						attstr1 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
// 					} else {
// 						attstr0 += "\n" + Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
// 						attstr1 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
// 					}
// 				}
// 				a.curAttLb.text = attstr0;
// 				a.nextAttLb.text = attstr1;
// 				a.attgroup.visible = true;
// 				a.updateCost();
// 			} else {

// 				for (let i = 0; i < attArr0.length; i++) {
// 					if (i == 0) {
// 						attstr0 += Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
// 					} else {
// 						attstr0 += "\n" + Vo_attr.getShowStr(attArr0[i][0], attArr0[i][1]);
// 					}
// 				}
// 				a.attLb.text = ConfigHelp.attrString(attArr0, "+", Color.getColorStr(1), Color.getColorStr(2));
// 				a.attLb.visible = true;
// 				a.maxGroup.visible = true;
// 				a.upBtGroup.visible = false;
// 			}
// 		} else {
// 			attArr1 = JSON.parse(nextcfg.attr);
// 			for (let i = 0; i < attArr1.length; i++) {
// 				if (i == 0) {
// 					attstr0 += Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
// 				} else {
// 					attstr0 += "\n" + Vo_attr.getShowStr(attArr1[i][0], attArr1[i][1]);
// 				}
// 			}
// 			a.attLb.text = attstr0;
// 			a.attLb.visible = true;
// 			a.updateCost();
// 		}
// 	}

// 	private updateCost() {
// 		let a = this;
// 		let cfg = Config.shoulin_704[Model_ShouLing.slArr[a.c1.selectedIndex]];
// 		let costArr: Array<any> = JSON.parse(cfg.consume);
// 		let count = Model_Bag.getItemCount(costArr[0][1]);
// 		let itemVo: VoItem = VoItem.create(costArr[0][1]);
// 		if (cfg.next > 0) {
// 			a.upBt.checkNotice = count >= costArr[0][2];
// 			a.costItem.setLb(count, costArr[0][2]);
// 			a.costItem.setImgUrl(itemVo.icon)
// 		} else {
// 			a.upBt.checkNotice = false;
// 		}
// 		a.upBt.text = cfg.lv > 0 ? "升级" : "激活";
// 	}

// 	public checkTabNotice(): void {
// 		let a = this;
// 		let len = a.tabArr.length;
// 		for (let i = 0; i < len; i++) {
// 			a.tabArr[i].checkNotice = Model_ShouLing.checkTabNotice(i);
// 		}
// 		a.updateShow();
// 	}

// 	protected onShown(): void {
// 		let a = this;
// 		if (a.c1.selectedIndex == 0) {
// 			a.checkTabNotice();
// 		} else {
// 			a.c1.selectedIndex = 0;
// 		}
// 		GGlobal.reddot.listen(ReddotEvent.CHECK_SHOULING, a.checkTabNotice, this);
// 	}

// 	protected onHide(): void {
// 		GGlobal.layerMgr.close(UIConst.SHOULING);
// 		GGlobal.reddot.remove(ReddotEvent.CHECK_SHOULING, this.checkTabNotice, this);
// 	}
// }