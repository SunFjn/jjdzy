/**
 * 发红包item
 */
class ItemFHB extends fairygui.GComponent{
	public c1: fairygui.Controller;
	public labTitle:fairygui.GRichTextField;
	public scendBtn: Button2;
	public labTotal:fairygui.GRichTextField;
	public residueLab:fairygui.GRichTextField;
	public iconYuanBao: fairygui.GLoader;

	private _vo:HBVo;

	public static URL:string = "ui://fm0lrzctv4653";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setVo(vo:HBVo)
	{
		let self = this;
		self._vo = vo;
		if(!vo)   return;

		let cfg:Itjhb_296 = Config.tjhb_296[vo.id];
		let type:number = Math.floor(cfg.id / 10);
		let color = vo.param >= cfg.cs ? Color.GREENSTR : Color.REDSTR;
		if(type == 1)
		{
			self.labTitle.text = BroadCastManager.reTxt("充值{0}元<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
		}else if(type == 2)
		{
			self.labTitle.text = BroadCastManager.reTxt("消费{0}元宝<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
		}else if(type == 3)
		{
			self.labTitle.text = BroadCastManager.reTxt("寻宝{0}次<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
		}else if(type == 4)
		{
			self.labTitle.text = BroadCastManager.reTxt("神将阁{0}次<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
		}

		let id:number = Number(ConfigHelp.SplitStr(cfg.hb)[0][0]);
		let v = VoItem.create(id);
		IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
		let num:number = Number(ConfigHelp.SplitStr(cfg.hb)[0][2]);
		self.labTotal.text = BroadCastManager.reTxt("<font color='{0}'>{1}</font>", color, num);
		self.residueLab.text = BroadCastManager.reTxt("可抢个数：<font color='{0}'>{1}</font>", color, cfg.sl);
		if(vo.sendStatus == 0)//未发
		{
			self.c1.selectedIndex = 0;
			self.scendBtn.enabled  = false;
			self.scendBtn.grayed = true;
			self.scendBtn.checkNotice = false;
		}else if(vo.sendStatus == 1){//可发
			self.c1.selectedIndex = 0;
			self.scendBtn.enabled  = true;
			self.scendBtn.grayed = false;
			self.scendBtn.addClickListener(self.onScend, self);
			self.scendBtn.checkNotice = true;
		}else if(vo.sendStatus == 2){//已发
			self.c1.selectedIndex = 1;
		}
	}

	/**
	 * 发红包
	 */
	private onScend(e: egret.TouchEvent): void {
		let self = this;
		if(!self._vo)   return;

		GGlobal.model_TJHB.CG_SEND(self._vo.id);
	}
}