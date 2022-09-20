/**
 * @author: lujiahao 
 * @date: 2019-10-21 22:05:01 
 */
class QiceItemGrid extends fairygui.GButton {

    //>>>>start
	public stateCtrl: fairygui.Controller;
	public tfName: fairygui.GRichTextField;
	public bg: fairygui.GLoader;
	public imgIcon: fairygui.GLoader;
	public tfStar: fairygui.GRichTextField;
	public starGroup: fairygui.GGroup;
	public maskBg: fairygui.GImage;
	public sourceLb: fairygui.GRichTextField;
	public sourceGroup: fairygui.GGroup;
	public selectImg: fairygui.GImage;
	public noticeImg: fairygui.GImage;
	public tfNoActive: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://cokk050nx49y8";

    public static createInstance(): QiceItemGrid {
        return <QiceItemGrid><any>(fairygui.UIPackage.createObject("qice", "QiceItemGrid"));
    }

    private _curData: VoQice;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
    }

    //=========================================== API ==========================================
    public setData(pType: number, pData: VoQice) {
        let t = this;
        t._curData = pData;
        if (pData) {
            t.registerEvent(true);

            t.tfName.text = HtmlUtil.font(pData.cfg.name, Color.getColorStr(pData.cfg.pz));

            if (pData.isActive) {
                t.stateCtrl.selectedIndex = 1;
            }
            else {
                t.stateCtrl.selectedIndex = 0;
            }
            t.tfStar.text = pData.star + "";

            if (pType == 0) {
                //升星
                if (pData.checkCanStarUp(false)
                    || pData.checkHunCanUp(EnumQice.HUN_TYPE_BH, false)
                    || pData.checkHunCanUp(EnumQice.HUN_TYPE_JH, false)
                )
                    t.noticeImg.visible = true;
                else
                    t.noticeImg.visible = false;
            }
            else {
                //升级
                t.noticeImg.visible = pData.checkCanLevelUp(false);
            }

            ImageLoader.instance.loader(Enum_Path.ICON70_URL + pData.cfg.icon + ".png", t.imgIcon);
            ImageLoader.instance.loader(Enum_Path.ICON70_URL + "BmG_" + pData.cfg.pz + ".png", t.bg);
        }
        else {
            t.registerEvent(false);
            t.noticeImg.visible = false;
            ImageLoader.instance.removeLoader(t.imgIcon);
            ImageLoader.instance.removeLoader(t.bg);
        }
    }

    public getData(): VoQice {
        return this._curData;
    }

    public clean() {
        let t = this;
        t.setData(0, null);
        super.clean();
    }

    //===================================== private method =====================================
    private registerEvent(pFlag: boolean) {
    }
    //======================================== handler =========================================
}