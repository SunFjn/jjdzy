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
var View_chat_ShaoZhu = (function (_super) {
    __extends(View_chat_ShaoZhu, _super);
    function View_chat_ShaoZhu() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    View_chat_ShaoZhu.prototype.childrenCreated = function () {
        var self = this;
        self.view = fairygui.UIPackage.createObject("chat", "View_chat_ShaoZhu").asCom;
        self.contentPane = self.view;
        CommonManager.parseChildren(self.view, self);
        self.skillArr = [self.skill0, self.skill1, self.skill2, self.skill3, self.skill4];
        _super.prototype.childrenCreated.call(this);
    };
    /**武将：	//拥有者+少主序号+少主时装+亲密度等级+星级+主动技能等级+战力+被动技能0+被动技能1+被动技能2+被动技能3+被动技能4 */
    View_chat_ShaoZhu.prototype.updateShow = function () {
        var self = this;
        var vo = this._args;
        var arr = vo.content.split("_");
        self.ownerLb.text = "拥有者：" + HtmlUtil.fontNoSize(vo.name, Color.getColorStr(2));
        var chong = Math.floor(Number(arr[12]) % 100000 / 10);
        self.qianNengLb.text = "潜能：第" + chong + "重";
        var shaozhuID = parseInt(arr[1]);
        var fashion = parseInt(arr[2]);
        var cfg = Config.son_267[shaozhuID];
        var qinmi = parseInt(arr[3]);
        var cfg2 = Config.sonqm_267[qinmi];
        var skillLv = parseInt(arr[5]);
        var skillVo = Vo_Skill.create(JSON.parse(cfg.skill)[0][0], skillLv, parseInt(arr[4]));
        self.starLb.text = arr[4];
        self.powerLb.text = "战力：" + arr[6]; //(wjcfg.power + parseInt(arr[2]) * wjcfg.starpower)星级战力计算
        self.nameLb.text = HtmlUtil.fontNoSize("少主·" + cfg.name, Color.getColorStr(cfg.pz));
        IconUtil.setImg(self.levelIcon, "resource/image/son/qm" + Math.floor(cfg2.jie / 100) + ".png");
        self.levelIcon.x = self.nameLb.x + self.nameLb.getTextField().textWidth - 20;
        self.skill.updateShow("", skillVo.icon, false);
        self.skillNameLb.text = skillVo.name;
        self.levelLb.text = "Lv." + skillLv;
        var skillID0 = parseInt(arr[7]);
        var skillID1 = parseInt(arr[8]);
        var skillID2 = parseInt(arr[9]);
        var skillID3 = parseInt(arr[10]);
        var skillID4 = parseInt(arr[11]);
        if (skillID0 > 0) {
            var skillcfg = Config.sonskill_267[skillID0];
            self.skill0.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
        }
        else {
            if (skillID0 == 0) {
                self.skill0.updateShow("", "", false);
            }
            else {
                self.skill0.updateShow("", "", true);
            }
        }
        if (skillID1 > 0) {
            var skillcfg = Config.sonskill_267[skillID1];
            self.skill1.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
        }
        else {
            if (skillID1 == 0) {
                self.skill1.updateShow("", "", false);
            }
            else {
                self.skill1.updateShow("", "", true);
            }
        }
        if (skillID2 > 0) {
            var skillcfg = Config.sonskill_267[skillID2];
            self.skill2.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
        }
        else {
            if (skillID2 == 0) {
                self.skill2.updateShow("", "", false);
            }
            else {
                self.skill2.updateShow("", "", true);
            }
        }
        if (skillID3 > 0) {
            var skillcfg = Config.sonskill_267[skillID3];
            self.skill3.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
        }
        else {
            if (skillID3 == 0) {
                self.skill3.updateShow("", "", false);
            }
            else {
                self.skill3.updateShow("", "", true);
            }
        }
        if (skillID4 > 0) {
            var skillcfg = Config.sonskill_267[skillID4];
            self.skill4.updateShow(HtmlUtil.fontNoSize(skillcfg.name, Color.getColorStr(skillcfg.pz)), skillcfg.icon, false);
        }
        else {
            if (skillID4 == 0) {
                self.skill4.updateShow("", "", false);
            }
            else {
                self.skill4.updateShow("", "", true);
            }
        }
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        if (fashion > 0 && Config.sonshow_267[fashion]) {
            if (!self.awatar) {
                self.awatar = EffectMgr.addEff("uieff/" + Config.sonshow_267[fashion].zs, self.displayListContainer, 150, 270, 1000, -1, true);
            }
        }
        else {
            if (!self.awatar) {
                self.awatar = EffectMgr.addEff("uieff/" + cfg.zs, self.displayListContainer, 150, 270, 1000, -1, true);
            }
        }
    };
    View_chat_ShaoZhu.prototype.onShown = function () {
        var self = this;
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        self.updateShow();
    };
    View_chat_ShaoZhu.prototype.onHide = function () {
        var self = this;
        if (self.awatar) {
            EffectMgr.instance.removeEff(self.awatar);
            self.awatar = null;
        }
        IconUtil.setImg(self.backIcon, null);
        IconUtil.setImg(self.levelIcon, null);
        GGlobal.layerMgr.close(UIConst.CHAT_SHAOZHU);
    };
    View_chat_ShaoZhu.URL = "ui://fx4pr5qeewn52j";
    return View_chat_ShaoZhu;
}(UIModalPanel));
__reflect(View_chat_ShaoZhu.prototype, "View_chat_ShaoZhu");
