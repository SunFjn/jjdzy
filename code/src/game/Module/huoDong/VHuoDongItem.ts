class VHuoDongItem extends fairygui.GComponent {

	public lab: fairygui.GRichTextField;
	public list: fairygui.GList;
	public btnGet: Button1;
	public imgGet: fairygui.GImage;
	public btnRec: Button0;
	public labCount: fairygui.GRichTextField;

	public static URL: string = "ui://vrw7je9rt2amd";

	public static createInstance(): VHuoDongItem {
		return <VHuoDongItem><any>(fairygui.UIPackage.createObject("huoDong", "VHuoDongItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.lab = <fairygui.GRichTextField><any>(this.getChild("lab"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.btnGet = <Button1><any>(this.getChild("btnGet"));
		this.imgGet = <fairygui.GImage><any>(this.getChild("imgGet"));
		this.btnRec = <Button0><any>(this.getChild("btnRec"));
		this.labCount = <fairygui.GRichTextField><any>(this.getChild("labCount"));

		this.list.itemRenderer = this.renderHandle;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
		this.btnGet.addClickListener(this.onClickGet, this);
		this.btnRec.addClickListener(this.onClickRec, this);
	}

	private _listData: Array<IGridImpl>
	private _vo: any;
	private _hid: number;
	private _status: number;
	private _index: number;
	public setVo(v: any, hid: number) {
		this._vo = v;
		this._hid = hid;
		var colorStr;
		this.labCount.text = "";
		if (this._hid == UIConst.HUODONG_DAILY_GIFT || this._hid == UIConst.HUODONG_DAI_GIFT_ACT || this._hid == UIConst.HUODONG_DAI_GIFT_KF) {
			if (v == 1) {
				this.lab.text = "今日可领取"
			} else if (v == 2) {
				this.lab.text = "VIP" + ConfigHelp.getSystemNum(2003) + "可额外领取"
			} else if (v == 3) {
				this.lab.text = "充值任意金额可额外领取"
			} else if (v == 4) {
				this.lab.text = "至尊卡可额外领取"
			}
			if (this._hid == UIConst.HUODONG_DAILY_GIFT) this._status = Model_HuoDong.dailyGiftArr[v];
			else if (this._hid == UIConst.HUODONG_DAI_GIFT_ACT) this._status = Model_HuoDong.daiGiftActArr[v];
			else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF) this._status = Model_HuoDong.daiGiftKfArr[v];
		} else if (this._hid == UIConst.HUODONG_DAILY_ONE || this._hid == UIConst.HUODONG_DAI_ONE_KF || this._hid == UIConst.HUODONG_DAI_ONE_ACT) {
			if (this._hid == UIConst.HUODONG_DAILY_ONE) this._status = Model_HuoDong.dailyOneArr ? Model_HuoDong.dailyOneArr[v.index] : 0;
			else if (this._hid == UIConst.HUODONG_DAI_ONE_KF) {
				this._vo = Config.dbcz1_733[v.id]
				this._status = v ? (v as Vo_HuoDong).getStaCt(this._vo.cs) : 0;
				// this.labCount.text = (this._vo.cs - v.canCt) + "/" + this._vo.cs;
				this.labCount.text =  "可充值领奖次数:" + (this._vo.cs - v.canCt); 
			} else if (this._hid == UIConst.HUODONG_DAI_ONE_ACT) {
				this._vo = Config.dbcz2_733[v.id]
				this._status = v ? (v as Vo_HuoDong).getStaCt(this._vo.cs) : 0;
				// this.labCount.text = (this._vo.cs - v.canCt) + "/" + this._vo.cs;
				this.labCount.text =  "可充值领奖次数:" + (this._vo.cs - v.canCt); 
			}
			if (this._status == 0) {
				colorStr = Color.REDSTR
				this.lab.text = "单笔充值" + this._vo.je + "元，可领取<font color='" + colorStr + "'>（0/" + this._vo.je + "）</font>"
			} else {
				colorStr = Color.GREENSTR
				this.lab.text = "单笔充值" + this._vo.je + "元，可领取<font color='" + colorStr + "'>（" + this._vo.je + "/" + this._vo.je + "）</font>"
			}
		}
		else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
			if(Model_GlobalMsg.kaifuDay <= 7) {
				this._vo = Config.leichong_725[v.id];
			}else {
				this._vo = Config.leichong1_725[v.id];
			}
			// this._vo = Config.leichong_725[v.id]
			colorStr = Model_HuoDong.addRecharge >= this._vo.coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值" + this._vo.coin + "元，可领取<font color='" + colorStr + "'>（" + Model_HuoDong.addRecharge + "/" + this._vo.coin + "）</font>"
			this._status = v ? v.status : 0
		} else if (this._hid == UIConst.HUODONG_DAILY_ADDUP) {
			this._vo = Config.drleichong_727[v.id]
			colorStr = Model_HuoDong.dailyAddUp >= this._vo.coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值达到" + this._vo.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoDong.dailyAddUp + "/" + this._vo.coin + "）</font>"
			this._status = v ? v.status : 0
		} else if (this._hid == UIConst.HUODONG_DAI_ADD_KF) {
			this._vo = Config.drlc1_734[v.id]
			colorStr = Model_HuoDong.daiAddKf >= this._vo.coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值达到" + this._vo.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoDong.daiAddKf + "/" + this._vo.coin + "）</font>"
			this._status = v ? v.status : 0
		} else if (this._hid == UIConst.HUODONG_DAI_ADD_ACT) {
			this._vo = Config.drlc2_734[v.id]
			colorStr = Model_HuoDong.daiAddAct >= this._vo.coin ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计充值达到" + this._vo.coin + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoDong.daiAddAct + "/" + this._vo.coin + "）</font>"
			this._status = v ? v.status : 0
		} else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU) {
			this._vo = Config.lxlc1_728[v.id]
			colorStr = Model_HuoDong.sevenKfCount >= this._vo.tianshu ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计" + this._vo.tianshu + "天充值" + ConfigHelp.getSystemNum(3201) + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoDong.sevenKfCount + "/" + this._vo.tianshu + "）</font>"
			this._status = v ? v.status : 0
		} else if (this._hid == UIConst.HUODONG_SEVEN_ACT) {
			this._vo = Config.lxlc2_728[v.id]
			colorStr = Model_HuoDong.sevenKfCount >= this._vo.tianshu ? Color.GREENSTR : Color.REDSTR;
			this.lab.text = "累计" + this._vo.tianshu + "天充值" + ConfigHelp.getSystemNum(3201) + "元，可领取：<font color='" + colorStr + "'>（" + Model_HuoDong.sevenKfCount + "/" + this._vo.tianshu + "）</font>"
			this._status = v ? v.status : 0
		}

		if (this._status == 0) {//前往充值
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = true;
			this.imgGet.visible = false
		} else if (this._status == 1) {//领取
			this.btnGet.checkNotice = this.btnGet.touchable = this.btnGet.visible = true;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		} else if (this._status == 2) {//已领取
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = true
		} else {
			this.btnGet.touchable = this.btnGet.visible = false;
			this.btnRec.touchable = this.btnRec.visible = false;
			this.imgGet.visible = false
		}
		this._listData = null
		//奖励显示
		if (this._hid == UIConst.HUODONG_DAILY_GIFT) {
			var cfg = Model_HuoDong.getDailyGiftCfg(Model_HuoDong.dailyGiftQs, this._vo)
			if (cfg && cfg.rewardArr == null) {
				cfg.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
			}
			this._listData = cfg ? cfg.rewardArr : [];
		}
		else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF) {
			var cfg = Model_HuoDong.getDaiGiftKfCfg(Model_HuoDong.daiGiftKfQs, this._vo)
			if (cfg && cfg.rewardArr == null) {
				cfg.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
			}
			this._listData = cfg ? cfg.rewardArr : [];
		}
		else if (this._hid == UIConst.HUODONG_DAI_GIFT_ACT) {
			var date: Date = new Date(Model_GlobalMsg.getServerTime());
			let weekDay = date.getDay();
			if(weekDay == 0){
				weekDay = 7;
			}
			var cfg = Model_HuoDong.getDaiGiftActCfg(weekDay, this._vo)
			if (cfg && cfg.rewardArr == null) {
				cfg.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(cfg.reward))
			}
			this._listData = cfg ? cfg.rewardArr : [];
		}
		else if (this._hid == UIConst.HUODONG_DAILY_ONE || this._hid == UIConst.HUODONG_DAI_ONE_KF || this._hid == UIConst.HUODONG_DAI_ONE_ACT) {
			if (this._vo.rewardArr == null) {
				this._vo.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._vo.jl))
			}
			this._listData = this._vo.rewardArr;
		} else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
			if (this._vo.rewardArr == null) {
				this._vo.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._vo.reward))
			}
			this._listData = this._vo.rewardArr;
		} else if (this._hid == UIConst.HUODONG_DAILY_ADDUP || this._hid == UIConst.HUODONG_DAI_ADD_KF || this._hid == UIConst.HUODONG_DAI_ADD_ACT) {
			if (this._vo.rewardArr == null) {
				this._vo.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._vo.reward))
			}
			this._listData = this._vo.rewardArr;
		} else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU || this._hid == UIConst.HUODONG_SEVEN_ACT) {
			if (this._vo.rewardArr == null) {
				this._vo.rewardArr = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(this._vo.jiangli))
			}
			this._listData = this._vo.rewardArr;
		}
		this.list.numItems = this._listData ? this._listData.length : 0
	}

	private renderHandle(index: number, obj: fairygui.GComponent): void {
		var item: ViewGrid = obj as ViewGrid;
		item.tipEnabled = true;
		item.isShowEff = true;
		item.vo = this._listData[index];
	}

	private onClickGet(): void {
		if (this._status == 0) {
			ViewCommonWarn.text("领取条件不足")
			return;
		}
		if (this._hid == UIConst.HUODONG_DAILY_GIFT) {
			GGlobal.modelHuoDong.CG_DAILYGIFT_GET(this._vo);
		}
		else if (this._hid == UIConst.HUODONG_DAI_GIFT_ACT) {
			GGlobal.modelHuoDong.CG_DAIGIFTACT_GET(this._vo);
		}
		else if (this._hid == UIConst.HUODONG_DAI_GIFT_KF) {
			GGlobal.modelHuoDong.CG_DAIGIFTKF_GET(this._vo);
		}
		else if (this._hid == UIConst.HUODONG_DAILY_ONE) {
			GGlobal.modelHuoDong.CG_DAILYONE_GET(this._vo.index + 1);
		}
		else if (this._hid == UIConst.HUODONG_DAI_ONE_KF) {
			GGlobal.modelHuoDong.CG_DAIONEKF_GET(this._vo.xh);
		}
		else if (this._hid == UIConst.HUODONG_DAI_ONE_ACT) {
			GGlobal.modelHuoDong.CG_DAIONEACT_GET(this._vo.xh);
		}
		else if (this._hid == UIConst.HUODONG_ADD_RECHARGE) {
			GGlobal.modelHuoDong.CG_ADDRECHARGE_GET2(this._vo.id);
		} else if (this._hid == UIConst.HUODONG_DAILY_ADDUP) {
			GGlobal.modelHuoDong.CG_DAILYADDUP_GET(this._vo.id);
		}
		else if (this._hid == UIConst.HUODONG_DAI_ADD_KF) {
			GGlobal.modelHuoDong.CG_DAIADDKF_GET(this._vo.id);
		}
		else if (this._hid == UIConst.HUODONG_DAI_ADD_ACT) {
			GGlobal.modelHuoDong.CG_DAIADDACT_GET(this._vo.id);
		}
		else if (this._hid == UIConst.HUODONG_SEVEN_KAIFU) {
			GGlobal.modelHuoDong.CG_SEVEN_KAIFU_GET(this._vo.id);
		} else if (this._hid == UIConst.HUODONG_SEVEN_ACT) {
			GGlobal.modelHuoDong.CG_SEVEN_ACT_GET(this._vo.id);
		}
	}

	private onClickRec(): void {
		// GGlobal.layerMgr.open(UIConst.CHONGZHI);
		ViewChongZhi.tryToOpenCZ();
	}

	public clean(){
		this.list.numItems = 0;
	}
}