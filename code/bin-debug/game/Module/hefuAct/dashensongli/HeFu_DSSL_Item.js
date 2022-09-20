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
var HeFu_DSSL_Item = (function (_super) {
    __extends(HeFu_DSSL_Item, _super);
    function HeFu_DSSL_Item() {
        return _super.call(this) || this;
    }
    HeFu_DSSL_Item.createInstance = function () {
        return (fairygui.UIPackage.createObject("hefuActCZFL", "HeFu_CZFL_Item"));
    };
    HeFu_DSSL_Item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        this.list.itemRenderer = this.renderHandle;
        this.list.callbackThisObj = this;
    };
    HeFu_DSSL_Item.prototype.setType = function (obj) {
        var self = this;
        var cfg;
        var m = GGlobal.model_actCom;
        var type = Math.floor(obj.id / 10);
        if (type == 1) {
            var key = obj.id * 10 + 1;
            cfg = Config.hfkhgod_286[key];
            var colorStr = obj.num >= cfg.cs2 ? Color.GREENSTR : Color.REDSTR;
            self.lab.text = "本服<font color='" + colorStr + "'>(" + obj.num + "/" + cfg.cs2 + ")</font>名玩家达到VIP" + cfg.cs1 + "可解锁";
            self.numGroup.visible = false;
            this._listData = self.getIhfkhgod_286(obj.id);
            this.list.numItems = this._listData ? this._listData.length : 0;
        }
        else {
            var key = obj.id * 10 + 1;
            cfg = Config.hfkhgod_286[key];
            self.lab.text = "本服每有1名玩家达到VIP" + cfg.cs1 + "可领取";
            self.numGroup.visible = true;
            self.vipNum.text = "当前VIP" + cfg.cs1 + "人数：" + obj.num;
            this._listData = self.getIhfkhgod_286(obj.id);
            this.list.numItems = this._listData ? this._listData.length : 0;
        }
    };
    HeFu_DSSL_Item.prototype.renderHandle = function (index, obj) {
        var item = obj;
        item.setVo(this._listData[index]);
    };
    /**
     * 根据类型获取表数组
     */
    HeFu_DSSL_Item.prototype.getIhfkhgod_286 = function (type) {
        var arr = [];
        for (var key in Config.hfkhgod_286) {
            var cfg = Config.hfkhgod_286[key];
            if (Math.floor(cfg.id / 10) == type) {
                arr.push(cfg);
            }
        }
        return arr;
    };
    HeFu_DSSL_Item.URL = "ui://07jsdu7hhilo7";
    return HeFu_DSSL_Item;
}(fairygui.GComponent));
__reflect(HeFu_DSSL_Item.prototype, "HeFu_DSSL_Item");
