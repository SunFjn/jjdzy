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
var ItemSJMJTab = (function (_super) {
    __extends(ItemSJMJTab, _super);
    function ItemSJMJTab() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._lastTime = 0;
        _this._selected = false;
        return _this;
    }
    ItemSJMJTab.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        CommonManager.parseChildren(this, this);
    };
    ItemSJMJTab.prototype.setData = function (value) {
        this._data = value;
        var openLv = value.lv;
        this.txtName.text = value.name;
        this.noticeImg.visible = false;
        IconUtil.setImg(this.iconLD, "resource/image/sjmj/" + value.id + ".png");
        if (Model_LunHui.realLv < openLv) {
            IconUtil.setImg(this.iconSt, "resource/image/sjmj/tips" + value.id + ".png");
            this.iconSt.visible = true;
        }
        else {
            var tongGuanCfg = this.getTGInfo(value.id);
            if (!tongGuanCfg && GGlobal.modelSJMJ.isLvlFit((value.id * 1000 >> 0) + 1)) {
                this.iconSt.icon = "ui://yqpfulefvwaa4e";
                this.iconSt.visible = true;
            }
            else {
                if (GGlobal.modelSJMJ.isLvlFit(tongGuanCfg.id + 1)) {
                    this.iconSt.icon = "ui://yqpfulefvwaa4e";
                    this.iconSt.visible = true;
                }
                else {
                    var sdCnt = GGlobal.modelSJMJ.sdCntDic[value.id];
                    var canSD = sdCnt > 0; //可扫荡
                    if (canSD) {
                        this.iconSt.icon = "ui://yqpfulefvwaa4e";
                        this.iconSt.visible = true;
                    }
                    else {
                        this.iconSt.visible = false;
                    }
                }
                this.noticeImg.visible = GGlobal.modelSJMJ.checkTabRed(value.id);
            }
        }
    };
    ItemSJMJTab.prototype.getTGInfo = function (id) {
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == id) {
                return Config.sjmjfb_258[key];
            }
        }
        return null;
    };
    ItemSJMJTab.prototype.getData = function () {
        return this._data;
    };
    ItemSJMJTab.prototype.setSel = function (value) {
        this.selected = value;
        var now = egret.getTimer();
        if (value && now - this._lastTime >= 500) {
            this._lastTime = now;
            var cfg = this.getFBCfg();
            var view = GGlobal.layerMgr.getView(UIConst.SJMJ2);
            if (view) {
                view.mixHander(cfg.id);
            }
        }
    };
    Object.defineProperty(ItemSJMJTab.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.iconSel.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    ItemSJMJTab.prototype.getFBCfg = function () {
        var _data = this._data;
        var fubenInfo = GGlobal.modelSJMJ.fubenInfo;
        var idAsKey = _data.id;
        for (var key in fubenInfo) {
            var compareId = Number(key) / 1000 >> 0;
            if (compareId == idAsKey) {
                return Config.sjmjfb_258[key];
            }
        }
        return Config.sjmjfb_258[_data.id * 1000 + 1];
    };
    ItemSJMJTab.URL = "ui://yqpfulefsh6249";
    return ItemSJMJTab;
}(fairygui.GComponent));
__reflect(ItemSJMJTab.prototype, "ItemSJMJTab");
