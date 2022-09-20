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
var ViewFurnitureLevelUp = (function (_super) {
    __extends(ViewFurnitureLevelUp, _super);
    function ViewFurnitureLevelUp() {
        var _this = _super.call(this) || this;
        _this.update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var id = self.cfg_id;
            id = model.getBuildCfgIDByType(self.cfgType);
            var level = 0;
            var lib = Config.fdzssj_019;
            var cfg = lib[id];
            self._cfgid = self.nowCFGID = id;
            var nameStr = HtmlUtil.makeRowText(cfg.zsmz);
            self.lbName.text = nameStr;
            self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
            self.n1.text = cfg.zhanli + "";
            self.lbFull.text = self.lbNow.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);
            self.lbxixi.text = "";
            IconUtil.setImg(self.img, Enum_Path.HOME_URL + cfg.moxing + ".png");
            var nextCFG = lib[id + 1];
            self.lbCondition.visible = !Boolean(nextCFG);
            if (nextCFG) {
                var items = JSON.parse(cfg.xiaohao);
                self.lbNext.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
                self.n7.setLb(Model_Bag.getItemCount(items[0][1]), items[0][2]);
                self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
                self.n7.setItemId(items[0][1]);
                self.groupAtt.visible = true;
                self.groupFull.visible = false;
            }
            else {
                self.groupAtt.visible = false;
                self.groupFull.visible = true;
            }
            var homeLib = Config.fdsj_019[model.home_level];
            var max = homeLib.zhuangshi;
            if (max >= level) {
                self.lbCondition.text = "府邸" + (model.home_level + 1) + "级可继续升级";
            }
            self.showCFG(0);
            self.btnLevelup.visible = model.isSelfHome;
            self.lbItem.visible = model.isSelfHome;
            self.n7.visible = model.isSelfHome;
        };
        _this.leftHD = function () {
            _this.showCFG(-1);
        };
        _this.rightHD = function () {
            _this.showCFG(1);
        };
        _this._cfgid = 0;
        _this.nowCFGID = 0;
        _this.showCFG = function (v) {
            var self = _this;
            if (self.nowCFGID) {
                var lib = Config.fdzssj_019[self.nowCFGID];
                var nowModel = lib.moxing;
                var showDJ = lib.mxdj;
                var dj = Config.fdzssj_019[self._cfgid].mxdj;
                ;
                var lastType = lib.zslx;
                if (v != 0) {
                    var testid = self.nowCFGID + v;
                    for (var i = 0; i < 100; i++) {
                        if (Config.fdzssj_019[testid] && lastType == Config.fdzssj_019[testid].zslx) {
                            if (nowModel != Config.fdzssj_019[testid].moxing) {
                                self.nowCFGID = testid;
                                var godNextLib = Config.fdzssj_019[testid];
                                IconUtil.setImg(self.img, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
                                showDJ = godNextLib.mxdj;
                                self.lbName.text = HtmlUtil.makeRowText(godNextLib.zsmz);
                                if (dj < showDJ) {
                                    self.lbxixi.text = godNextLib.zsdj + "级后可使用";
                                }
                                else {
                                    self.lbxixi.text = "";
                                    self.btnLevelup.enabled = dj == showDJ;
                                }
                                break;
                            }
                            else {
                                testid = testid + v;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
                self.btnLeft.visible = showDJ != 1;
                self.btnRight.visible = HomeModel.getModelID(self.nowCFGID);
            }
        };
        _this.levelupHD = function () {
            GGlobal.homemodel.CG_House_upDecorateLv_11109(_this.cfgType);
        };
        //装饰表的ID
        _this.cfg_id = 0;
        //装饰分类表的类型
        _this.cfgType = 0;
        _this.childrenCreated();
        return _this;
    }
    ViewFurnitureLevelUp.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewFurnitureLevelUp"));
    };
    ViewFurnitureLevelUp.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewFurnitureLevelUp").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    ViewFurnitureLevelUp.prototype.eventFunction = function (type) {
        var self = this;
        var event = EventUtil.register;
        event(type, self.btnLevelup, EventUtil.TOUCH, self.levelupHD, self);
        event(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
        event(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
    };
    ViewFurnitureLevelUp.prototype.onShown = function () {
        var self = this;
        self.cfg_id = Number(self._args);
        self.cfgType = HomeModel.getBuildType(self.cfg_id);
        self.cfg_id = HomeModel.getFurnitureLevelByNpcId(self.cfg_id);
        self.btnLevelup.enabled = true;
        self.update();
        var control = GGlobal.control;
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewFurnitureLevelUp.prototype.onHide = function () {
        var self = this;
        IconUtil.setImg(self.img, null);
        self.n7.setItemId(0);
        GGlobal.layerMgr.close(UIConst.HOME_JIAJU_UI);
        var control = GGlobal.control;
        control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
        control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewFurnitureLevelUp.URL = "ui://y0plc878ye034";
    return ViewFurnitureLevelUp;
}(UIModalPanel));
__reflect(ViewFurnitureLevelUp.prototype, "ViewFurnitureLevelUp");
