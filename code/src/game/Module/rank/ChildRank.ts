class ChildRank extends fairygui.GComponent {

	public labRank: fairygui.GRichTextField;
	public labName: fairygui.GRichTextField;
	public labLevel: fairygui.GRichTextField;
	public labPower: fairygui.GTextField;
	public viewHead: ViewHead;
	public imgNo: fairygui.GImage;
	public imgRank: fairygui.GLoader;

	public static URL: string = "ui://y2wvab26mq9u1";

	public static createInstance(): ChildRank {
		return <ChildRank><any>(fairygui.UIPackage.createObject("rank", "ChildRank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self,self);
		self.addClickListener(self.onInfo, self);
	}

	private _vo;
	public setVo(v: VoRank, index, vo:any) {
		let self = this;
		self._vo = v;
		self.labName.text = v ? "<font color='#f2be0a'>昵称：</font>" + v.name : "";
		self.labPower.text = Model_Rank.setPowerTxt(v);
		if(vo.TYPE == 1 && v)
		{
			self.labLevel.text = Model_Rank.setRankTxt(v) + "(" + v.lunhui +  "世轮回)";
		}else{
			self.labLevel.text = Model_Rank.setRankTxt(v);
		}
		if (v) {
			var country = v.showCoun == 0 ? v.country : 0;
			self.viewHead.setdata(v.headId, -1, "", v.vip, false, v.frameId, country);
			self.imgNo.visible = false;
		} else {
			self.viewHead.setdata(null);
			self.imgNo.visible = true;
		}
		if (index > 3) {
			self.labRank.text = "第" + index + "名";
			self.imgRank.visible = false
		} else {
			self.labRank.text = "";
			self.imgRank.visible = true
			if (index == 1) {
				self.imgRank.url = "ui://y2wvab26nxcb8"
			} else if (index == 2) {
				self.imgRank.url = "ui://y2wvab26nxcb9"
			} else if (index == 3) {
				self.imgRank.url = "ui://y2wvab26nxcba"
			}
		}
	}

	private onInfo():void{
		let self = this;
		if(self._vo)
			GGlobal.layerMgr.open(UIConst.RANK_INFO, self._vo);
	}
}