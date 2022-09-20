class ChildGroupB814 extends fairygui.GComponent implements ICZFLView {

	public c1: fairygui.Controller;
	public list: fairygui.GList;
	public tab0: TabButton1;
	public tab1: TabButton1;
	public tab2: TabButton1;
	public tab3: TabButton1;
	public tab4: TabButton1;
	public imgHeadbg: fairygui.GLoader;
	public imgCharge: fairygui.GImage;
	public labTime: fairygui.GRichTextField;
	public labTips: fairygui.GRichTextField;
	public labCharge: fairygui.GRichTextField;

	public static URL: string = "ui://qzsojhcrr2r0h";

	private tabList: TabButton1[];

	public static createInstance(): ChildGroupB814 {
		return <ChildGroupB814><any>(fairygui.UIPackage.createObject("chaozhifanli", "ChildGroupBuy"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getController("c1");
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.tab0 = <TabButton1><any>(this.getChild("tab0"));
		this.tab1 = <TabButton1><any>(this.getChild("tab1"));
		this.tab2 = <TabButton1><any>(this.getChild("tab2"));
		this.tab3 = <TabButton1><any>(this.getChild("tab3"));
		this.tab4 = <TabButton1><any>(this.getChild("tab4"));
		this.imgHeadbg = <fairygui.GLoader><any>(this.getChild("imgHeadbg"));
		this.imgCharge = <fairygui.GImage><any>(this.getChild("imgCharge"));
		this.labTime = <fairygui.GRichTextField><any>(this.getChild("labTime"));
		this.labTips = <fairygui.GRichTextField><any>(this.getChild("labTips"));
		this.labCharge = <fairygui.GRichTextField><any>(this.getChild("labCharge"));

		this.list.setVirtual();
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.renderHD;
		this.tabList = [this.tab0, this.tab1, this.tab2, this.tab3, this.tab4];
	}

	private static _inst: ChildGroupB814;
	public static getInst() {
		return this._inst || (this._inst = ChildGroupB814.createInstance());
	}

	private dta: Vo_HuoDong[][];
	private tabDta: number[];
	private listDta: Vo_HuoDong[];
	private renderHD(idx, obj) {
		let item: VGroupBuyI814 = obj as VGroupBuyI814;
		item.setVo(this.listDta[idx]);
	}

	public updateX() {
		if (this._act) {
			//倒计时用
			var d = this._act.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
			if (d < 0) {
				this.labTime.text = "剩余时间：已结束"
			} else {
				let ax = this.oneDayTime()
				if (ax < 0) {
					ax = 0
				}
				this.labTime.text = "剩余时间：" + DateUtil.getMSBySecond4((ax / 1000) >> 0);
			}
		} 
		else {
			this.labTime.text = "剩余时间："
		}
	}

	private oneDayTime(): number {
		let ms = Model_GlobalMsg.getServerTime();
		let data = DateUtil.clearHourse(new Date(ms));
		let h0 = data.getTime();
		let ax = 86400000 + h0 - ms;
		return ax
	}

	private update() {
		let s = this;
		let m = GGlobal.modelGroupB814;
		s.upCharge();
		s.tabDta = [];
		s.dta = [];
		let index = -1;
		for (let i = 0; i < m.buyArr.length; i++) {
			let v = m.buyArr[i];
			let conf = Config.sctg3_730[v.id]
			if (s.tabDta.indexOf(conf.renshu) == -1) {
				s.tabDta.push(conf.renshu)
				index++
				s.dta[index] = [];
			}
			s.dta[index].push(v);
		}
		for (let i = 0; i < s.tabDta.length; i++) {
			this.tabList[i].text = "团购" + s.tabDta[i] + "人"
			let arr = s.dta[i];
			let check = false;
			for(let j = 0; j < arr.length; j++){
				let v = arr[j];
				if(v.status == 1){
					check = true;
					break;
				}
			}
			this.tabList[i].checkNotice = check
		}
		s.pageChange()
	}

	private upCharge(){
		let s = this;
		let m = GGlobal.modelGroupB814;
		s.labCharge.text = "今日已充：" + m.charge + "元";
	}

	private lastWeek = -1;
	public open() {
		let s = this;
		IconUtil.setImg(this.imgHeadbg, Enum_Path.PIC_URL + "shouchongtuangou.jpg");
		GGlobal.control.listen(Enum_MsgType.GROUP_BUY_UI, s.update, s);
		GGlobal.control.listen(Enum_MsgType.GROUP_BUY_CHARGE, s.upCharge, s);
		GGlobal.control.listen(Enum_MsgType.GROUP_BUY_NUM, s.pageChange, s);
		s.c1.addEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
		Timer.instance.listen(this.updateX, this, 1000);
		s.update();
		this._act = ModelEightLock.getActVo(UIConst.GROUP_B814);
		GGlobal.modelEightLock.CG4571(UIConst.GROUP_B814);
	}
	private _act: Vo_Activity

	public close() {
		let s = this;
		IconUtil.setImg(this.imgHeadbg, null);
		GGlobal.control.remove(Enum_MsgType.GROUP_BUY_UI, s.update, s);
		GGlobal.control.remove(Enum_MsgType.GROUP_BUY_CHARGE, s.upCharge, s);
		GGlobal.control.remove(Enum_MsgType.GROUP_BUY_NUM, s.pageChange, s);
		s.c1.removeEventListener(fairygui.StateChangeEvent.CHANGED, s.pageChange, s);
		Timer.instance.remove(this.updateX, this);
		s.c1.selectedIndex = 0;
	}

	private pageChange(): void {
		let s = this;
		let i = s.c1.selectedIndex
		if(s.dta == null || s.dta[i] == null ){
			s.list.numItems = 0;
			return;
		}
		s.listDta = this.getListData(s.dta[i]);
		s.list.numItems = s.listDta.length;
	}

	private getListData(arr: Array<Vo_HuoDong>): Array<any> {
		let len = arr ? arr.length : 0
		let arr1 = [];//可领取
		let arr2 = [];//不能领取
		let arr3 = [];//已领取
		for (let i = 0; i < len; i++) {
			let $status = arr ? arr[i].status : 0
			if ($status == 1) {
				arr1.push(arr[i]);
			} else if ($status == 2) {
				arr3.push(arr[i]);
			} else {
				arr2.push(arr[i]);
			}
		}
		return arr1.concat(arr2).concat(arr3);
	}
}