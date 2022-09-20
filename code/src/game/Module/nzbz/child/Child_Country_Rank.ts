class Child_Country_Rank extends fairygui.GComponent {

	public countryImgArr: Array<fairygui.GLoader> = [];
	public jifenLbArr: Array<fairygui.GRichTextField> = [];
	public groupArr: Array<fairygui.GGroup> = [];
	public nameLb: fairygui.GRichTextField;
	public countryLb: fairygui.GRichTextField;
	public static URL: string = "ui://xzyn0qe3l3h3f";

	public static createInstance(): Child_Country_Rank {
		return <Child_Country_Rank><any>(fairygui.UIPackage.createObject("nzbz", "Child_Country_Rank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		for (let i = 0; i < 3; i++) {
			let countryImg = <fairygui.GLoader><any>(this.getChild("countryImg" + i));
			this.countryImgArr.push(countryImg);
			let boxImg = this.getChild("boxImg" + i).asLoader;
			boxImg.data = i + 1;
			boxImg.addClickListener(this.OnBox, this);
			let jifenLb = <fairygui.GRichTextField><any>(this.getChild("jifenLb" + i));
			this.jifenLbArr.push(jifenLb);
			let countryGroup = <fairygui.GGroup><any>(this.getChild("group" + i));
			this.groupArr.push(countryGroup);
		}
		this.nameLb = <fairygui.GRichTextField><any>(this.getChild("nameLb"));
		this.countryLb = <fairygui.GRichTextField><any>(this.getChild("countryLb"));
	}

	private OnBox(event: egret.TouchEvent) {
		let cfg = Config.nzbz_226[10 + event.target.data];
		let arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
		View_BoxReward_Show.show(arr, "排名" + event.target.data + "可领取");
	}

	//B:国家I:积分
	public updateShow(): void {
		let self = this;
		for (let i = 0; i < 3; i++) {
			if (i < Model_NZBZ.countryRankArr.length) {
				self.groupArr[i].visible = true;
				IconUtil.setImg(self.countryImgArr[i], Enum_Path.IMAGE_MODULES_URL + "country/countrya" + Model_NZBZ.countryRankArr[i][0] + ".png");
				self.jifenLbArr[i].text = Model_NZBZ.countryRankArr[i][1] + "积分";
			} else {
				self.groupArr[i].visible = false;
			}
		}
		self.countryLb.text = "我的国家：" + Model_Country.getCountryName(Model_player.voMine.country);
		if (Model_NZBZ.kingName) {
			self.nameLb.text = Model_NZBZ.kingName;
		} else {
			self.nameLb.text = "虚位以待";
		}
	}

	public show(): void {
		this.updateShow();
	}

	public hide() {
		let self = this;
		for (let i = 0; i < 3; i++) {
			IconUtil.setImg(self.countryImgArr[i], null);
		}
	}
}