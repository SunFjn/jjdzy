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
var ActCom_SGBZGrid = (function (_super) {
    __extends(ActCom_SGBZGrid, _super);
    function ActCom_SGBZGrid() {
        var _this = _super.call(this) || this;
        _this.selIndex = 0;
        _this.selSate = 0;
        return _this;
    }
    ActCom_SGBZGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("ActComSGBZ", "ActCom_SGBZGrid"));
    };
    ActCom_SGBZGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ActCom_SGBZGrid.prototype.onSel = function () {
        var self = this;
        var model = GGlobal.modelsgbz;
        if (self.selSate == 0) {
            if (model.selectData[self.vo.id] && model.selectData[self.vo.id].length >= 5 - self.vo.dc) {
                ViewCommonWarn.text("必出奖励已达上限");
                return;
            }
            self.selSate = 1;
            self.selBt.visible = false;
            self.escBt.visible = true;
            if (!model.selectData[self.vo.id])
                model.selectData[self.vo.id] = [];
            model.selectData[self.vo.id].push(self.selIndex);
        }
        else {
            self.selSate = 0;
            self.selBt.visible = true;
            self.escBt.visible = false;
            for (var i = 0; i < model.selectData[self.vo.id].length; i++) {
                if (model.selectData[self.vo.id][i] == self.selIndex) {
                    model.selectData[self.vo.id].splice(i, 1);
                    break;
                }
            }
        }
        if (self.callHande) {
            self.callHande.run();
        }
    };
    ActCom_SGBZGrid.prototype.setVo = function (itemVo, index, vo, handler) {
        if (handler === void 0) { handler = null; }
        var self = this;
        var model = GGlobal.modelsgbz;
        self.callHande = handler;
        self.vo = vo;
        self.selIndex = index;
        self.grid.tipEnabled = true;
        self.grid.isShowEff = true;
        self.grid.vo = itemVo;
        self.nameLb.text = itemVo.name;
        self.nameLb.color = itemVo.qColor;
        if (model.selectData[vo.id] && model.selectData[vo.id].indexOf(index) != -1) {
            self.selSate = 1;
            self.selBt.visible = false;
            self.escBt.visible = true;
        }
        else {
            self.selSate = 0;
            self.selBt.visible = true;
            self.escBt.visible = false;
        }
        self.selBt.addClickListener(self.onSel, self);
        self.escBt.addClickListener(self.onSel, self);
    };
    ActCom_SGBZGrid.prototype.clean = function () {
        var self = this;
        self.grid.clean();
        self.callHande = null;
        self.selBt.removeClickListener(self.onSel, self);
        self.escBt.removeClickListener(self.onSel, self);
    };
    ActCom_SGBZGrid.URL = "ui://y9683xrpj158a";
    return ActCom_SGBZGrid;
}(fairygui.GComponent));
__reflect(ActCom_SGBZGrid.prototype, "ActCom_SGBZGrid");
