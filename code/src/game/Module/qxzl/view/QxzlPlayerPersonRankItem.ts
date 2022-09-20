/**
 * 玩家个人排名item
 */
class QxzlPlayerPersonRankItem extends fairygui.GComponent{
	public itemList: fairygui.GList;
	public lbRank: fairygui.GRichTextField;
	public lbName: fairygui.GRichTextField;
	public lbScore: fairygui.GRichTextField;
	public c1: fairygui.Controller;
    public xwydImg: fairygui.GImage;

	private _curData: VoRankQxzl;

	public static URL: string = "ui://6d8dzzdgvhu61m";

	public static createInstance(): QxzlPlayerPersonRankItem {
        return <QxzlPlayerPersonRankItem><any>(fairygui.UIPackage.createObject("qxzl", "QxzlPlayerPersonRankItem"));
    }

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    }

	public setData(vo: VoRankPlayer, pRank: number) {
		let t = this;

        if (pRank > 0) {
            let t_dataList = GGlobal.modelQxzl.getRankVoListByType(3);
            t._curData = t_dataList[pRank - 1];
            t.itemList.numItems = t._curData.rewardList.length;
        }
        else
            t._curData = null;

		t.lbRank.text = pRank <= 10? "第" + pRank + "名":"第10+名";
		if(pRank <= 10 && vo)
		{
			t.c1.selectedIndex = 1;
			t.lbName.text = vo.name;
			t.lbScore.text = "积分：" + vo.score;
		}else if(pRank > 10 && GGlobal.modelQxzl.myPersonRank > 10 && GGlobal.modelQxzl.myPersonScore > 0){
            t.c1.selectedIndex = 1;
			t.lbName.text = Model_player.voMine.name;
			t.lbScore.text = "积分：" + GGlobal.modelQxzl.myPersonScore;
        }else if(pRank > 10 && GGlobal.modelQxzl.personRankList.length > 0 && GGlobal.modelQxzl.myPersonRank <= 10)
        {
            t.c1.selectedIndex = 0;
            t.xwydImg.visible = false;
        }else{
			t.c1.selectedIndex = 0;
            t.xwydImg.visible = true;
		}
	}

	public clean() {
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }

	private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (!t._curData)
            return;
        let t_dataList = t._curData.rewardList;
        if (t_dataList) {
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_dataList[pIndex];
        }
    }
}