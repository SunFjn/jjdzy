/**
 * @author: lujiahao 
 * @date: 2019-11-08 16:02:27 
 */
class AchievementMasterItem extends fairygui.GComponent {

    //>>>>start
	public tfName: fairygui.GRichTextField;
	public tfContent: fairygui.GRichTextField;
	public imgSource: fairygui.GImage;
	//>>>>end

    public static URL: string = "ui://dllc71i9g7h32a";

    public static createInstance(): AchievementMasterItem {
        return <AchievementMasterItem><any>(fairygui.UIPackage.createObject("rebirth", "AchievementMasterItem"));
    }

    private _curData: VoMasterAchievement;

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        let t = this;
        CommonManager.parseChildren(t, t);
        t.tfName.wordWrap = true;
    }

    //=========================================== API ==========================================
    public setData(pData: VoMasterAchievement) {
        let t = this;
        t._curData = pData;
        if (pData) {
            let t_model = GGlobal.modelAchievement;
            let t_strName = "";
            let t_isActive = pData.isActive;
            let t_color = "#cccccc";
            if (t_isActive) {
                //已激活
                t_strName = "当前阶段";
                t_color = Color.GREENSTR;
            }
            else {
                //未激活
                t_strName = "下一阶段";
            }
            t_strName += " " + HtmlUtil.font(`成就点数达到${pData.cfg.cjd}`, Color.WHITESTR);

            // if (t_isActive) {
            //     t_strName += HtmlUtil.font(` (已激活)`, Color.GREENSTR);
            // }
            // else {
            //     let t_curCount = t_model.score;
            //     let t_maxCount = pData.cfg.cjd;
            //     if (t_curCount >= t_maxCount) {
            //         t_strName += HtmlUtil.font(` (可激活)`, Color.GREENSTR);
            //     }
            //     else {
            //         t_strName += HtmlUtil.font(` (${t_curCount}/${t_maxCount})`, Color.REDSTR);
            //     }
            // }
            let t_curCount = t_model.score;
            let t_maxCount = pData.cfg.cjd;
            if (t_curCount >= t_maxCount) {
                t_strName += HtmlUtil.font(` (${t_curCount}/${t_maxCount})`, Color.GREENSTR);
            }
            else {
                t_strName += HtmlUtil.font(` (${t_curCount}/${t_maxCount})`, Color.REDSTR);
            }
            t.tfName.text = t_strName;

            let t_strContent = "";
            t_strContent += ConfigHelp.attrString(JSON.parse(pData.cfg.sx), "+", t_color, t_color);
            t_strContent = HtmlUtil.font(t_strContent, t_color);

            t.tfContent.text = t_strContent;
        }
        else {
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