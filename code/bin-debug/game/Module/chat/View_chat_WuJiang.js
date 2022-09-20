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
var View_chat_WuJiang = (function (_super) {
    __extends(View_chat_WuJiang, _super);
    function View_chat_WuJiang() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this.childrenCreated();
        return _this;
    }
    View_chat_WuJiang.prototype.childrenCreated = function () {
        var s = this;
        s.view = fairygui.UIPackage.createObject("chat", "View_chat_WuJiang").asCom;
        s.contentPane = s.view;
        CommonManager.parseChildren(s.view, s);
        _super.prototype.childrenCreated.call(this);
    };
    /**武将：id_时装_星级_等阶_战力_技能等级1_2_3 */
    View_chat_WuJiang.prototype.updateShow = function () {
        var s = this;
        var vo = this._args;
        var arr = vo.content.split("_");
        var fashion = parseInt(arr[1]);
        var job = parseInt(arr[0]);
        s.starLb.text = arr[2];
        s.ownerLb.text = "拥有者：" + vo.name;
        s.powerLb.text = "战力：" + arr[4]; //(wjcfg.power + parseInt(arr[2]) * wjcfg.starpower)星级战力计算
        var wjcfg = Config.hero_211[job];
        var isGodWuJiang = Model_WuJiang.isGodWuJiang(job);
        var skillArr = JSON.parse(wjcfg.skills);
        var star = arr[2];
        if (isGodWuJiang) {
            star = ModelGodWuJiang.conversionToStar(star);
            s.nameLb.text = HtmlUtil.fontNoSize(wjcfg.name + "(" + ModelGodWuJiang.getXiuLianStr(parseInt(arr[2])) + ")", Color.getColorStr(wjcfg.pinzhi));
        }
        else {
            s.nameLb.text = HtmlUtil.fontNoSize("武将·" + wjcfg.name + "(" + Config.herolv_211[parseInt(arr[3])].jie + ")", Color.getColorStr(wjcfg.pinzhi));
        }
        var skillDamArr = [];
        var godskillCfg = Config.herogodskill_211[job * 100 + parseInt(arr[10])];
        if (godskillCfg) {
            var skillId = void 0;
            var attArr = JSON.parse(godskillCfg.attpg);
            for (var i = 0; i < skillArr.length; i++) {
                skillId = skillArr[i][0];
                for (var j = 0; j < attArr.length; j++) {
                    if (attArr[j][0] == skillId) {
                        skillDamArr.push(attArr[j][1]);
                    }
                }
            }
        }
        s.skill0.setVo(skillArr[0][0], 0, parseInt(arr[5]) > 0 ? parseInt(arr[5]) : 1, job, star, 0, skillDamArr[0] ? skillDamArr[0] : 0);
        s.skill1.setVo(skillArr[1][0], 1, parseInt(arr[6]) > 0 ? parseInt(arr[6]) : 1, job, star, 0, skillDamArr[0] ? skillDamArr[0] : 0);
        s.skill2.setVo(skillArr[2][0], 2, parseInt(arr[7]) > 0 ? parseInt(arr[7]) : 1, job, star, 0, skillDamArr[0] ? skillDamArr[0] : 0);
        s.skill3.setVo(skillArr[3][0], 3, 1, job, star);
        var cfg = Config.sz_739[fashion];
        if (cfg) {
            s.awatar.setBody(cfg.moxing);
            s.awatar.setWeapon(fashion);
        }
        else {
            s.awatar.setBody(job);
            s.awatar.setWeapon(job);
        }
        s.awatar.setGodWeapon(parseInt(arr[8]));
        s.awatar.setHorseId(vo.horseId);
        s.awatar.uiparent = s.displayListContainer;
        s.awatar.onAdd();
        Timer.instance.remove(s.playSkill, s);
        s.secSkill = skillArr[1][0];
        if (isGodWuJiang) {
            s.skillInnate.setVo(wjcfg.skill, 4, parseInt(arr[9]), job, arr[2], { id: wjcfg.buffid });
            s.groupTF.visible = true;
            s.groupStar.visible = false;
        }
        else {
            s.groupTF.visible = false;
            s.groupStar.visible = true;
        }
        if (!vo.horseId) {
            s.playSkill();
            s.awatar.setScaleXY(1.5, 1.5);
        }
        else {
            s.awatar.setScaleXY(1, 1);
        }
        // s.playSkill();
    };
    View_chat_WuJiang.prototype.playSkill = function () {
        this.awatar.playSkillID(this.secSkill, false);
        Timer.instance.callLater(this.playSkill, 5000, this);
    };
    View_chat_WuJiang.prototype.onShown = function () {
        var self = this;
        if (!self.awatar) {
            self.awatar = UIRole.create();
            self.awatar.setPos(self.imgDi.x, self.imgDi.y);
            // self.awatar.setScaleXY(1.5, 1.5);
        }
        IconUtil.setImg(self.backIcon, Enum_Path.BACK_URL + "chatBg.png");
        self.updateShow();
    };
    View_chat_WuJiang.prototype.onHide = function () {
        var self = this;
        if (self.awatar) {
            self.awatar.onRemove();
            self.awatar = null;
        }
        IconUtil.setImg(self.backIcon, null);
        GGlobal.layerMgr.close(UIConst.CHAT_WUJIANG);
        Timer.instance.remove(self.playSkill);
    };
    View_chat_WuJiang.URL = "ui://fx4pr5qewjpa2b";
    return View_chat_WuJiang;
}(UIModalPanel));
__reflect(View_chat_WuJiang.prototype, "View_chat_WuJiang");
