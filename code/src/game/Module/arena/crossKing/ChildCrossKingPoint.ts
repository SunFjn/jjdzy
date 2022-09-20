class ChildCrossKingPoint extends fairygui.GComponent {

	public c1: fairygui.Controller;
	public lbRank: fairygui.GTextField;
	public lbReward: fairygui.GTextField;
	public list: fairygui.GList;
	public lbMyPoint: fairygui.GTextField;
	public lbTips: fairygui.GTextField;
	public lbget: fairygui.GTextField;

	public static URL:string = "ui://me1skowlhfct3y";

	public static createInstance(): ChildCrossKingPoint {
		return <ChildCrossKingPoint><any>(fairygui.UIPackage.createObject("crossKing", "ChildCrossKingPoint"));
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
		this.lbMyPoint = <fairygui.GTextField><any>(this.getChild("lbMyPoint"));
		this.lbTips = <fairygui.GTextField><any>(this.getChild("lbTips"));
		this.lbget = <fairygui.GTextField><any>(this.getChild("lbget"));

		this.list.itemRenderer = this.renderListItem;
		this.list.callbackThisObj = this;
		this.list.setVirtual();
	}

	private _listData;
	public update(): void {
		this.lbMyPoint.text = "我的积分：<font color='#ffc334'>" + Model_CrossKing.myPoint + "</font>";
		
		let len = Model_CrossKing.pointRewardArr.length
		var arr1 = [];
		var arr2 = [];
		var arr3 = [];
		for(let i = 0; i < len; i++){
			var v = Model_CrossKing.pointRewardArr[i]
			var status = Model_CrossKing.pointRwd[v.id]
			if(status == 0){//不能领取
				arr2.push(v);
			}
			else if(status == 1){//可领取
				arr1.push(v);
			}
			else{//已领取
				arr3.push(v);
			}
		}
		this._listData = arr1.concat(arr2).concat(arr3);
		this.list.numItems = len;
	}

	private renderListItem(index: number, obj: fairygui.GObject): void {
		var item: VCrossKingPoint = obj as VCrossKingPoint;
		item.vo = this._listData[index];
	}

	public closeHD(){
		this.list.numItems = 0;
	}
}