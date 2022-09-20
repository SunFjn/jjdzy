var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * @author: lujiahao
 * @date: 2019-11-08 16:02:27
 */
var AchievementMasterItem = (function (_super) {
    __extends(AchievementMasterItem, _super);
    function AchievementMasterItem() {
        return _super.call(this) || this;
    }
    AchievementMasterItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "AchievementMasterItem"));
    };
    AchievementMasterItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var t = this;
        CommonManager.parseChildren(t, t);
        t.tfName.wordWrap = true;
    };
    //=========================================== API ==========================================
    AchievementMasterItem.prototype.setData = function (pData) {
        var t = this;
        t._curData = pData;
        if (pData) {
            var t_model = GGlobal.modelAchievement;
            var t_strName = "";
            var t_isActive = pData.isActive;
            var t_color = "#cccccc";
            if (t_isActive) {
                //已激活
                t_strName = "当前阶段";
                t_color = Color.GREENSTR;
            }
            else {
                //未激活
                t_strName = "下一阶段";
            }
            t_strName += " " + HtmlUtil.font("\u6210\u5C31\u70B9\u6570\u8FBE\u5230" + pData.cfg.cjd, Color.WHITESTR);
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
            var t_curCount = t_model.score;
            var t_maxCount = pData.cfg.cjd;
            if (t_curCount >= t_maxCount) {
                t_strName += HtmlUtil.font(" (" + t_curCount + "/" + t_maxCount + ")", Color.GREENSTR);
            }
            else {
                t_strName += HtmlUtil.font(" (" + t_curCount + "/" + t_maxCount + ")", Color.REDSTR);
            }
            t.tfName.text = t_strName;
            var t_strContent = "";
            t_strContent += ConfigHelp.attrString(JSON.parse(pData.cfg.sx), "+", t_color, t_color);
            t_strContent = HtmlUtil.font(t_strContent, t_color);
            t.tfContent.text = t_strContent;
        }
        else {
        }
    };
    AchievementMasterItem.prototype.clean = function () {
        this.setData(null);
        _super.prototype.clean.call(this);
    };
    AchievementMasterItem.prototype.dispose = function () {
        this.clean();
        _super.prototype.dispose.call(this);
    };
    //>>>>end
    AchievementMasterItem.URL = "ui://dllc71i9g7h32a";
    return AchievementMasterItem;
}(fairygui.GComponent));
__reflect(AchievementMasterItem.prototype, "AchievementMasterItem");
