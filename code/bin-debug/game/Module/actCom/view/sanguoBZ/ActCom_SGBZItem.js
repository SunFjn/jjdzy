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
var ActCom_SGBZItem = (function (_super) {
    __extends(ActCom_SGBZItem, _super);
    function ActCom_SGBZItem() {
        return _super.call(this) || this;
    }
    ActCom_SGBZItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComSGBZ", "ActCom_SGBZItem"));
    };
    ActCom_SGBZItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.callbackThisObj = self;
        self.list.itemRenderer = self.renderHandler;
    };
    ActCom_SGBZItem.prototype.renderHandler = function (index, grid) {
        var self = this;
        grid.setVo(self.rewardArr[index], index, self.vo, Handler.create(self, self.updateChoose));
    };
    ActCom_SGBZItem.prototype.updateChoose = function () {
        var self = this;
        var model = GGlobal.modelsgbz;
        if (model.selectData[self.vo.id]) {
            self.chooseLb.text = "已选:" + model.selectData[self.vo.id].length + "个";
        }
        else {
            self.chooseLb.text = "已选:0个";
        }
    };
    ActCom_SGBZItem.prototype.setVo = function (cfg) {
        var self = this;
        var model = GGlobal.modelsgbz;
        self.vo = cfg;
        self.nameIcon.url = CommonManager.getUrl("ActComSGBZ", "name" + cfg.dc);
        self.promptLb.text = "限选" + (5 - cfg.dc) + "个";
        if (model.selectData[cfg.id]) {
            self.chooseLb.text = "已选:" + model.selectData[cfg.id].length + "个";
        }
        else {
            self.chooseLb.text = "已选:0个";
        }
        self.rewardArr = ConfigHelp.makeItemListArr(JSON.parse(cfg.bzjc));
        self.list.numItems = self.rewardArr.length;
    };
    ActCom_SGBZItem.prototype.clean = function () {
        var self = this;
        self.list.numItems = 0;
    };
    ActCom_SGBZItem.URL = "ui://y9683xrpj158b";
    return ActCom_SGBZItem;
}(fairygui.GComponent));
__reflect(ActCom_SGBZItem.prototype, "ActCom_SGBZItem");
