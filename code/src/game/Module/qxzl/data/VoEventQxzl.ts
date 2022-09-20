/**
 * 群雄逐鹿战况数据结构
 * @author: lujiahao 
 * @date: 2019-10-09 17:24:57 
 */
class VoEventQxzl {
    //============== 静态管理 ===================
    static create(): VoEventQxzl {
        let t_vo = Pool.getItemByClass("VoEventQxzl", VoEventQxzl);
        return t_vo;
    }

    static release(pVo: VoEventQxzl) {
        pVo.recycle();
        Pool.recover("VoEventQxzl", pVo);
    }
    //============== 静态管理 ===================

    /** A玩家国家 */
    public p1Country = 0;
    /** A玩家名称 */
    public p1Name = "";
    /** B玩家国家 */
    public p2Country = 0;
    /** B玩家名称 */
    public p2Name = "";
    /** 战况类型 */
    public type = 0;
    /** 参数 */
    public param = 0;

    /** 标签类型 0：全服战况 1：个人战况 */
    public tabType = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pTabType: number, pP1Country: number, pP1Name: string, pP2Country: number, pP2Name: string, pType: number, pParam: number): boolean {
        let t = this;
        let t_change = false;
        if (t.tabType != pTabType) {
            t.tabType = pTabType;
            t_change = true;
        }
        if (t.p1Country != pP1Country) {
            t.p1Country = pP1Country;
            t_change = true;
        }
        if (t.p1Name != pP1Name) {
            t.p1Name = pP1Name;
            t_change = true;
        }
        if (t.p2Country != pP2Country) {
            t.p2Country = pP2Country;
            t_change = true;
        }
        if (t.p2Name != pP2Name) {
            t.p2Name = pP2Name;
            t_change = true;
        }
        if (t.type != pType) {
            t.type = pType;
            t_change = true;
        }
        if (t.param != pParam) {
            t.param = pParam;
            t_change = true;
        }
        return t_change;
    }

    public recycle() {
        let t = this;
        t.p1Country = 0;
        t.p1Name = "";
        t.p2Country = 0;
        t.p2Name = "";
        t.type = 0;
        t.param = 0;
        t.tabType = 0;
        t._content = undefined;
    }

    private _content: string;
    public get content(): string {
        let t = this;
        let t_p1Country = FastAPI.getCountryName(t.p1Country, true);
        let t_p1color = FastAPI.getColorByCountry(t.p1Country);
        let t_p1Name = HtmlUtil.font(t.p1Name, t_p1color);
        let t_p1 = "【" + t_p1Country + "】" + t_p1Name;

        let t_cityName = HtmlUtil.font("未知城市", Color.YELLOWSTR);
        let t_cityVo = GGlobal.modelQxzl.getCityVoById(t.param);
        if (t_cityVo) {
            t_cityName = HtmlUtil.font(t_cityVo.cfg.name, Color.YELLOWSTR);
        }

        if (t.tabType == 0) { //全服
            var t_p2Country = FastAPI.getCountryName(t.p2Country, true);
            var t_p2color = FastAPI.getColorByCountry(t.p2Country);
            var t_p2Name = HtmlUtil.font(t.p2Name, t_p2color);
            var t_p2 = "【" + t_p2Country + "】" + t_p2Name;
        }
        else { //个人
            t_p2 = "您";
        }

        if (t._content == undefined) {
            switch (t.type) {
                case 1: //进攻战胜
                    t._content = ConfigHelp.reTxt("{0}进攻{1}，战胜了{2}", t_p1, t_cityName, t_p2);
                    break;
                case 2: //进攻失败
                    t._content = ConfigHelp.reTxt("{0}进攻{1}，但被{2}击败了", t_p1, t_cityName, t_p2);
                    break;
                case 3: //占领
                    t._content = ConfigHelp.reTxt("{0}神威无双，占领了{1}", t_p1, t_cityName);
                    break;
            }
        }
        return t._content;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}