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
var JiaDingJinShengRoleItem = (function (_super) {
    __extends(JiaDingJinShengRoleItem, _super);
    function JiaDingJinShengRoleItem() {
        return _super.call(this) || this;
    }
    JiaDingJinShengRoleItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("JiaDing", "JiaDingJinShengRoleItem"));
    };
    JiaDingJinShengRoleItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.listRender;
    };
    JiaDingJinShengRoleItem.prototype.listRender = function (index, item) {
        var self = this;
        var cfg = Config.jdskill_021[self.skillListArr[index][0]];
        item.setVo(cfg);
    };
    JiaDingJinShengRoleItem.prototype.setVo = function (cfg) {
        var self = this;
        if (!self.uirole) {
            self.uirole = UIRole.create();
            self.uirole.uiparent = self.modelImg0.displayObject;
            self.uirole.setPos(self.modelImg0.width / 2, self.modelImg0.height);
        }
        var mx = 0;
        if (Config.sz_739[cfg.moxing]) {
            mx = Config.sz_739[cfg.moxing].moxing;
        }
        else {
            mx = Number(cfg.moxing);
        }
        self.uirole.setBody(mx);
        self.uirole.onAdd();
        self.skillListArr = JSON.parse(cfg.skill);
        self.list.numItems = self.skillListArr.length;
        self.text = cfg.mingzi;
        IconUtil.setImg(self.backImg, Enum_Path.BACK_URL + "jiading.png");
    };
    JiaDingJinShengRoleItem.prototype.clean = function () {
        var self = this;
        if (self.uirole) {
            self.uirole.onRemove();
            self.uirole = null;
        }
        IconUtil.setImg(self.backImg, null);
        self.list.numItems = 0;
    };
    JiaDingJinShengRoleItem.URL = "ui://ypo8uejwgz25c";
    return JiaDingJinShengRoleItem;
}(fairygui.GLabel));
__reflect(JiaDingJinShengRoleItem.prototype, "JiaDingJinShengRoleItem");
