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
var ItemTaskInfo = (function (_super) {
    __extends(ItemTaskInfo, _super);
    function ItemTaskInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grids = [];
        return _this;
    }
    ItemTaskInfo.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
        this.btnLingQu.addClickListener(this.onHand, this);
        this.btnQW.addClickListener(this.onHand, this);
    };
    ItemTaskInfo.prototype.onHand = function (evt) {
        var tar = evt.currentTarget;
        switch (tar) {
            case this.btnLingQu:
                GGlobal.modelEightLock.CG4523(this._data.id);
                break;
            case this.btnQW:
                evt.stopImmediatePropagation();
                if (ModuleManager.isOpen(this._data.open, true)) {
                    if (this._data.open == UIConst.QMBOSS || this._data.open == UIConst.MHBOSS) {
                        if (GGlobal.sceneType == SceneCtrl.GUANQIA && !GGlobal.modelGuanQia.inGuanQiaBoss()) {
                            GGlobal.layerMgr.open(this._data.open);
                            GGlobal.layerMgr.close2(UIConst.VIEWTASKINFO);
                        }
                        else {
                            ViewCommonWarn.text("副本中，不能打开这些界面!");
                        }
                    }
                    else {
                        GGlobal.layerMgr.open(this._data.open);
                        GGlobal.layerMgr.close2(UIConst.VIEWTASKINFO);
                    }
                }
                break;
        }
    };
    ItemTaskInfo.prototype.setData = function (value) {
        this._data = value;
        this.txtInfo1.text = value.name;
        if (this.grids.length) {
            ConfigHelp.cleanGridview(this.grids);
        }
        var rewards = ConfigHelp.makeItemListArr(JSON.parse(value.reward));
        this.grids = ConfigHelp.addGridview(rewards, this, 18, 46, true, false, 3, 70, 0.6);
        var state = GGlobal.modelEightLock.getTaskState(value.id);
        switch (state) {
            case 0: //前往完成任务
            case undefined:
            default:
                this.btnLingQu.visible = false;
                this.btnQW.visible = true;
                var progress = GGlobal.modelEightLock.getTaskProg(value.id);
                var cur = progress.cur;
                var max = progress.max;
                if (value.type == 13) {
                    if (Config.ggzj_008[progress.cur]) {
                        cur = Config.ggzj_008[progress.cur].guan;
                        max = Config.ggzj_008[progress.max].guan;
                    }
                    else {
                        cur = progress.cur;
                        max = Config.ggzj_008[progress.max].guan;
                    }
                }
                this.txtInfo2.text = ConfigHelp.numToStr(cur) + "/" + ConfigHelp.numToStr(max);
                this.iconGot.visible = false;
                break;
            case 1://可领取
                this.btnLingQu.visible = true;
                this.btnLingQu.checkNotice = true;
                this.btnQW.visible = false;
                this.txtInfo2.text = "";
                this.iconGot.visible = false;
                break;
            case 2:
                this.btnLingQu.visible = false;
                this.btnQW.visible = false;
                this.txtInfo2.text = "";
                this.iconGot.visible = true;
                break;
        }
    };
    ItemTaskInfo.prototype.getData = function () {
        return this._data;
    };
    ItemTaskInfo.prototype.clean = function () {
        if (this.grids.length) {
            ConfigHelp.cleanGridview(this.grids);
        }
    };
    ItemTaskInfo.URL = "ui://hincjqblvib68";
    return ItemTaskInfo;
}(fairygui.GComponent));
__reflect(ItemTaskInfo.prototype, "ItemTaskInfo");
