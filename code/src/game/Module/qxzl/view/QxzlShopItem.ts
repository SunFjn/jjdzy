/**
 * @author: lujiahao 
 * @date: 2019-09-30 16:11:44 
 */
class QxzlShopItem extends fairygui.GComponent {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public item: ViewGrid;
	public tfItemName: fairygui.GRichTextField;
	public btnBuy: Button1;
	public tfLimit: fairygui.GRichTextField;
	public imageIcon: fairygui.GLoader;
	public tfValue: fairygui.GRichTextField;
	//>>>>end

    public static URL: string = "ui://6d8dzzdgrak315";

    public static createInstance(): QxzlShopItem {
        return <QxzlShopItem><any>(fairygui.UIPackage.createObject("qxzl", "QxzlShopItem"));
    }

    private _curData: VoShopQxzl;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        CommonManager.parseChildren(this, this);
    }

    //=========================================== API ==========================================
    public setData(pData: VoShopQxzl) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_item = pData.itemList[0];

            t.item.isShowEff = true;
            t.item.tipEnabled = true;
            t.item.vo = t_item;

            t.tfItemName.text = HtmlUtil.font(t_item.name, t_item.qColor);

            let t_remain = pData.remainCount;
            let t_limitStr = "";
            if (t_remain == -1) {
                t_limitStr = "不限购";
                t.stateCtrl.selectedIndex = 0;
            }
            else {
                let t_color = Color.GREENSTR;
                if (t_remain == 0) {
                    t_color = Color.REDSTR;
                    t.stateCtrl.selectedIndex = 1;
                }
                else {
                    t.stateCtrl.selectedIndex = 0;
                }
                t_limitStr = ConfigHelp.reTxt(HtmlUtil.font("{0}/{1}", t_color), t_remain, pData.cfg.xg);
            }
            t.tfLimit.text = ConfigHelp.reTxt("限购：" + t_limitStr);

            let t_consume = pData.consumeItem;
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + t_consume.icon + ".png", t.imageIcon);

            if (ConfigHelp.checkEnough(pData.cfg.money, false)) {
                t.tfValue.text = t_consume.count + "";
            }
            else {
                t.tfValue.text = HtmlUtil.font(t_consume.count + "", Color.REDSTR);
            }
            t.registerEvent(true);
        }
        else {
            t.registerEvent(false);
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
    private registerEvent(pFlag: boolean) {
        let t = this;
        EventUtil.register(pFlag, t.btnBuy, egret.TouchEvent.TOUCH_TAP, t.onBtnClick, t);
        EventUtil.register(pFlag, t.imageIcon, egret.TouchEvent.TOUCH_TAP, t.onIconClick, t);
    }

    //======================================== handler =========================================
    private onIconClick(e: egret.TouchEvent) {
        let t = this;
        if (t._curData) {
            FastAPI.showItemTips(t._curData.consumeItem);
        }
    }

    private onBtnClick(e: egret.TouchEvent) {
        let t = this;
        switch (e.currentTarget) {
            case t.btnBuy:
                if (t._curData) {
                    GGlobal.modelQxzl.CG_QunXiongZhuLu_exchange_8961(t._curData.id);
                }
                break;
        }
    }
}