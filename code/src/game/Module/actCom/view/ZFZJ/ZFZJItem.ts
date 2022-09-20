class ZFZJItem extends fairygui.GComponent {

	public grid: ViewGrid;
	public drawBt: fairygui.GButton;
	public nameLb: fairygui.GTextField;
	public costLb: fairygui.GRichTextField;
	public addLb: fairygui.GRichTextField;
	public rewardLb: fairygui.GRichTextField;
	public costIcon: ViewGrid2;

	public static URL: string = "ui://4h4iwgjrgapni";

	public static createInstance(): ZFZJItem {
		return <ZFZJItem><any>(fairygui.UIPackage.createObject("ActCom_ZFZJ", "ZFZJItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
	}

	private onDraw() {
		let self = this;
		let costVo = self.costIcon.vo;
		let model = GGlobal.modelzfzj;
		if (costVo.gType == Enum_Attr.ITEM) {
			model.CG_HeFuZhangFeiBoss_addjiu_9641(self.vo.id);
		} else {
			if (self.vo.time - model.wineDic[self.vo.id] > 0) {
				if (ConfigHelp.checkEnough(self.vo.conmuse, false)) {
					GGlobal.modelzfzj.CG_HeFuZhangFeiBoss_addjiu_9641(self.vo.id);
				} else {
					ModelChongZhi.guideToRecharge();
				}
			} else {
				ViewCommonWarn.text("已无敬酒次数");
			}
		}
	}

	public vo: Ihfkhzfzjjiu_286;
	public setVo(index) {
		let self = this;
		let model = GGlobal.modelzfzj;
		self.vo = Config.hfkhzfzjjiu_286[index];
		let itemVo = ConfigHelp.makeItemListArr(JSON.parse(self.vo.reward))[0];
		self.nameLb.text = itemVo.name;
		self.nameLb.color = itemVo.qColor;
		self.rewardLb.text = "敬酒可获得" + itemVo.name;
		self.addLb.text = "醉意+" + self.vo.zui;
		self.grid.isShowEff = self.grid.tipEnabled = true;
		self.grid.vo = itemVo;
		let costItem = ConfigHelp.makeItemListArr(JSON.parse(self.vo.conmuse1))[0];
		let count = Model_Bag.getItemCount(costItem.id);
		if (count >= costItem.count) {
			self.costIcon.vo = costItem;
			self.costLb.text = count + "/" + costItem.count;
		} else {
			let costItem1 = ConfigHelp.makeItemListArr(JSON.parse(self.vo.conmuse))[0];
			self.costIcon.vo = costItem1;
			self.costLb.text = costItem1.count + "";
		}
		let color = model.wineDic[index] >= self.vo.time ? 6 : 1;
		if (!model.wineDic[index]) model.wineDic[index] = 0;
		self.drawBt.text = "敬酒" + "[color=" + Color.getColorStr(color) + "](" + (self.vo.time - model.wineDic[index]) + "/" + self.vo.time + ")[/color]";
		self.drawBt.addClickListener(self.onDraw, self);
	}

	public clean() {
		let self = this;
		self.grid.clean();
		self.drawBt.removeClickListener(self.onDraw, self);
	}
}