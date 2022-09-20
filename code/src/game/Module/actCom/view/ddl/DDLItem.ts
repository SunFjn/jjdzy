class DDLItem extends fairygui.GComponent{
	public content: fairygui.GRichTextField;
	public selectImg: fairygui.GImage;
	public cfg:Iddl_297;
	public index:number;
	public str:string = "";

	public static URL:string = "ui://ke8qv0ckehld6";

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let s = this;
		CommonManager.parseChildren(s, s);
	}

	public setData(cfg:Iddl_297, xiaId:number, index:number)
	{
		let self = this;
		self.cfg = cfg;
		self.index = index;
		if(!cfg)  return;

		if(xiaId == 1)
		{
			self.str = cfg.down1;
		}else if(xiaId == 2)
		{
			self.str = cfg.down2;
		}else if(xiaId == 3)
		{
			self.str = cfg.down3;
		}else if(xiaId == 4)
		{
			self.str = cfg.down4;
		}else if(xiaId == 5)
		{
			self.str = cfg.down5;
		}else if(xiaId == 6)
		{
			self.str = cfg.down6;
		}else if(xiaId == 7)
		{
			self.str = cfg.down7;
		}
		self.content.text = self.str;
	}

	public setSelect(bol:boolean)
	{
		this.selectImg.visible = bol;
	}
}