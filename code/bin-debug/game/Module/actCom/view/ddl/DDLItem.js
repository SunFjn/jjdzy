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
var DDLItem = (function (_super) {
    __extends(DDLItem, _super);
    function DDLItem() {
        var _this = _super.call(this) || this;
        _this.str = "";
        return _this;
    }
    DDLItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    DDLItem.prototype.setData = function (cfg, xiaId, index) {
        var self = this;
        self.cfg = cfg;
        self.index = index;
        if (!cfg)
            return;
        if (xiaId == 1) {
            self.str = cfg.down1;
        }
        else if (xiaId == 2) {
            self.str = cfg.down2;
        }
        else if (xiaId == 3) {
            self.str = cfg.down3;
        }
        else if (xiaId == 4) {
            self.str = cfg.down4;
        }
        else if (xiaId == 5) {
            self.str = cfg.down5;
        }
        else if (xiaId == 6) {
            self.str = cfg.down6;
        }
        else if (xiaId == 7) {
            self.str = cfg.down7;
        }
        self.content.text = self.str;
    };
    DDLItem.prototype.setSelect = function (bol) {
        this.selectImg.visible = bol;
    };
    DDLItem.URL = "ui://ke8qv0ckehld6";
    return DDLItem;
}(fairygui.GComponent));
__reflect(DDLItem.prototype, "DDLItem");
