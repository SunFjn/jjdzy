/**
 * @author: lujiahao 
 * @date: 2020-03-26 11:30:58 
 */
class ItemHorseCondition extends fairygui.GButton {

    public selectImg: fairygui.GImage;
    public labName: fairygui.GRichTextField;
    public bg: fairygui.GLoader;
    public imgIcon: fairygui.GLoader;
    public starLb: fairygui.GRichTextField;
    public starGroup: fairygui.GGroup;
    public maskBg: fairygui.GImage;

    public static URL: string = "ui://7shc3kzddwb4v";

    public static createInstance(): ItemHorseCondition {
        return <ItemHorseCondition><any>(fairygui.UIPackage.createObject("horse", "ItemHorseCondition"));
    }

    public constructor() {
        super();
    }

    private _curData: number[];

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: number[]) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_model = GGlobal.model_Horse;
            let t_vo = t_model.getHorseVoById(~~pData[0]);
            let t_needStar = ~~pData[1];
            if (t_vo) {
                t.labName.text = HtmlUtil.font(t_vo.cfg.name, Color.getColorStr(t_vo.quality));
                IconUtil.setImg(t.imgIcon, Enum_Path.ICON70_URL + t_vo.cfg.icon + ".png");
                IconUtil.setImg(t.bg, Enum_Path.ICON70_URL + "BmG_" + t_vo.quality + ".png");

                let t_color = Color.REDSTR;
                if (t_vo.star >= t_needStar) {
                    t_color = Color.GREENSTR;
                }
                t.starLb.text = HtmlUtil.font(t_needStar + "", t_color);
            }
            t.registerEvent(true);
        }
        else {
            IconUtil.setImg(this.imgIcon, null);
            IconUtil.setImg(this.bg, null);
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
        EventUtil.register(pFlag, t, egret.TouchEvent.TOUCH_TAP, t.onClick, t);
    }
    //======================================== handler =========================================
    private onClick(e: egret.TouchEvent) {
        let t = this;
        if (t._curData) {
            let t_model = GGlobal.model_Horse;
            let t_vo = t_model.getHorseVoById(~~t._curData[0]);
            if (t_vo)
                FastAPI.showItemTips(t_vo.cfg.icon);
        }
    }
}