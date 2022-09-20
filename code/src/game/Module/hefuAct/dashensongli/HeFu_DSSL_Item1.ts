class HeFu_DSSL_Item1 extends fairygui.GComponent{
	public tipsTxt: fairygui.GRichTextField;
	public item: ViewGrid;
	public receivedImg: fairygui.GImage;
	public btnGet: Button1;
	public noticeGroup: fairygui.GGroup;
	public numLb: fairygui.GRichTextField;
	private _vo:Ihfkhgod_286;

	public static URL: string = "ui://07jsdu7hhilo8";

	public static createInstance(): HeFu_CZFL_Item {
		return <HeFu_CZFL_Item><any>(fairygui.UIPackage.createObject("hefuActCZFL", "HeFu_CZFL_Item"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);

		this.btnGet.addClickListener(this.onClickGet, this);
	}

	public setVo(vo:Ihfkhgod_286)
	{
		let m = GGlobal.model_actCom;
		this.noticeGroup.visible = false;
		this._vo = vo;
		if(vo.tj1 <= 0 && vo.tj2 <= 0)
		{
			this.tipsTxt.text = "";
		}else if(vo.tj1 > 0)
		{
			this.tipsTxt.text = "VIP" + vo.tj1 + "可额外领取";
		}else{
			this.tipsTxt.text = "充值" + vo.tj2 + "元可额外领取";
		}
		let gift = m.giftObj[vo.id];
		this.noticeGroup.visible = false;
		if(gift){
			if(gift.status == 0)//不能领取
			{
				this.btnGet.visible = true;
				this.btnGet.grayed = true;
				this.btnGet.enabled = false;
				this.receivedImg.visible = false;
			}else if(gift.status == 1){//可以领取
				this.btnGet.visible = true;
				this.btnGet.grayed = false;
				this.btnGet.enabled = true;
				this.btnGet.checkNotice = true;
				this.receivedImg.visible = false;
			}else{//已经领取
				this.btnGet.visible = false;
				this.receivedImg.visible = true;
				this.tipsTxt.text = "";
			}
		}else{
			this.receivedImg.visible = false;
			let dashen = m.dashenObj[vo.id];
			if(dashen)
			{
				if(dashen.num > 0)
				{
					this.noticeGroup.visible = true;
					this.numLb.text = dashen.num.toString();
					if(vo.tj1 <= 0 && vo.tj2 <= 0)
					{
						this.btnGet.grayed = false;
						this.btnGet.enabled = true;
					}else if(vo.tj1 > 0 && Model_player.voMine.viplv >= vo.tj1)
					{
						this.btnGet.grayed = false;
						this.btnGet.enabled = true;
					}else if(vo.tj2 > 0 && m.dsslRecharge >= vo.tj2)
					{
						this.btnGet.grayed = false;
						this.btnGet.enabled = true;
					}else{
						this.btnGet.grayed = true;
						this.btnGet.enabled = false;
					}
				}else{
					this.btnGet.grayed = true;
					this.btnGet.enabled = false;
				}
			}
		}
		let reward: Array<IGridImpl> = ConfigHelp.makeItemListArr(ConfigHelp.SplitStr(vo.reward));
		this.item.tipEnabled = true;
		this.item.isShowEff = true;
		this.item.vo = reward[0];
	}

	private onClickGet(): void {
		let dashen = GGlobal.model_actCom.dashenObj[this._vo.id];
		if(dashen && dashen.num <= 0)
		{
			ViewCommonWarn.text("领取条件不足");
			return;
		}
		GGlobal.model_actCom.CG_DSSL_GETREWARD(this._vo.id);
	}
}