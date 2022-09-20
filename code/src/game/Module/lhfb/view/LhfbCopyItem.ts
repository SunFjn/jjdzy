/**
 * @author: lujiahao 
 * @date: 2020-02-28 22:55:23 
 */
class LhfbCopyItem extends fairygui.GButton {

    //>>>>start
	public tfTitle: fairygui.GRichTextField;
	public noticeImg: fairygui.GImage;
	public loaderIcon: fairygui.GLoader;
	public t0: fairygui.Transition;
	//>>>>end

    public static URL: string = "ui://3o8q23uuymt71v";

    public static createInstance(): LhfbCopyItem {
        return <LhfbCopyItem><any>(fairygui.UIPackage.createObject("syzlb", "LhfbCopyItem"));
    }

    public constructor() {
        super();
    }

    /** 轮回id */
    private _curData: VoCopyLhfb;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);

        let t = this;
        CommonManager.parseChildren(t, t);
    }
    //=========================================== API ==========================================
    public setData(pData: VoCopyLhfb) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_model = GGlobal.modelLhfb;
            let t_vo = t_model.getLevelVoByLunhuiIdAndStar(pData.lunhuiId, 1);
            let t_canEnter = pData.canEnter(false);
            if (t_vo) {
                if (t_canEnter) {
                    t.tfTitle.text = t_vo.name;
                }
                else {
                    t.tfTitle.text = HtmlUtil.font(`${ConfigHelp.NumberToChinese(pData.lunhuiId)}世轮回开启`, Color.REDSTR);
                }
                IconUtil.setImg(t.loaderIcon, Enum_Path.IMAGE_URL + "liudao/" + t_vo.cfg.tb + ".png");
            }
            if (pData.remainCount > 0 && t_canEnter)
                t.noticeImg.visible = true;
            else
                t.noticeImg.visible = false;
        }
        else {
            IconUtil.setImg(t.loaderIcon, null);
        }
    }

    public clean() {
        let t = this;
        t.setData(null);
        super.clean();
    }

    public dispose() {
        let t = this;
        t.clean();
        super.dispose();
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}