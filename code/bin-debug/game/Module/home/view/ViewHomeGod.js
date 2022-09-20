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
var ViewHomeGod = (function (_super) {
    __extends(ViewHomeGod, _super);
    function ViewHomeGod() {
        var _this = _super.call(this) || this;
        _this.isEnoungh = true;
        _this.UpHD = function () {
            if (!_this.isEnoungh) {
                ViewCommonWarn.text("材料不足");
                return;
            }
            GGlobal.homemodel.CG_House_upDecorateLv_11109(HomeModel.GOD_HOUSE);
        };
        _this.update = function () {
            var self = _this;
            var model = GGlobal.homemodel;
            var id = model.getBuildCfgIDByType(HomeModel.GOD_HOUSE);
            var level = 0;
            var lib = Config.fdzssj_019;
            var cfg = lib[id];
            var godLib = Config.fdjk_019[id];
            var godNextLib = Config.fdjk_019[id + 1];
            self._cfgid = self.nowCFGID = id;
            self.lbfull.text = self.lbNow.text = "最大收益时间：" + (godLib.cishu / 3600) + "小时收益";
            if (godNextLib) {
                self.lbNext.text = "最大收益时间：" + (godNextLib.cishu / 3600) + "小时收益";
            }
            self.lbxixi.text = "";
            var nameStr = HtmlUtil.makeRowText(cfg.zsmz + "");
            self.lbName.text = nameStr;
            self.lbLevel.text = HomeModel.getFurnitureLevel(id) + "级";
            self.n2.text = cfg.zhanli + "";
            self.lbFullAtt.text = self.lbNowAtt.text = ConfigHelp.makeAttrTextArr(cfg.shuxing);
            IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + cfg.moxing + ".png");
            var nextCFG = lib[id + 1];
            self.n13.visible = Boolean(nextCFG);
            self.isEnoungh = true;
            if (nextCFG) {
                var items = JSON.parse(cfg.xiaohao);
                self.lbNextAtt.text = ConfigHelp.makeAttrTextArr(nextCFG.shuxing);
                var itemCount = Model_Bag.getItemCount(items[0][1]);
                self.n13.setLb(itemCount, items[0][2]);
                self.n13.setItemId(items[0][1]);
                self.isEnoungh = itemCount >= items[0][2];
                self.lbItem.text = ConfigHelp.getItemColorName(items[0][1]);
                self.groupAtt.visible = true;
                self.groupFull.visible = false;
            }
            else {
                self.groupAtt.visible = false;
                self.groupFull.visible = true;
            }
            self.showCFG(0);
            self.btnLevelup.visible = model.isSelfHome;
            self.lbItem.visible = model.isSelfHome;
            self.n13.visible = model.isSelfHome;
        };
        _this.openLog = function () {
            GGlobal.layerMgr.open(UIConst.HOME_LOG_UI, 1);
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
                if (v != 0) {
                    var testid = self.nowCFGID + v;
                    for (var i = 0; i < 100; i++) {
                        if (Config.fdjk_019[testid] && Config.fdzssj_019[testid]) {
                            if (nowModel != Config.fdzssj_019[testid].moxing) {
                                self.nowCFGID = testid;
                                var godNextLib = Config.fdzssj_019[testid];
                                IconUtil.setImg(self.imgTree, Enum_Path.HOME_URL + godNextLib.moxing + ".png");
                                showDJ = godNextLib.mxdj;
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
        _this.childrenCreated();
        return _this;
    }
    ViewHomeGod.createInstance = function () {
        return (fairygui.UIPackage.createObject("home", "ViewHomeGod"));
    };
    ViewHomeGod.prototype.childrenCreated = function () {
        var self = this;
        self.contentPane = self.view = fairygui.UIPackage.createObject("home", "ViewHomeGod").asCom;
        CommonManager.parseChildren(self.view, self);
        _super.prototype.childrenCreated.call(this);
    };
    /**
     * 传入1是注册事件 0为移除
     */
    ViewHomeGod.prototype.eventFunction = function (type) {
        var self = this;
        self.btnLog.visible = Model_player.isMineID(GGlobal.homemodel.home_masterID);
        EventUtil.register(type, self.btnLevelup, EventUtil.TOUCH, self.UpHD, self);
        EventUtil.register(type, self.btnLog, EventUtil.TOUCH, self.openLog, self);
        EventUtil.register(type, self.btnLeft, EventUtil.TOUCH, self.leftHD, self);
        EventUtil.register(type, self.btnRight, EventUtil.TOUCH, self.rightHD, self);
    };
    ViewHomeGod.prototype.onShown = function () {
        var self = this;
        self.btnLevelup.enabled = true;
        self.update();
        var control = GGlobal.control;
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.listen(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        control.listen(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        GGlobal.modelPlayer.listen(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewHomeGod.prototype.onHide = function () {
        var self = this;
        GGlobal.layerMgr.close(UIConst.HOME_GOD_UI);
        var control = GGlobal.control;
        control.remove(HomeModel.HOME_UI_DATA_UPDATE, self.update, self);
        control.remove(UIConst.HOME_LEVELUP_UI, self.update, self);
        control.remove(Enum_MsgType.MSG_BAG_ITME_UPDATE, self.update, self);
        GGlobal.modelPlayer.remove(Model_player.YUANBAO_UPDATE, self.update, self);
    };
    ViewHomeGod.URL = "ui://y0plc878ye03b";
    return ViewHomeGod;
}(UIModalPanel));
__reflect(ViewHomeGod.prototype, "ViewHomeGod");
