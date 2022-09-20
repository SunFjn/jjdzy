class Child_ChaoZhiZP extends fairygui.GComponent implements ICZFLView {

	public gridArr: ViewGrid[] = [];
	public expBar: fairygui.GProgressBar;
	public draw0: Button0;
	public draw1: Button1;
	public boxBt: Button2;
	public chooseImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public drawNumLb: fairygui.GRichTextField;
	public noteLb: fairygui.GRichTextField;
	public myNoteLb: fairygui.GRichTextField;
	public timeLb: fairygui.GRichTextField;
	public linkLb: fairygui.GRichTextField;
	public checkBox: fairygui.GButton;

	public static URL: string = "ui://qzsojhcrhn3o3";

	public static createInstance(): Child_ChaoZhiZP {
		return <Child_ChaoZhiZP><any>(fairygui.UIPackage.createObject("chaozhifanli", "Child_ChaoZhiZP"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		for (let i = 0; i < 12; i++) {
			let grid = <ViewGrid><any>(s.getChild("grid" + i));
			grid.isShowEff = true;
			s.gridArr.push(grid);
		}
		s.expBar = <fairygui.GProgressBar><any>(s.getChild("expBar"));
		s.draw0 = <Button0><any>(s.getChild("draw0"));
		s.draw1 = <Button1><any>(s.getChild("draw1"));
		s.boxBt = <Button2><any>(s.getChild("boxBt"));
		s.chooseImg = <fairygui.GImage><any>(s.getChild("chooseImg"));
		s.chooseImg.visible = false;
		s.noticeImg = <fairygui.GImage><any>(s.getChild("noticeImg"));
		s.drawNumLb = <fairygui.GRichTextField><any>(s.getChild("drawNumLb"));
		s.noteLb = <fairygui.GRichTextField><any>(s.getChild("noteLb"));
		s.timeLb = <fairygui.GRichTextField><any>(s.getChild("timeLb"));
		let promptLb = <fairygui.GRichTextField><any>(s.getChild("promptLb"));
		promptLb.text = "每消费" + Config.xtcs_004[2004].num + "元宝免费抽奖1次"
		s.myNoteLb = <fairygui.GRichTextField><any>(s.getChild("myNoteLb"));
		s.checkBox = <fairygui.GButton><any>(s.getChild("checkBox"));
		s.myNoteLb.text = HtmlUtil.createLink("抽奖记录");
		s.myNoteLb.addEventListener(egret.TextEvent.LINK, s.OnOpenNote, s);

		s.linkLb = <fairygui.GRichTextField><any>(s.getChild("linkLb"));
		s.linkLb.text = HtmlUtil.createLink("概率");
		s.linkLb.addEventListener(egret.TextEvent.LINK, s.openGaiLV, s);
		s.draw0.addClickListener(s.OnDraw, s);
		s.draw1.addClickListener(s.OnDraw, s);
		s.boxBt.addClickListener(s.OnBox, s);
		s.checkBox.addClickListener(s.onCheck, s);
	}

	private openGaiLV(evt: egret.TextEvent) {
		evt.stopPropagation();
		GGlobal.layerMgr.open(UIConst.GAILV, 1);
	}

	private showGrids() {
		for (let i = 0; i < 12; i++) {
			let grid = this.gridArr[i];
			let cfg = Config.czzpreward_726[i + 1];
			let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
			grid.vo = arr[0];
			grid.tipEnabled = true;
		}
	}

	private OnOpenNote(evt: egret.TextEvent) {
		evt.stopPropagation();
		GGlobal.layerMgr.open(UIConst.CHAOZHI_ZHUANPAN_NOTE);
	}

	private OnBox() {
		let vo = ConfigHelp.makeItemListArr(JSON.parse(this.boxcfg.reward))[0];
		let num = Model_ChaoZhiFL.costNum;
		let color = num >= this.boxcfg.coin ? 2 : 6;
		let state = Model_ChaoZhiFL.boxArr[this.boxcfg.id - 1];
		View_Reward_Show.show([vo], "消费元宝达到" + HtmlUtil.fontNoSize(this.boxcfg.coin, Color.getColorStr(5)) + ",可领取" + HtmlUtil.fontNoSize("(" +
			num + "/" + this.boxcfg.coin + ")", Color.getColorStr(color)), null, Handler.create(this, this.drawBox), state);
	}

	private drawBox() {
		if (this.expBar.value < this.expBar.max) {
			ViewCommonWarn.text("未达到领取条件");
			return;
		}
		GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN_BOX(this.boxcfg.id);
	}

	private OnDraw(event: egret.TouchEvent) {
		let bt = event.target;
		if (bt.id == this.draw0.id) {
			if (Model_ChaoZhiFL.drawNum > 0) {
				this.draw0.touchable = this.draw1.touchable = false;
				GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(1);
			} else {
				ViewCommonWarn.text("抽奖次数不足");
			}
		} else {
			if (Model_ChaoZhiFL.drawNum >= 10) {
				this.draw0.touchable = this.draw1.touchable = false;
				GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(2);
			} else {
				ViewCommonWarn.text("抽奖次数不足");
			}
		}
	}

	private surTime;
	private boxcfg;
	private show() {
		let arr = Model_ChaoZhiFL.boxArr;
		let index = 0;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] != 2) {
				index = i + 1;
				break;
			}
		}
		let cfg;
		if (index == 0) {
			cfg = Config.czzpbox_726[arr.length];
		} else {
			cfg = Config.czzpbox_726[index];
		}
		this.expBar.value = Model_ChaoZhiFL.costNum;
		this.expBar.max = cfg.coin;
		this.boxcfg = cfg;
		let arr1 = Model_ChaoZhiFL.broadcastArr;
		let noteStr = "";
		for (let i = 0; i < arr1.length; i++) {
			let itemVo = VoItem.create(arr1[i][1]);
			if (i == 0) {
				noteStr += HtmlUtil.fontNoSize(arr1[i][0], Color.getColorStr(2)) + "在超值转盘中获得大奖" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + ",羡煞旁人";
			} else {
				noteStr += "\n" + HtmlUtil.fontNoSize(arr1[i][0], Color.getColorStr(2)) + "在超值转盘中获得大奖" + HtmlUtil.fontNoSize(itemVo.name, Color.getColorStr(itemVo.quality)) + ",羡煞旁人";
			}
		}
		this.noteLb.text = noteStr;
		this.drawNumLb.text = "剩余抽奖次数：" + Model_ChaoZhiFL.drawNum;
		this.draw0.checkNotice = Model_ChaoZhiFL.drawNum > 0;
		this.draw1.checkNotice = Model_ChaoZhiFL.drawNum >= 10;
		let num = Model_ChaoZhiFL.costNum;
		this.noticeImg.visible = (num >= cfg.coin && index != 0);
		// let vo = Model_Activity.getActivty1(UIConst.CHAOZHIFL, UIConst.CHAOZHI_ZHUANPAN);
		const vo = GGlobal.modelActivity.get(UIConst.CHAOZHIFL, UIConst.CHAOZHI_ZHUANPAN);
		this.surTime = vo.end - Math.floor(Model_GlobalMsg.getServerTime() / 1000);
		if (this.surTime > 0) {
			if (!Timer.instance.has(this.timeHandle, this)) {
				Timer.instance.listen(this.timeHandle, this, 1000);
			}
		} else {
			Timer.instance.remove(this.timeHandle, this);
		}

		if (GGlobal.layerMgr.isOpenView(UIConst.REWARD_SHOW)) {
			this.OnBox();
		}
	}

	private timeHandle() {
		this.surTime--;
		if (this.surTime > 0) {
			this.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(this.surTime);
		} else {
			Timer.instance.remove(this.timeHandle, this);
		}
	}

	private startIndex = 0;
	private startCount = 0;
	private startDraw() {
		if(Model_ChaoZhiFL.zpSkipTween){
			Timer.instance.remove(this.startEff, this);
			this.draw0.touchable = this.draw1.touchable = true;
			GGlobal.layerMgr.open(UIConst.CHAOZHI_ZHUANPAN_REWARD, Handler.create(this, this.alginFun));
		}else{
			this.startIndex = 0;
			this.startCount = 0;
			Timer.instance.listen(this.startEff, this, 50);
		}
	}

	private startEff() {
		this.startIndex++;
		if (this.startIndex >= this.gridArr.length) {
			this.startIndex = 0;
			this.startCount++
		}
		let grid = this.gridArr[this.startIndex];
		this.chooseImg.visible = true;
		this.chooseImg.setXY(grid.x - 2, grid.y + 3);
		let arr = Model_ChaoZhiFL.zpRewardArr;
		let rewardVo = arr[arr.length - 1];
		if (this.startCount >= 2 && grid.vo.id == rewardVo.id && grid.vo.count == rewardVo.count) {
			Timer.instance.remove(this.startEff, this);
			this.draw0.touchable = this.draw1.touchable = true;
			GGlobal.layerMgr.open(UIConst.CHAOZHI_ZHUANPAN_REWARD, Handler.create(this, this.alginFun));
		}
	}

	private alginFun() {
		let rewardArr = Model_ChaoZhiFL.zpRewardArr;
		if (rewardArr.length > 1) {
			if (Model_ChaoZhiFL.drawNum >= 10) {
				this.draw0.touchable = this.draw1.touchable = false;
				GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(2);
			} else {
				ViewCommonWarn.text("抽奖次数不足");
			}
		} else {
			if (Model_ChaoZhiFL.drawNum > 0) {
				this.draw0.touchable = this.draw1.touchable = false;
				GGlobal.modelCZFL.CG_DRAW_CHAOZHI_ZHUANPAN(1);
			} else {
				ViewCommonWarn.text("抽奖次数不足");
			}
		}
	}

	public open() {
		GGlobal.modelActivity.CG_OPENACT(UIConst.CHAOZHI_ZHUANPAN);
		this.showGrids();
		GGlobal.control.listen(Enum_MsgType.CHAOZHI_ZHUANPAN, this.show, this);
		GGlobal.control.listen(Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF, this.startDraw, this);
		
		let key = Model_player.voMine.id + "ChaoZhiZPCheck"
		let val = egret.localStorage.getItem(key);
		Model_ChaoZhiFL.zpSkipTween = val == "1" ? true : false;
		this.checkBox.selected = Model_ChaoZhiFL.zpSkipTween;
	}

	public close() {
		GGlobal.control.remove(Enum_MsgType.CHAOZHI_ZHUANPAN, this.show, this);
		GGlobal.control.remove(Enum_MsgType.CHAOZHI_ZHUANPAN_SHOWEFF, this.startDraw, this);
		this.draw0.touchable = this.draw1.touchable = true;
		Timer.instance.remove(this.timeHandle, this);
		ConfigHelp.cleanGridEff(this.gridArr);
	}

	private onCheck(e) {
		Model_ChaoZhiFL.zpSkipTween = this.checkBox.selected
		let key = Model_player.voMine.id + "ChaoZhiZPCheck"
		let val = Model_ChaoZhiFL.zpSkipTween ? "1" : "0";
		egret.localStorage.setItem(key, val);
	}
}