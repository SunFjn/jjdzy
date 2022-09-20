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
var ChildGodWuJiangXiuLian = (function (_super) {
    __extends(ChildGodWuJiangXiuLian, _super);
    function ChildGodWuJiangXiuLian() {
        var _this = _super.call(this) || this;
        _this._icons = [];
        //神将 一重=普通武将升星1星
        _this.update = function () {
            var self = _this;
            self.setListData();
            var m = GGlobal.modelGodWuJiang;
            var job = self._curVO.type;
            var currentData = ModelGodWuJiang.getGodDataByID(job);
            var skills = JSON.parse(self._curVO.skills);
            var currentLevel = currentData.xiulianLv; //当前修炼等级
            currentLevel = currentLevel == 0 ? 8000 : currentLevel;
            var godwujiangCFG = Config.godheroxl_289[currentLevel];
            var chong = 0;
            var jie = 0;
            var realLevel = 0;
            if (currentData) {
                realLevel = currentLevel % 1000;
                jie = realLevel % 10;
                chong = (realLevel - jie) / 10;
            }
            self.lbLevel.text = BroadCastManager.reTxt("{0}重{1}阶", chong, jie);
            for (var i = 0; i < 7; i++) {
                var icon = self._icons[i];
                icon.grayed = i >= jie;
            }
            var star = chong + 1;
            var nextStar = star;
            var score = 0;
            var score1 = 0;
            var skillsArr = skills;
            var skillList = Model_player.voMine.skillList;
            var cfgids = JSON.parse(Config.hero_211[job].attack);
            nextStar = 8000 + (chong + 1) * 10;
            if (Config.godheroxl_289[nextStar]) {
                nextStar = chong + 2;
            }
            else {
                nextStar = chong + 1;
            }
            for (var i = 0; i < skillsArr.length; i++) {
                var skillVo = void 0;
                var skillVo1 = void 0;
                if (skillList[cfgids.length + i]) {
                    var level = skillList[cfgids.length + i].level;
                    skillVo = Vo_Skill.create(skillsArr[0][0], level, star);
                    if (star < nextStar) {
                        skillVo1 = Vo_Skill.create(skillsArr[0][0], level, star + 1);
                    }
                }
                else {
                    skillVo = Vo_Skill.create(skillsArr[0][0], 1, star);
                    if (star < nextStar) {
                        skillVo1 = Vo_Skill.create(skillsArr[0][0], 1, star + 1);
                    }
                }
                score += skillVo.powerAtt_lv;
                if (star < nextStar) {
                    score1 += skillVo1.powerAtt_lv;
                }
            }
            self.lbNowScore.text = "当前评分\n" + HtmlUtil.fontNoSize("" + Math.ceil(score / 100000 * 600), Color.getColorStr(2));
            if (score1 != 0)
                self.lbNextScore.text = "下级评分\n" + HtmlUtil.fontNoSize("" + Math.ceil(score1 / 100000 * 600), Color.getColorStr(2));
            else
                self.lbNextScore.text = "";
            var nextLevel = Config.godheroxl_289[currentData.xiulianLv].next;
            var cfg = Config.herostar_211;
            if (nextLevel != 0) {
                var attrArr = JSON.parse(cfg[currentLevel].attr);
                self.labAttrCur.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
                self.imgArrow.visible = true;
                self.starGroup.visible = true;
                self.boxMax.visible = false;
                self.n29.visible = true;
                attrArr = JSON.parse(cfg[nextLevel].attr);
                self.labAttrNext.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
                self.starPowerLb.text = (cfg[nextLevel].power - cfg[currentLevel].power) + "";
                self.labAttrMax.text = "";
            }
            else {
                self.boxMax.visible = true;
                self.imgArrow.visible = false;
                self.starGroup.visible = false;
                self.n29.visible = false;
                self.lbNextScore.text = "";
                self.labAttrCur.text = "";
                self.labAttrNext.text = "";
                var attrArr = JSON.parse(cfg[currentLevel].attr);
                self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
            }
            var wujiangCFG = Config.herostar_211[currentData.xiulianLv];
            self.labPower.text = "" + wujiangCFG.power;
            //消耗
            self.showbagItem();
        };
        _this.setListData = function () {
            var self = _this;
            self._listData = ModelGodWuJiang.wuJiangArr;
            self.list.numItems = self._listData.length;
            if (!self._curVO) {
                self.list.selectedIndex = 0;
                self._curVO = self._listData[0];
            }
        };
        _this._enough = false;
        _this.showbagItem = function () {
            var self = _this;
            var m = GGlobal.modelGodWuJiang;
            if (!self._curVO) {
                return;
            }
            var currentData = ModelGodWuJiang.getGodDataByID(self._curVO.type);
            var currentLevel = currentData.xiulianLv; //当前修炼等级
            var godwujiangCFG = Config.godheroxl_289[currentLevel];
            var item;
            var needCount;
            if (godwujiangCFG.conmuse == "0") {
                self.btnBreach.visible = true;
                self.btnUp.visible = false;
                item = JSON.parse(self._curVO.activation);
                needCount = godwujiangCFG.tp;
            }
            else {
                self.btnUp.visible = true;
                self.btnBreach.visible = false;
                item = JSON.parse(godwujiangCFG.conmuse);
                needCount = item[0][2];
            }
            var itemid = item[0][1];
            var itemcfg = Config.daoju_204[itemid];
            self.labCost.text = ConfigHelp.getItemColorName(itemid);
            var hasCount = Model_Bag.getItemCount(itemid);
            IconUtil.setImg(self.imgItem, Enum_Path.ICON70_URL + itemcfg.icon + ".png");
            var color = hasCount >= needCount ? Color.GREENSTR : Color.REDSTR;
            self._enough = hasCount >= needCount;
            self.btnBreach.checkNotice = self._enough;
            self.btnUp.checkNotice = self._enough;
            self.lbCount.text = "<font color='" + color + "'>" + hasCount + "/" + needCount + "</font>";
        };
        _this.itemClick = function (e) {
            var self = _this;
            var clickItem = e.itemObject;
            self._curVO = clickItem.vo;
            self.update();
        };
        _this.levelupHD = function () {
            var self = _this;
            var m = GGlobal.modelGodWuJiang;
            if (!self._enough) {
                ViewCommonWarn.text("材料不足");
                return;
            }
            if (!ModelGodWuJiang.getWuJiangIsActivation(self._curVO.type)) {
                ViewCommonWarn.text("激活神将才可升星");
                return;
            }
            if (_this._curVO) {
                GGlobal.modelGodWuJiang.CG_WuJiang_upShenJiangLv_681(_this._curVO.type);
            }
        };
        _this.event_fun = function (v) {
            var self = _this;
            var efun = EventUtil.register;
            efun(v, self.list, fairygui.ItemEvent.CLICK, self.itemClick, self);
            efun(v, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.levelupHD, self);
            efun(v, self.btnBreach, egret.TouchEvent.TOUCH_TAP, self.levelupHD, self);
        };
        _this.openPanel = function (pData) {
            var self = _this;
            self.update();
            self.event_fun(1);
            GGlobal.control.listen(Enum_MsgType.MSG_BAG_VO_UPDATE, self.showbagItem, self);
            GGlobal.control.listen(UIConst.WU_JIANG, self.update, self);
            IconUtil.setImg(self.n49, Enum_Path.BACK_URL + "godweaponline.png");
            IconUtil.setImg(self.n44, Enum_Path.BACK_URL + "godwujiang.jpg");
        };
        _this.closePanel = function (pData) {
            var self = _this;
            self.event_fun(0);
            IconUtil.setImg(self.n44, null);
            IconUtil.setImg(self.n49, null);
            GGlobal.control.remove(UIConst.WU_JIANG, self.update, self);
            GGlobal.control.remove(Enum_MsgType.MSG_BAG_VO_UPDATE, self.showbagItem, self);
            self.list.numItems = 0;
        };
        return _this;
    }
    ChildGodWuJiangXiuLian.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ChildGodWuJiangXiuLian"));
    };
    ChildGodWuJiangXiuLian.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHander;
        self.list.setVirtual();
        self._icons = [self.icon0, self.icon1, self.icon2, self.icon3, self.icon4, self.icon5, self.icon6];
    };
    ChildGodWuJiangXiuLian.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._listData[index];
    };
    ChildGodWuJiangXiuLian.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildGodWuJiangXiuLian.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ChildGodWuJiangXiuLian.URL = "ui://zyx92gzwnlyo4l";
    return ChildGodWuJiangXiuLian;
}(fairygui.GComponent));
__reflect(ChildGodWuJiangXiuLian.prototype, "ChildGodWuJiangXiuLian", ["IPanel"]);
