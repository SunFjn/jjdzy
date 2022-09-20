/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
class View_KaiFKH extends UIPanelBase {
	public c1: fairygui.Controller;
	public frame: fairygui.GLabel;
	public imgloader: fairygui.GLoader;
	public lst: fairygui.GList;
	public lbTime: fairygui.GRichTextField;
	public lbDate: fairygui.GRichTextField;
	public tabList: fairygui.GList;
	public child_SJKH: Child_ShenJiangKuangHuan;
	private SJKHVO: any[];
	private left: fairygui.GImage;
	private right: fairygui.GImage;
	/**用于控制是否开启神将狂欢的 */
	public static isShenJiangKuanghuan = false;

	public static URL: string = "ui://yk4rwc6rd7mw0";

	public constructor() {
		super();
		this.setSkin("kaifukuanghuan", "kaifukuanghuan_atlas0", "View_KaiFKH");
		View_KaiFKH.isShenJiangKuanghuan = false;
	}
	protected setExtends() {
		fairygui.UIObjectFactory.setPackageItemExtension(KaiFuIt.URL, KaiFuIt);
		fairygui.UIObjectFactory.setPackageItemExtension(Child_ShenJiangKuangHuan.URL, Child_ShenJiangKuangHuan);
		fairygui.UIObjectFactory.setPackageItemExtension(SJKH_Item.URL, SJKH_Item);
	}
	protected initView(): void {
		super.initView();
		let s = this;
		s.lst.setVirtual();
		s.lst.callbackThisObj = s;
		s.lst.itemRenderer = s.itemRender;
		s.tabList.callbackThisObj = s;
		s.tabList.itemRenderer = s.renderHandle;
		s.tabList.addEventListener(fairygui.ItemEvent.CLICK, s.setTab, s);
		s.right.displayObject.touchEnabled = true;
		s.left.displayObject.touchEnabled = true;
		CommonManager.listPageChange("View_KaiFKH", s.tabList, s.left, s.right, 5);
		s.right.visible = View_KaiFKH.isShenJiangKuanghuan;
		s.left.visible = View_KaiFKH.isShenJiangKuanghuan;
	}

	private iconArr = [];
	private curTab: ComActivityTab;
	private renderHandle(index: number, tab: ComActivityTab): void {
		let a = this;
		tab.data = a.iconArr[index];
		tab.setActivityIcon(a.iconArr[index]);
		tab.checkNotice = a.check(parseInt(a.iconArr[index]))
		if (!a.curTab && index == 0) {
			tab.selected = true;
			a.curTab = tab;
		}
	}

	private check(id) {
		let redMgr = GGlobal.reddot;
		let m = GGlobal.model_KaiFKH;
		switch (id) {
			case 51011:
				return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 0);//等级狂欢
			case 51012:
				return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 1);//晋升狂欢
			case 51013:
				return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, m.getThemeType() - 1);//主题狂欢
			case 51014:
				return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 9);//元宝狂欢 
			case 51015:							// type - 1 了，所以这里是 填 14， 15 而不是 15， 16
				return redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 14) || redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 15);
		}
		return false;
	}

	private createTabs() {
		// this.iconArr = Model_Activity.activityObj[UIConst.QUANMIN_KUANGHUAN];
		//51015, 这个序号是神将狂欢的
		if (View_KaiFKH.isShenJiangKuanghuan) {
			this.iconArr = [51015, 51011, 51012, 51013, 51014]//GGlobal.modelActivity.getGroup(UIConst.KAIFUKUANGHUAN);
		} else {
			this.iconArr = [51011, 51012, 51013, 51014]//GGlobal.modelActivity.getGroup(UIConst.KAIFUKUANGHUAN);
		}

		if (!this.iconArr) return;
		this.tabList.numItems = this.iconArr.length;
	}

	private itemRender(idx, obj) {
		let it: KaiFuIt = obj;
		it.setdata(this.dta[idx]);
	}



	public update(arg = 0) {
		let s = this;
		let m = GGlobal.model_KaiFKH;
		let day = Model_GlobalMsg.kaifuDay;
		let idx;
		if (View_KaiFKH.isShenJiangKuanghuan) {
			idx = s.tabList.selectedIndex + 1;
		} else {
			idx = s.tabList.selectedIndex;
		}
		//	this.c1.selectedIndex = 0;

		if (View_KaiFKH.isShenJiangKuanghuan) {
			if (idx == 0) {
				s.dta = m.data[5];
				this.c1.selectedIndex = 1;
			} else {
				this.c1.selectedIndex = 0;
				if (idx == 4) {
					s.dta = m.data[3][day];
				} else if (idx == 1) {
					//s.dta = m.data[5];
				} else {
					s.dta = m.data[idx - 1];
				}
				s.dta.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
			}
		} else {
			if (idx == 2) {	//主题狂欢的
				s.dta = m.data[idx + 1][day];
			} else {
				s.dta = m.data[idx + 1];
			}
			s.dta.sort(function (a, b) { return a.getSortIndex() < b.getSortIndex() ? -1 : 1; });
		}
		s.lst.numItems = s.dta.length;
		s.createTabs();
	}

	//旧版本的红点检测
	// private check() {
	// 	let redMgr = GGlobal.reddot;
	// 	let m = GGlobal.model_KaiFKH;
	// 	for (let i = 0; i < 4; i++) {
	// 		let ret = false;
	// 		if (i == 2) {
	// 			ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, m.getThemeType()-1);
	// 		} else 	if (i == 3) {
	// 			ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, 9);
	// 		} else{
	// 			ret = redMgr.checkCondition(UIConst.KAIFUKUANGHUAN, i);
	// 		}
	// 		this["t" + i].checkNotice = ret;
	// 	}
	// }



	public updateX() {
		let idx = this.tabList.selectedIndex;
		//倒计时用 
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 - (ms - h0);

		if (idx == 3 && View_KaiFKH.isShenJiangKuanghuan) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
		} else if (idx == 2 && !View_KaiFKH.isShenJiangKuanghuan) {
			this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
		} else {
			let day = Model_GlobalMsg.kaifuDay;
			day = day > 7 ? 7 : day;
			if (8 - day > 1) {
				this.lbTime.text = "剩余时间：<font color='#15f234'>" + (7 - day) + "天" + DateUtil.getMSBySecond5((ax / 1000) >> 0) + "</font>";
			} else {
				this.lbTime.text = "剩余时间：<font color='#15f234'>" + DateUtil.getHMSBySecond((ax / 1000) >> 0) + "</font>";
			}
		}
	}
	//分别是神将狂欢，等级狂欢，晋升狂欢，主题狂欢，元宝狂欢
	private setTab() {
		this.child_SJKH.clean();
		let idx = this.tabList.selectedIndex + 1;
		let day = 0
		let m = GGlobal.model_KaiFKH;
		if (View_KaiFKH.isShenJiangKuanghuan) {
			IconUtil.setImg(this.imgloader, Enum_Path.PIC_URL + "kaifukuanghuan" + idx + ".jpg");
		} else {
			IconUtil.setImg(this.imgloader, Enum_Path.PIC_URL + "kaifukuanghuan" + (idx + 1) + ".jpg");
		}

		if (this.tabList.selectedIndex == 0 && View_KaiFKH.isShenJiangKuanghuan) {
			this.c1.selectedIndex = 1;
		} else {
			this.c1.selectedIndex = 0;
		}
		day = Model_GlobalMsg.kaifuDay;
		day = day > 7 ? 7 : day;

		let vo: Vo_KaiFuKH;
		this.updateX();
		if (View_KaiFKH.isShenJiangKuanghuan) {
			if (idx == 4) {
				vo = m.data[3][day][0];	//主题狂欢的
			} else if (idx == 1) {
				vo = m.data[5][0];	//这是申请神将狂欢的
			} else {//if(idx == 2){
				vo = m.data[idx - 1][0];//其他类型的
			}
		} else {
			if (idx == 3) {	//主题狂欢的
				vo = m.data[idx][day][0];
			} else {	//其他类型的
				vo = m.data[idx][0];
			}
		}
		idx = vo.type;
		GGlobal.model_KaiFKH.CG_OPEN(idx);
	}

	private refreshSJKHList(arg) {
		let data = arg.data;
		if (this.SJKHVO.length > 0) {
			for (let i = 0; i < this.SJKHVO.length; i++) {
				if (data.id == this.SJKHVO[i].id) {
					if (this.SJKHVO[i].reward == 1) {
						this.SJKHVO[i].reward = data.reward;
					}
					if (this.SJKHVO[i].limitSt == 1) {
						this.SJKHVO[i].limitSt = data.limitSt;
						this.SJKHVO[i].lastNum = data.lastNum;
					}
					this.child_SJKH.updateData(this.SJKHVO);
					GGlobal.reddot.setCondition(UIConst.KAIFUKUANGHUAN, this.SJKHVO[i].type - 1, false);
					break;
				}
			}
			for (let i = 0; i < this.SJKHVO.length; i++) {
				let state = this.SJKHVO[i].reward == 1 || (this.SJKHVO[i].limitSt == 1 && this.SJKHVO[i].lastNum > 0);
				GGlobal.reddot.setCondition(UIConst.KAIFUKUANGHUAN, this.SJKHVO[i].type - 1, state);
				if (state) {
					break;
				}
			}
			GGlobal.reddot.notify(Enum_MsgType.KAIFUKUANGHUAN);
			this.createTabs();
		}

	}

	private dta;
	protected onShown() {
		let s = this;
		let m = GGlobal.model_KaiFKH;
		if (!m.mapObj) m.init();
		let day = Model_GlobalMsg.kaifuDay;
		s.createTabs();
		s.tabList.selectedIndex = 0;
		//s.lbTime.text = "剩余时间：<font color='#15f234'>" + (8 - day) + "天</font>";
		GGlobal.reddot.listen(ReddotEvent.CHECKKFKH, s.createTabs, s);
		GGlobal.control.listen(Enum_MsgType.KAIFUKUANGHUAN, s.update, s);
		GGlobal.control.listen(Enum_MsgType.SHENJIANGKUANGHUAN, s.updateSJKH, s);
		GGlobal.control.listen(Enum_MsgType.SJKHREFRESHLIST, s.refreshSJKHList, s);
		Timer.instance.listen(s.updateX, s, 1000);
		//s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.ctrlChange, s)
		s.setTab();
	}

	protected onHide() {
		let s = this;
		s.lst.numItems = 0;
		GGlobal.reddot.remove(ReddotEvent.CHECKKFKH, s.createTabs, s);
		GGlobal.control.remove(Enum_MsgType.KAIFUKUANGHUAN, s.update);
		GGlobal.control.remove(Enum_MsgType.SHENJIANGKUANGHUAN, s.updateSJKH);
		GGlobal.control.remove(Enum_MsgType.SJKHREFRESHLIST, s.refreshSJKHList);
		Timer.instance.remove(s.updateX, s);
		//s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.ctrlChange, s)
		GGlobal.layerMgr.close(UIConst.KAIFUKUANGHUAN);
		IconUtil.setImg(this.imgloader, null);
	}

	private updateSJKH(arg) {
		this.SJKHVO = arg.data;
		this.child_SJKH.updateData(arg.data);
	}
}