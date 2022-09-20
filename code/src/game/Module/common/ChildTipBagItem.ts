class ChildTipBagItem extends fairygui.GComponent {

	public lbName: fairygui.GTextField;
	public grid: ViewGrid;
	public lbNum: fairygui.GTextField;
	public lbLevel: fairygui.GTextField;
	public lbDes: fairygui.GRichTextField;
	public lbSourceTit: fairygui.GRichTextField;
	public lbDesTit: fairygui.GRichTextField;
	public lbSource: fairygui.GRichTextField;
	public imgDes: fairygui.GImage;
	public imgSource: fairygui.GImage;
	public vPower: fairygui.GLabel;

	public static URL: string = "ui://jvxpx9emlnckac";

	public static createInstance(): ChildTipBagItem {
		return <ChildTipBagItem><any>(fairygui.UIPackage.createObject("common", "ChildTipBagItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		let self = this;
		CommonManager.parseChildren(self, self);
		self.lbSource.ubbEnabled = true;
		self.lbDes.ubbEnabled = true;
		self.grid.isShowEff = true
	}

	public set vo(v: IGridImpl) {
		let self = this;
		var count;
		if (v instanceof VoItem) {
			self.lbDesTit.text = "道具描述"
			self.lbSourceTit.text = "道具来源"
			self.lbDes.text = v.cfg.miaoshu;
			count = Model_Bag.getItemCount(v.id);
			if (count > 0) {
				self.lbNum.text = "拥有数量：" + count;
			} else {
				self.lbNum.text = "";
			}
			self.lbSource.text = v.cfg.laiyuan
			self.lbLevel.text = "使用等级：" + v.cfg.level;
			self.vPower.visible = false;
		} else if (v instanceof Vo_Currency) {
			self.lbDesTit.text = "道具描述"
			self.lbSourceTit.text = "道具来源"
			self.lbDes.text = v.cfg.miaoshu;
			if ((v as Vo_Currency).showCount) {
				count = v.count
			} else {
				count = Model_player.getCurrencyCount(Number(v.gType));
			}
			if (count >= 0) {
				self.lbNum.text = "拥有数量：" + ConfigHelp.numToStr(count);
			} else {
				self.lbNum.text = "";
			}
			self.lbSource.text = v.cfg.laiyuan
			self.lbLevel.text = "使用等级：" + v.cfg.level;
			self.vPower.visible = false;
		} else {
			self.lbDesTit.text = "装备属性"
			self.lbSourceTit.text = "装备描述"

			// self.lbNum.text = "战斗力：" + (v as VoEquip).getPower()
			self.lbNum.text = "";
			self.lbDes.text = ConfigHelp.attrString((v as VoEquip).baseAttr)

			self.lbSource.text = v.cfg.miaoshu;

			var jie = Math.floor((v as VoEquip).jie / 10)
			if ((v as VoEquip).type < 40) {
				if ((v as VoEquip).level > 0) {
					self.lbLevel.text = "使用等级：" + (v as VoEquip).level + "级";
				} else {
					self.lbLevel.text = "使用等级：" + Math.floor((v as VoEquip).zs / 1000) + "转";
				}
			} else if ((v as VoEquip).type < 50) {
				self.lbLevel.text = "使用阶数：武将" + jie + "阶";
			} else if ((v as VoEquip).type < 60) {
				self.lbLevel.text = "使用阶数：战甲" + jie + "阶";
			} else if ((v as VoEquip).type < 70) {
				self.lbLevel.text = "使用阶数：神剑" + jie + "阶";
			} else if ((v as VoEquip).type < 80) {
				self.lbLevel.text = "使用阶数：异宝" + jie + "阶";
			} else if ((v as VoEquip).type < 90) {
				self.lbLevel.text = "使用阶数：兵法" + jie + "阶";
			} else if ((v as VoEquip).type < 100) {
				self.lbLevel.text = "使用阶数：宝物" + jie + "阶";
			} else if ((v as VoEquip).type < 110) {
				self.lbLevel.text = "使用阶数：天书" + jie + "阶";
			} else if ((v as VoEquip).type >= 110 && (v as VoEquip).type <= 150) {
				self.lbLevel.text = Math.floor((v as VoEquip).zs / 1000) + "转";
			}
			self.vPower.text = (v as VoEquip).getPower() + "";
			self.vPower.visible = true;
		}
		self.grid.vo = v;
		self.grid.lbNum.text = "";
		self.lbName.text = v.name;
		self.lbName.color = v.qColor;
	}
}