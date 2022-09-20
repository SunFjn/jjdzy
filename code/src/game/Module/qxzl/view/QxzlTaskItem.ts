/**
 * @author: lujiahao 
 * @date: 2019-09-30 16:10:36 
 */
class QxzlTaskItem extends fairygui.GComponent {

    //>>>>start
    public stateCtrl: fairygui.Controller;
    public tfName: fairygui.GRichTextField;
    public itemList1: fairygui.GList;
    public btnGo: Button0;
    public btnGet: Button1;
    public imageGet: fairygui.GImage;
    //>>>>end

    public static URL: string = "ui://6d8dzzdgrak314";

    public static createInstance(): QxzlTaskItem {
        return <QxzlTaskItem><any>(fairygui.UIPackage.createObject("qxzl", "QxzlTaskItem"));
    }

    private _curData: VoTaskQxzl;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);

        this.itemList1.itemRenderer = this.onItemRender;
        this.itemList1.callbackThisObj = this;
        this.itemList1.setVirtual();
    }

    //=========================================== API ==========================================
    public setData(pData: VoTaskQxzl) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_strName = pData.cfg.name;
            let t_color = Color.REDSTR;
            if (pData.count >= pData.cfg.cs) {
                t_color = Color.GREENSTR
            }
            let t_strCount = HtmlUtil.font(ConfigHelp.reTxt("({0}/{1})", pData.count, pData.cfg.cs), t_color);
            if (t._curData.cfg.type == 3) //领取体力特殊处理
            {
                t.tfName.text = t_strName + "\n" + "(12-14点领取)";
            }
            else {
                t.tfName.text = t_strName + "\n" + t_strCount;
            }

            t.itemList1.numItems = pData.rewardList.length;

            t.stateCtrl.selectedIndex = pData.state;
            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
            t.itemList1.numItems = 0;
        }
    }

    public clean() {
        this.setData(null);
        super.clean();
    }

    //===================================== private method =====================================
    private onItemRender(pIndex: number, pItem: ViewGrid) {
        if (this._curData && this._curData.rewardList) {
            let t_list = this._curData.rewardList;
            pItem.isShowEff = true;
            pItem.tipEnabled = true;
            pItem.vo = t_list[pIndex];
        }
    }

    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnGo, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.btnGet, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
    }

    //======================================== handler =========================================
    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        if (!this._curData)
            return;
        switch (e.currentTarget) {
            case t.btnGo:
                //TODO
                break;
            case t.btnGet:
                GGlobal.modelQxzl.CG_QunXiongZhuLu_getTaskReward_8963(this._curData.id);
                break;
        }
    }
}