class BaoKuItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public buyBt: fairygui.GButton;
	public typeImg0: fairygui.GLoader;
	public buyImg: fairygui.GImage;
	public xianshiImg: fairygui.GImage;
	public nameLb: fairygui.GRichTextField;
	public dataLb: fairygui.GRichTextField;
	public lb: fairygui.GRichTextField;
	public promptLb: fairygui.GRichTextField;
	public lbGroup: fairygui.GGroup;

	public static URL: string = "ui://6tpaxc0krkjp0";

	public static createInstance(): BaoKuItem {
		return <BaoKuItem><any>(fairygui.UIPackage.createObject("baoku", "BaoKuItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.grid = <ViewGrid><any>(this.getChild("grid"));
		this.grid.isShowEff = true;
		this.buyBt = <fairygui.GButton><any>(this.getChild("buyBt"));
		this.typeImg0 = <fairygui.GLoader><any>(this.getChild("typeImg0"));
		this.buyImg = <fairygui.GImage><any>(this.getChild("buyImg"));
		this.xianshiImg = <fairygui.GImage><any>(this.getChild("xianshiImg"));
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.dataLb = <fairygui.GRichTextField><any>(this.getChild("dataLb"));
		this.lb = <fairygui.GRichTextField><any>(this.getChild("lb"));
		this.dataLb.leading = 25;
		this.promptLb = <fairygui.GRichTextField><any>(this.getChild("promptLb"));
		this.lbGroup = <fairygui.GGroup><any>(this.getChild("lbGroup"));
		this.buyBt.addClickListener(this.onExchange, this);
	}

	private onExchange() {
		let costArr = ConfigHelp.makeItemListArr(this.vo.consume);
		let count = Model_Bag.getItemCount(costArr[0].id);
		if (count >= costArr[0].count) {
			GGlobal.modelBaoKu.CG_BAOKU_DUIHUAN(this.vo.bk, this.vo.id);
		} else {
			View_CaiLiao_GetPanel.show(VoItem.create(costArr[0].id));
		}
	}

	private iconArr = ["ui://6tpaxc0ksu6n3", "ui://6tpaxc0ksu6n7", "ui://6tpaxc0ksu6n9", "ui://6tpaxc0ksu6n5"];
	public vo: Vo_BaoKu;
	public show(vo: Vo_BaoKu) {
		this.vo = vo;
		if (vo) {
			let reward = ConfigHelp.makeItemListArr(vo.reward);
			let costArr = ConfigHelp.makeItemListArr(vo.consume);
			this.grid.vo = reward[0];
			this.grid.tipEnabled = true;
			this.nameLb.text = reward[0].name;
			this.nameLb.color = reward[0].qColor;
			this.buyBt.visible = false;
			this.promptLb.visible = false;
			this.buyImg.visible = false;
			let color = 0;
			if (Model_player.voMine.viplv >= vo.vip) {
				if (vo.time - vo.count <= 0) {
					this.buyImg.visible = true;
					color = 6;
				} else {
					this.buyBt.visible = true;
					color = 2;
				}
			} else {
				this.promptLb.visible = true;
				this.promptLb.text = vo.vip + "可兑换";
				color = 2;
			}
			this.typeImg0.url = this.iconArr[vo.bk - 1];
			this.dataLb.text = "限购：" + HtmlUtil.fontNoSize((vo.time - vo.count) + "/" + vo.time, Color.getColorStr(color)) + "\n单价：      " + costArr[0].count;
			var date: Date = new Date(Model_GlobalMsg.getServerTime());
			let weekDay = date.getDay();
			if (weekDay == 0) weekDay = 7;
			let isShow: boolean = weekDay == vo.xianshi;
			if (isShow) {
				this.lb.text = "限时";
			} else {
				isShow = weekDay == vo.dazhe;
				if (isShow) {
					this.lb.text = "9折";
				} else {
					isShow = vo.xinpin == 1;
					if (isShow) this.lb.text = "新品";
				}
			}
			this.lbGroup.visible = isShow;
		}
	}

	public clean() {
		ConfigHelp.cleanGridEff(this.grid);
	}
}