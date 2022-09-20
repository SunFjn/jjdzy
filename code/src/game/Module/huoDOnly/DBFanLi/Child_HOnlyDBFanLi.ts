/**单笔返利 */
class Child_HOnlyDBFanLi extends fairygui.GComponent {
	public bg: fairygui.GLoader;
	public list: fairygui.GList;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GTextField;

	public static URL: string = "ui://mk3gp0vrhndy8";

	private datas: Vo_HuoDong[];

	private static _instance: Child_HOnlyDBFanLi
	public static get instance(): Child_HOnlyDBFanLi {
		if (Child_HOnlyDBFanLi._instance == null) {
			Child_HOnlyDBFanLi._instance = <Child_HOnlyDBFanLi><any>(fairygui.UIPackage.createObject("huoDOnly", "Child_HOnlyDBFanLi"));
		}
		return Child_HOnlyDBFanLi._instance
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);

		this.list.setVirtual();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.itemRender;
	}

	private itemRender(index: number, item: Item_HOnlyDBFanLi) {
		item.setData(this.datas[index], this._act);
	}

	private _act: Vo_Activity;
	public show(p: fairygui.GComponent, act: Vo_Activity): void {
		let s = this;
		this._act = act;
		p.addChild(s);
		s.setXY(0, 275);

		GGlobal.control.listen(Enum_MsgType.HUOD_ONLY_DBFANLI, s.setList, s);
		GGlobal.modelHuoDOnly.CG_OPEN_UI(act.id);
		// IconUtil.setImg(s.bg, "resource/image/sanGuoQD/" + UIConst.DANBIFANLI + ".jpg");
		IconUtil.setImg(s.bg, Enum_Path.PIC_URL + "zs" + Config.zshd_315[this._act.index].bg + ".jpg");
		s.updateX();
		s.setList();
		Timer.instance.listen(this.updateX, this, 1000);
		s.labTips.text = Config.zshdb_315[act.id].nr
	}

	disposePanel() {
		let s = this;
		if (s.parent) {
			s.parent.removeChild(s);
		}
		GGlobal.control.remove(Enum_MsgType.HUOD_ONLY_DBFANLI, s.setList, s);
		Timer.instance.remove(s.updateX, s);
		s.datas = [];
		s.list.numItems = 0;
		IconUtil.setImg(s.bg, null);
	}

	private setList() {
		this.datas = this.getListDataDaiOne(Model_HuoDOnly.getDBFanLi(this._act.id), Config.zshddbfl_315)
		this.list.numItems = this.datas.length;
	}

	private updateX() {
		if (this._act) {
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4(d)
			}
		}
		else {
			this.labTime.text = "剩余时间："
		}
	}

	//单笔充值
	private getListDataDaiOne(arr: Array<Vo_HuoDong>, cfg: Record<string, Izshddbfl_315>): Array<any> {
		let len = arr ? arr.length : 0
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		for (let i = 0; i < len; i++) {
			let v = arr[i]
			// let max = cfg[v.id].cs
			// let $status = arr ? arr[i].getStaCt(max) : 0
			if (v.canCt > 0) {//可领取
				arr1.push(arr[i]);
			} else if (v.canCt == 0 && v.hasCt == 0) {//已领取
				arr3.push(arr[i]);
			} else {
				arr2.push(arr[i]);
			}
		}
		arr1.sort(function (a, b) { return a.id - b.id });
		arr2.sort(function (a, b) { return a.id - b.id });
		arr3.sort(function (a, b) { return a.id - b.id });
		return arr1.concat(arr2).concat(arr3);
	}
}