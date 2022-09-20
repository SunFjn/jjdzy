/**
 * @author: lujiahao 
 * @date: 2020-03-25 19:06:33 
 */
class ItemHorseHH extends fairygui.GButton {

    //>>>>start
	public selectImg: fairygui.GImage;
	public labName: fairygui.GRichTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public starLb: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public maskBg: fairygui.GImage;
	public boxBattle: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://7shc3kzddwb4u";

    public static createInstance(): ItemHorseHH {
        return <ItemHorseHH><any>(fairygui.UIPackage.createObject("horse", "ItemHorseHH"));
    }

    private _curVo: Vo_Horse;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pData: Vo_Horse) {
        let t = this;
        t._curVo = pData;
        if (pData) {
            t.labName.text = HtmlUtil.font(pData.cfg.name, Color.getColorStr(pData.quality));
            IconUtil.setImg(t.imgIcon, Enum_Path.ICON70_URL + pData.cfg.icon + ".png");
            IconUtil.setImg(t.bg, Enum_Path.ICON70_URL + "BmG_" + pData.quality + ".png");
            t.maskBg.visible = !pData.isAct;
            t.boxBattle.visible = (pData.id == GGlobal.model_Horse.rideId);
            let t_jie = pData.jie;
            let t_ji = pData.ji;
            if (t_jie > 0 && t_ji > 0) {
                t.starLb.text = pData.jiejiStr;
            }
            else {
                t.starLb.text = "";
            }

            t.noticeImg.visible = pData.checkUpConditionHH(false) && pData.checkConsumeHH(false);
        }
        else {
            IconUtil.setImg(t.imgIcon, null);
            IconUtil.setImg(t.bg, null);
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
    //======================================== handler =========================================

}