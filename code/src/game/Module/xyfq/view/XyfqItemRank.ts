/**
 * @author: lujiahao 
 * @date: 2020-04-08 17:35:30 
 */
class XyfqItemRank extends fairygui.GComponent {

    //>>>>start
    public tfRank: fairygui.GRichTextField;
    public tfName: fairygui.GRichTextField;
    public tfCount: fairygui.GRichTextField;
    public itemList: fairygui.GList;
    //>>>>end

    public static URL: string = "ui://7hwmix0gbnypp";

    public static createInstance(): XyfqItemRank {
        return <XyfqItemRank><any>(fairygui.UIPackage.createObject("xyfq", "XyfqItemRank"));
    }

    public constructor() {
        super();
    }

    private _curData: VoRankXyfq;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);

        t.itemList.itemRenderer = t.onItemRender;
        t.itemList.callbackThisObj = t;
        t.itemList.setVirtual();
    }

    //=========================================== API ==========================================
    public setData(pData: VoRankXyfq) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.tfRank.text = `第${pData.rank}名`;

            if (pData.name) {
                t.tfName.text = pData.name;
                t.tfCount.text = `抽签数：${pData.count}次`;
            }
            else {
                t.tfName.text = HtmlUtil.font("虚位以待", "#cccccc");
                t.tfCount.text = HtmlUtil.font(`抽签数：暂无数据`, "#cccccc");
            }
            t.itemList.numItems = pData.rewardList.length;
        }
        else {
            t.itemList.numItems = 0;
        }
    }

    public clean() {
        this.setData(null);
        super.clean();
    }

    public dispose() {
        this.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        let t = this;
        if (t._curData && t._curData.rewardList) {
            let t_list = t._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }
    //======================================== handler =========================================
}