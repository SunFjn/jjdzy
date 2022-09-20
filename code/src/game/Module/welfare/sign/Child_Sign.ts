class Child_Sign extends fairygui.GComponent {

	public list: fairygui.GList;
	public boxArr: fairygui.GLoader[] = [];
	public drawImgArr: fairygui.GImage[] = [];
	public noticeImgArr: fairygui.GImage[] = [];
	public expbar: fairygui.GProgressBar;
	public jihuoBt: fairygui.GButton;
	public jihuoLb: fairygui.GRichTextField;
	public resetLb: fairygui.GRichTextField;
	public lbImg: fairygui.GImage;

	public static URL: string = "ui://ye1luhg3r6x4d";

	private static instance: Child_Sign;
	public static createInstance(): Child_Sign {
		if (!Child_Sign.instance) Child_Sign.instance = <Child_Sign><any>(fairygui.UIPackage.createObject("Welfare", "Child_Sign"));
		return Child_Sign.instance;
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let a = this;
		a.list = <fairygui.GList><any>(a.getChild("list"));
		a.list.callbackThisObj = a;
		a.list.itemRenderer = a.renderHandle;
		a.list.setVirtual();
		for (let i = 0; i < 5; i++) {
			let box: fairygui.GLoader = <fairygui.GLoader><any>(a.getChild("box" + i));
			box.data = i;
			box.addClickListener(a.onBox, a);
			a.boxArr.push(box);
			let drawImg = <fairygui.GImage><any>(a.getChild("drawImg" + i));
			a.drawImgArr.push(drawImg);
			let noticeImg = <fairygui.GImage><any>(a.getChild("noticeImg" + i));
			a.noticeImgArr.push(noticeImg);
		}
		a.expbar = <fairygui.GProgressBar><any>(a.getChild("expbar"));
		a.expbar.max = 30;
		a.jihuoBt = <fairygui.GButton><any>(a.getChild("jihuoBt"));
		a.jihuoLb = <fairygui.GRichTextField><any>(a.getChild("jihuoLb"));
		a.resetLb = <fairygui.GRichTextField><any>(a.getChild("resetLb"));
		a.lbImg = <fairygui.GImage><any>(a.getChild("lbImg"));
		a.jihuoBt.addClickListener(a.onJiHuo, a);
		GGlobal.modelwelfare.CG_OPEN_SIGN();
	}

	private onJiHuo() {
		if (GGlobal.isIOS) {
			ViewAlert.show("由于苹果政策影响，iOS暂未开放充值", Handler.create(this, null), ViewAlert.OK);
		} else {
			GGlobal.layerMgr.open(UIConst.TEQUAN);
		}
	}

	private onBox(evt: egret.TouchEvent) {
		let index = evt.target.data;
		let arr = [3, 5, 7, 15, 30];
		let cfg = Config.qdbaoxiang_720[arr[index]];
		let rewardArr = JSON.parse(cfg.AWARD);
		let reward = ConfigHelp.makeItemListArr(rewardArr);
		let color = 0;
		let text1: string = "";
		if (Model_Welfare.signNum >= arr[index]) {
			color = 2;
		} else {
			color = 6;
		}
		let state = Model_Welfare.signBoxArr[index];
		switch (Model_Welfare.signBoxArr[index]) {
			case 0:
				text1 = HtmlUtil.fontNoSize("满足条件后可领取", Color.getColorStr(6));
				break;
			case 1:
				text1 = null;
				break;
			case 2:
				text1 = null;
				break;
		}
		View_Reward_Show.show(reward, "累计签到达到" + arr[index] + "天可领取" + HtmlUtil.fontNoSize("(" + Model_Welfare.signNum + "/" + arr[index] + ")",
			Color.getColorStr(color)), text1, Handler.create(this, this.onDraw, [arr[index]]), state);
	}

	private onDraw(index) {
		GGlobal.layerMgr.close2(UIConst.REWARD_SHOW);
		GGlobal.modelwelfare.CG_SIGN_DRAW_BOXREWARD(index);
	}

	private listHandle(evt: fairygui.ItemEvent): void {
		let grid: SignGrid = evt.itemObject as SignGrid;
		switch (grid.state) {
			case 0:
				break;
			case 1:
				GGlobal.modelwelfare.CG_SIGN_BYDAY(grid.day)
				break;
			case 2:
				break;
			case 3:
				let money = Config.xtcs_004[2002].num;
				ViewAlert.show("是否花费" + HtmlUtil.fontNoSize(money + "元宝", Color.getColorStr(5)) + "进行补签", Handler.create(this, this.okHandle, [money, grid.day]))
				break;
		}
	}

	private okHandle(money, day) {
		if (Model_player.voMine.yuanbao < money) {
			ModelChongZhi.guideToRecharge();
			return;
		}
		GGlobal.modelwelfare.CG_REPAIRSIGN_BYDAY(day);
	}

	private renderHandle(index: number, obj: fairygui.GObject): void {
		let grid: SignGrid = obj as SignGrid;
		let cfg = Config.qiandao_720[Model_Welfare.qishu * 1000 + index + 1];
		let arr = Model_Welfare.signArr;
		let arr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.AWARD));
		if (index < arr.length) {
			grid.show(arr1[0], arr[index], index + 1);
		} else {
			grid.show(arr1[0], 0, index + 1);
		}
	}

	private updateShow() {
		let a = this;
		if (Model_Welfare.qishu <= 0) return;
		a.list.numItems = 30;
		let arr = [3, 5, 7, 15, 30];
		for (let i = 0; i < a.drawImgArr.length; i++) {
			a.drawImgArr[i].visible = Model_Welfare.signBoxArr[i] == 2;
			a.noticeImgArr[i].visible = Model_Welfare.signBoxArr[i] == 1 || (Model_Welfare.signNum >= arr[i] && Model_Welfare.signBoxArr[i] == 0);
		}
		a.expbar.value = Model_Welfare.signNum;
		if (GGlobal.isIOS) {
			a.jihuoLb.visible = false;
			a.lbImg.visible = a.jihuoBt.visible = false;
		} else if (GGlobal.modelvip.getTeQuan(3)) {
			a.jihuoLb.visible = true;
			a.lbImg.visible = a.jihuoBt.visible = false;
		} else {
			a.jihuoLb.visible = false;
			a.lbImg.visible = a.jihuoBt.visible = true;
		}
		a.resetLb.text = Model_Welfare.resetDay + "天后重置签到信息";
	}

	public show(): void {
		let a = this;
		a.updateShow();
		a.list.addEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.listen(UIConst.WELFARE, a.updateShow, a);
	}

	public clean() {
		let a = this;
		a.list.numItems = 0;
		a.list.removeEventListener(fairygui.ItemEvent.CLICK, a.listHandle, a);
		GGlobal.reddot.remove(UIConst.WELFARE, a.updateShow, a);
	}
}