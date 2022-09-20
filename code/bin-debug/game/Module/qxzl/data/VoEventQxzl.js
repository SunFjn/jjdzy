var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 群雄逐鹿战况数据结构
 * @author: lujiahao
 * @date: 2019-10-09 17:24:57
 */
var VoEventQxzl = (function () {
    function VoEventQxzl() {
        //============== 静态管理 ===================
        /** A玩家国家 */
        this.p1Country = 0;
        /** A玩家名称 */
        this.p1Name = "";
        /** B玩家国家 */
        this.p2Country = 0;
        /** B玩家名称 */
        this.p2Name = "";
        /** 战况类型 */
        this.type = 0;
        /** 参数 */
        this.param = 0;
        /** 标签类型 0：全服战况 1：个人战况 */
        this.tabType = 0;
    }
    //============== 静态管理 ===================
    VoEventQxzl.create = function () {
        var t_vo = Pool.getItemByClass("VoEventQxzl", VoEventQxzl);
        return t_vo;
    };
    VoEventQxzl.release = function (pVo) {
        pVo.recycle();
        Pool.recover("VoEventQxzl", pVo);
    };
    //=========================================== API ==========================================
    VoEventQxzl.prototype.update = function (pTabType, pP1Country, pP1Name, pP2Country, pP2Name, pType, pParam) {
        var t = this;
        var t_change = false;
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
    };
    VoEventQxzl.prototype.recycle = function () {
        var t = this;
        t.p1Country = 0;
        t.p1Name = "";
        t.p2Country = 0;
        t.p2Name = "";
        t.type = 0;
        t.param = 0;
        t.tabType = 0;
        t._content = undefined;
    };
    Object.defineProperty(VoEventQxzl.prototype, "content", {
        get: function () {
            var t = this;
            var t_p1Country = FastAPI.getCountryName(t.p1Country, true);
            var t_p1color = FastAPI.getColorByCountry(t.p1Country);
            var t_p1Name = HtmlUtil.font(t.p1Name, t_p1color);
            var t_p1 = "【" + t_p1Country + "】" + t_p1Name;
            var t_cityName = HtmlUtil.font("未知城市", Color.YELLOWSTR);
            var t_cityVo = GGlobal.modelQxzl.getCityVoById(t.param);
            if (t_cityVo) {
                t_cityName = HtmlUtil.font(t_cityVo.cfg.name, Color.YELLOWSTR);
            }
            if (t.tabType == 0) {
                var t_p2Country = FastAPI.getCountryName(t.p2Country, true);
                var t_p2color = FastAPI.getColorByCountry(t.p2Country);
                var t_p2Name = HtmlUtil.font(t.p2Name, t_p2color);
                var t_p2 = "【" + t_p2Country + "】" + t_p2Name;
            }
            else {
                t_p2 = "您";
            }
            if (t._content == undefined) {
                switch (t.type) {
                    case 1://进攻战胜
                        t._content = ConfigHelp.reTxt("{0}进攻{1}，战胜了{2}", t_p1, t_cityName, t_p2);
                        break;
                    case 2://进攻失败
                        t._content = ConfigHelp.reTxt("{0}进攻{1}，但被{2}击败了", t_p1, t_cityName, t_p2);
                        break;
                    case 3://占领
                        t._content = ConfigHelp.reTxt("{0}神威无双，占领了{1}", t_p1, t_cityName);
                        break;
                }
            }
            return t._content;
        },
        enumerable: true,
        configurable: true
    });
    return VoEventQxzl;
}());
__reflect(VoEventQxzl.prototype, "VoEventQxzl");
