class ActCom_ZTXF_Item extends fairygui.GComponent{
	public n0: fairygui.GImage;
	public n8: fairygui.GImage;
	public imgYlq: fairygui.GImage;
	public list: fairygui.GList;
	public btnGet: Button1;
	public btnGo: Button0;
	public lbBuff: fairygui.GRichTextField;
	public lbpro: fairygui.GRichTextField;
	private _actId:number = 0;
	private _cfg:Iztxfb_329;

	public static URL: string = "ui://904git2zglgpd";

	public static createInstance(): ActCom_ZTXF_Item {
		return <ActCom_ZTXF_Item><any>(fairygui.UIPackage.createObject("ActCom_ZTXF", "ActCom_ZTXF_Item"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this, this);
		this.list.callbackThisObj = this;
		this.list.itemRenderer = this.itemRender;
	}

	private itemRender(idx,obj){
		let item:ViewGrid = obj as ViewGrid;
		item.isShowEff = true;
		item.tipEnabled = true;
		item.vo = this._listdata[idx];
	}

	public clean() {
		let s = this;
		s.list.numItems = 0;
		s.btnGo.removeClickListener(s.onClickGo, s);
		s.btnGet.removeClickListener(s.getAwardHD, s);
	}

	private idx;
	private _listdata;
	public setdata(obj) {
		let s = this;
		if(!obj)  return;

		s._cfg = Config.ztxfb_329[obj.id];
		let model = GGlobal.model_ZTXF;
		s.idx = obj.id;
		let status:number = obj.status;
		let color = (status == 1 ||status == 2) ? Color.GREENSTR : Color.REDSTR;
		let count:number = 0;
		if(s._cfg.yb <= 0)
		{
			count = (status == 1 ||status == 2) ? 1:0;
			if(s._cfg.lx == 1)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活符文主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 2)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活兽魂主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 3)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活少主主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 4)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活异兽主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 5)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活奇策主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 6)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活坐骑主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 7)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活武将主题<font color='{0}'>({1}/1)</font>", color, count);
			}else if(s._cfg.lx == 8)
			{
				s.lbpro.text = BroadCastManager.reTxt("激活神兵主题<font color='{0}'>({1}/1)</font>", color, count);
			}
		}else{
			s.lbpro.text = BroadCastManager.reTxt("消耗{0}元宝<font color='{1}'>({2}/{3})</font>", s._cfg.yb, color, model.expenditure, s._cfg.yb);
		}

		s.btnGo.visible = false;
		s.btnGo.checkNotice = false;
		s.lbBuff.visible = false;
		if(status <= 0 && model.type <= 0)
		{
			if(s._cfg.yb <= 0)
			{
				s.btnGo.visible = true;
			}else{
				s.lbBuff.visible = true;
			}
			s.btnGo.text = "激活";
			s.lbBuff.text = "尚未激活";
			let needCharge:number = Config.xtcs_004[7630].num;
			if(model.rechargeNum >= needCharge)
			{
				s.btnGo.checkNotice = true;
			}
		}else if(status <= 0){
			if(s._cfg.lx == model.type)
			{
				s.btnGo.visible = true;
			}else{
				s.lbBuff.visible = true;
			}
			s.btnGo.text = "前往";
			s.lbBuff.text = "已激活其他主题";
		}
		s.btnGet.visible = status == 1;
		s.imgYlq.visible = status == 2;

		s._listdata = ConfigHelp.makeItemListArr(s._cfg.jl);
		s.list.numItems = s._listdata.length;

		s.btnGo.addClickListener(s.onClickGo, s);
		s.btnGet.addClickListener(s.getAwardHD, s);
		s.btnGet.checkNotice = true;
	}

	/**
	 * 激活按钮事件
	 */
	private onClickGo(e: egret.TouchEvent): void {
		let model = GGlobal.model_ZTXF;
		let needCharge:number = Config.xtcs_004[7630].num;
		if(model.type <= 0 && model.rechargeNum < needCharge)//跳充值
		{
			ViewChongZhi.tryToOpenCZ();
			e.stopImmediatePropagation();
			e.stopPropagation();
			return;
		}else if(model.type <= 0 && model.rechargeNum >= needCharge)//激活
		{
			ViewAlert.show("本次活动只能激活一个主题消费，激活后不可更换，确认激活？", Handler.create(this, function(){GGlobal.model_ZTXF.CG_ACTIVATION(this._cfg.lx)}));
			return;
		}else{//跳神将阁
			GGlobal.layerMgr.open(UIConst.CANGBAOGE);
			e.stopImmediatePropagation();
			e.stopPropagation();
		}
	}

	/**
	 * 领取按钮事件
	 */
	private getAwardHD(): void {
		GGlobal.model_ZTXF.CG_GET_AWARD(this._cfg.id);
	}
}