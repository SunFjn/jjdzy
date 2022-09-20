class Tab_ZTXF extends fairygui.GComponent{
	public c1: fairygui.Controller;
	public img: fairygui.GLoader;
	public imgNotice: fairygui.GImage;
	public lbTitle: fairygui.GRichTextField;
	public actImg: fairygui.GImage;

	public static URL: string = "ui://904git2zglgpc";

	public static createInstance(): Tab_ZTXF {
		return <Tab_ZTXF><any>(fairygui.UIPackage.createObject("ActCom_ZTXF", "Tab_ZTXF"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		CommonManager.parseChildren(this,this);
	}

	public setVo(cfg:Iztxfb_329, i:number){
		let self = this;
		self.idx = i;
		self.updateDot(false);
		if(!cfg)  return;

		let model = GGlobal.model_ZTXF;
		IconUtil.setImg(self.img, Enum_Path.IMAGE_MODULES_URL+"ztxf/i"+cfg.lx+".png");
		if(cfg.lx == 1)
		{
			self.lbTitle.text = "符文主题";
		}else if(cfg.lx == 2)
		{
			self.lbTitle.text = "兽魂主题";
		}else if(cfg.lx == 3)
		{
			self.lbTitle.text = "少主主题";
		}else if(cfg.lx == 4)
		{
			self.lbTitle.text = "异兽主题";
		}else if(cfg.lx == 5)
		{
			self.lbTitle.text = "奇策主题";
		}else if(cfg.lx == 6)
		{
			self.lbTitle.text = "坐骑主题";
		}else if(cfg.lx == 7)
		{
			self.lbTitle.text = "武将主题";
		}else if(cfg.lx == 8)
		{
			self.lbTitle.text = "神兵主题";
		}

		if(model.type == cfg.lx)
		{
			self.actImg.visible = true;
		}else{
			self.actImg.visible = false;
		}

		self.updateDot(model.checkZTXFNoticeByType(cfg.qs, cfg.lx));
	}

	public setSelect(v){
		let s = this;
		s.c1.setSelectedIndex(v?1:0);
	}

	public updateDot(v){
		this.imgNotice.visible = v;
	}
	public idx;
}