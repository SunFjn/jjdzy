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
var ChildGodWuJiang = (function (_super) {
    __extends(ChildGodWuJiang, _super);
    function ChildGodWuJiang() {
        var _this = _super.call(this) || this;
        _this.awatar = null;
        _this._star_OK = false;
        _this._item_OK = false;
        _this.activationHD = function () {
            var self = _this;
            if (!self._star_OK) {
                ViewCommonWarn.text("红将总星级不足");
                return;
            }
            if (!self._item_OK) {
                ViewCommonWarn.text("道具不足");
                return;
            }
            GGlobal.modelGodWuJiang.CG_WuJiang_shenJiangJiHuo_679(_this._curVO.type);
        };
        _this.itemClick = function (e) {
            var clickItem = e.itemObject;
            _this._curVO = clickItem.vo;
            _this.update();
        };
        _this.onBattle = function (e) {
            var self = _this;
            if (self._curVO) {
                var v = self._curVO;
                if (v.type == Model_player.voMine.job) {
                    ViewCommonWarn.text("出战中");
                    return;
                }
                if (!ModelGodWuJiang.getWuJiangIsActivation(v.type)) {
                    ViewCommonWarn.text("武将未激活");
                    return;
                }
                GGlobal.modelWuJiang.CGChangeJob(v.type);
                //根据场景角色状态，修改状态
                var role = Model_player.voMine.sceneChar;
                if (role) {
                    var map = role.scene.map;
                    if (map && map.mid == 361001 && role.hurt_state == 3) {
                        role.hurt_state = 4;
                    }
                }
            }
        };
        _this.openTF = function (e) {
            GGlobal.layerMgr.open(UIConst.GOD_WUJIANG_TF, _this._curVO);
        };
        _this.showModelHD = function (e) {
            GGlobal.modelchat.CG_CHAT_SHOW_DATA(8, _this._curVO.type);
        };
        _this.update = function () {
            var self = _this;
            self.setListData();
            var model = GGlobal.modelGodWuJiang;
            var vo = self._curVO;
            var job = vo.type;
            self.labName.text = vo.name;
            self.labName.color = Color.REDINT;
            self.imgBattle.visible = false;
            self.btnBattle.touchable = self.btnBattle.visible = false;
            self.labPower.text = "0";
            if (model.data[job]) {
                if (job == Model_player.voMine.job) {
                    self.btnBattle.touchable = self.btnBattle.visible = false;
                    self.imgBattle.visible = true;
                }
                else {
                    self.imgBattle.visible = false;
                    self.btnBattle.touchable = self.btnBattle.visible = true;
                }
                self.labPower.text = vo.power + "";
            }
            var skillsArr = ConfigHelp.SplitStr(vo.skills);
            var secSkill = skillsArr[1][0];
            self.skill0.setVo(skillsArr[0][0], 0);
            self.skill1.setVo(skillsArr[1][0], 1);
            self.skill2.setVo(skillsArr[2][0], 2);
            self.skill3.setVo(skillsArr[3][0], 3);
            var xiulianLevel = ModelGodWuJiang.getXiuLianLevel(job);
            xiulianLevel = xiulianLevel % 1000;
            var jie = xiulianLevel % 10;
            xiulianLevel = (xiulianLevel - jie) / 10;
            var star = xiulianLevel + 1;
            var skillList = Model_player.voMine.skillList;
            var cfgids = JSON.parse(Config.hero_211[vo.type].attack);
            var score = 0;
            for (var i = 0; i < skillsArr.length; i++) {
                var skillVo = void 0;
                if (skillList[cfgids.length + i]) {
                    var level = skillList[cfgids.length + i].level;
                    skillVo = Vo_Skill.create(skillsArr[0][0], level, star);
                }
                else {
                    skillVo = Vo_Skill.create(skillsArr[0][0], 1, star);
                }
                score += skillVo.powerAtt_lv;
            }
            self.scoreLb.text = "技能评分：" + HtmlUtil.fontNoSize("" + Math.ceil(score / 100000 * 600), Color.getColorStr(2));
            var attrArr = JSON.parse(vo.attr);
            self.labAttrMax.text = ConfigHelp.attrString(attrArr, "+", null, "#15f234");
            if (model.data[vo.type]) {
                self.starGroup.visible = false;
                self.boxMax.visible = true;
                self.showBt.visible = true;
            }
            else {
                self.showBt.visible = false;
                self.boxMax.visible = false;
                self.starGroup.visible = true;
                var totalStar = Model_WuJiang.getQuilityTotalStar(7) + Model_WuJiang.getQuilityTotalStar(6);
                var color = totalStar < vo.jh ? Color.REDSTR : Color.GREENSTR;
                self.labTios.text = BroadCastManager.reTxt("激活条件：红将总星级达到(<font color='{0}'>{1}/{2}</font>)星", color, totalStar, vo.jh);
                self._star_OK = totalStar >= vo.jh;
                var itemCFG = JSON.parse(vo.activation);
                var itemId = itemCFG[0][1];
                var itemName = ConfigHelp.getItemColorName(itemId);
                var itemNum = Model_Bag.getItemCount(itemId);
                self._item_OK = itemNum >= itemCFG[0][2];
                color = itemNum >= itemCFG[0][2] ? Color.GREENSTR : Color.REDSTR;
                self.labCost.text = BroadCastManager.reTxt("消耗：{0}*1<font color='{1}'>({2}/{3})</font>", itemName, color, itemNum, itemCFG[0][2]);
                self.btnUp.checkNotice = self._star_OK && self._item_OK;
            }
            if (!self.awatar) {
                self.awatar = UIRole.create();
                self.awatar.setPos(self.img.x, self.img.y);
                // self.awatar.setScaleXY(1.5, 1.5);
                self.awatar.uiparent = self.displayListContainer;
                self.awatar.view.touchEnabled = self.awatar.view.touchChildren = false;
            }
            var godWeapon = Model_ZSGodWeapon.getGodWeaponByJob(vo.type);
            var szInfo = Model_WuJiang.shiZhuanDic[vo.type];
            if (szInfo && szInfo.onSkinId) {
                var mx = Config.sz_739[szInfo.onSkinId].moxing;
                self.awatar.setBody(mx);
                self.awatar.setWeapon(szInfo.onSkinId);
            }
            else {
                self.awatar.setBody(vo.type);
                self.awatar.setWeapon(vo.type);
            }
            var horseId = Model_player.voMine.horseId;
            self.awatar.setHorseId(horseId);
            if (horseId) {
                self.awatar.setScaleXY(1, 1);
            }
            else {
                self.awatar.setScaleXY(1.5, 1.5);
            }
            self.awatar.setGodWeapon(godWeapon);
            self.awatar.onAdd();
            self.showBt.parent.setChildIndex(self.showBt, self.showBt.parent.numChildren - 1);
        };
        _this.setListData = function () {
            var self = _this;
            self._listData = ModelGodWuJiang.wuJiangArr.sort(function (a, b) {
                return self.getweight(a) > self.getweight(b) ? -1 : 1;
            });
            self.list.numItems = self._listData.length;
            if (!self._curVO) {
                self.list.selectedIndex = 0;
                self._curVO = self._listData[0];
            }
        };
        _this.getweight = function (a) {
            var weight = a.type;
            var model = GGlobal.modelGodWuJiang;
            //可激活＞出战中＞已激活＞不可激活
            if (model.data[a.type]) {
                if (a.type == Model_player.voMine.job) {
                    weight += 100000;
                }
                else {
                    weight += 10000; //已激活+十万
                }
            }
            else {
                var itemCFG = JSON.parse(a.activation);
                var itemId = itemCFG[0][1];
                var itemNum = Model_Bag.getItemCount(itemId);
                if (itemNum >= itemCFG[0][2]) {
                    weight += 1000000; //可激活+百万
                }
            }
            return weight;
        };
        _this.eventFun = function (v) {
            var event = EventUtil.register;
            var self = _this;
            event(v, self.list, fairygui.ItemEvent.CLICK, self.itemClick, self);
            event(v, self.btnUp, egret.TouchEvent.TOUCH_TAP, self.activationHD, self);
            event(v, self.showBt, egret.TouchEvent.TOUCH_TAP, self.showModelHD, self);
            event(v, self.btnBattle, egret.TouchEvent.TOUCH_TAP, self.onBattle, self);
            event(v, self.n39, egret.TouchEvent.TOUCH_TAP, self.openTF, self);
            event(v, self.jueXingBt, egret.TouchEvent.TOUCH_TAP, self.OnJueXing, self);
        };
        _this.OnJueXing = function () {
            GGlobal.layerMgr.open(UIConst.JUEXING_WUJIANG, UIConst.GOD_WUJIANG);
        };
        _this.updateNotice = function () {
            _this.n39.checkNotice = GGlobal.reddot.checkCondition(UIConst.GOD_WUJIANG, 2);
        };
        _this.openPanel = function (pData) {
            var self = _this;
            self.eventFun(1);
            self.updateNotice();
            self.updateJuexing();
            var m = GGlobal.modelGodWuJiang;
            m.CG_WuJiang_getShenJiang_677();
            GGlobal.control.listen(UIConst.WU_JIANG, self.update, self);
            GGlobal.reddot.listen(UIConst.GOD_WUJIANG, self.updateNotice, self);
            GGlobal.reddot.listen(UIConst.JUEXING, self.updateNotice, self);
            GGlobal.control.listen(Enum_MsgType.WUJIANG_CHANGE_JOB, self.update, self);
        };
        _this.updateJuexing = function () {
            var self = _this;
            self.jueXingBt.visible = Model_JueXing.checkOpenJuexing(UIConst.GOD_WUJIANG);
            self.jueXingBt.checkNotice = GGlobal.reddot.checkCondition(UIConst.JUEXING, 7);
        };
        _this.closePanel = function (pData) {
            var self = _this;
            self.eventFun(0);
            if (self.awatar) {
                self.awatar.onRemove();
                self.awatar = null;
            }
            self._curVO = null;
            GGlobal.reddot.remove(UIConst.JUEXING, self.updateNotice, self);
            GGlobal.control.remove(UIConst.WU_JIANG, self.update, self);
            GGlobal.reddot.remove(UIConst.GOD_WUJIANG, self.updateNotice, self);
            GGlobal.control.remove(Enum_MsgType.WUJIANG_CHANGE_JOB, self.update, self);
            self.list.numItems = 0;
        };
        return _this;
    }
    ChildGodWuJiang.createInstance = function () {
        return (fairygui.UIPackage.createObject("wuJiang", "ChildGodWuJiang"));
    };
    ChildGodWuJiang.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHander;
        self.list.setVirtual();
    };
    ChildGodWuJiang.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    ChildGodWuJiang.prototype.renderHander = function (index, obj) {
        var gird = obj;
        gird.vo = this._listData[index];
    };
    ChildGodWuJiang.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    ChildGodWuJiang.URL = "ui://zyx92gzwnlyo4j";
    return ChildGodWuJiang;
}(fairygui.GComponent));
__reflect(ChildGodWuJiang.prototype, "ChildGodWuJiang", ["IPanel"]);
