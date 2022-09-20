class ChildCrossKingReward extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public lbRank: fairygui.GTextField;
	public lbReward: fairygui.GTextField;
	public list: fairygui.GList;
	public lbMyGrade: fairygui.GTextField;
	public lbTips: fairygui.GTextField;

	public static URL:string = "ui://me1skowlhfct3x";

	public static createInstance(): ChildCrossKingReward {
		return <ChildCrossKingReward><any>(fairygui.UIPackage.createObject("crossKing", "ChildCrossKingReward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getController("c1");
		this.lbRank = <fairygui.GTextField><any>(this.getChild("lbRank"));
		this.lbReward = <fairygui.GTextField><any>(this.getChild("lbReward"));
		this.list = <fairygui.GList><any>(this.getChild("list"));
		this.lbMyGrade = <fairygui.GTextField><any>(this.getChild("lbMyGrade"));
		this.lbTips = <fairygui.GTextField><any>(this.getChild("lbTips"));

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	private _type;
	public update(type) {
		this._type = type

		var grade = Model_CrossKing.myGrade;
		var cfgGrade = Config.lsxx_232[grade]
		if (cfgGrade) {
			this.lbMyGrade.text = "我的段位：<font color='" + Color.getColorStr(cfgGrade.color) + "'>" + cfgGrade.name + "</font>"
		} else {
			this.lbMyGrade.text = "我的段位："
		}

		if (type == 0) {//段位奖励
			this.list.numItems = Model_CrossKing.rewardArr.length;
			this.lbTips.text = "段位奖励赛季结束邮件发送";
		} else {
			this.list.numItems = Model_CrossKing.rewardArr.length - 1;
			this.lbTips.text = "晋升段位时邮件发放，每个奖励每赛季只可领取一次";
		}
		this.list.scrollToView(0);
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: VCrossKingReward = obj as VCrossKingReward;
		if (this._type == 0) {
			item.gradeVo = Model_CrossKing.rewardArr[index];
		} else {
			item.upVo = Model_CrossKing.rewardArr[index + 1];
		}

	}

	public closeHD(){
		this.list.numItems =0;
	}
}