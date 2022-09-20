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
var ItemXiaoFeiPH = (function (_super) {
    __extends(ItemXiaoFeiPH, _super);
    function ItemXiaoFeiPH() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resUrl = ["ui://kdt501v2tipmf", "ui://kdt501v2tipm9", "ui://kdt501v2tipma", "ui://kdt501v2tipmb", "ui://kdt501v2tipmc"];
        return _this;
    }
    ItemXiaoFeiPH.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.txtName.addEventListener(egret.TextEvent.LINK, self.onHand, self);
        self.displayObject.addEventListener(egret.Event.REMOVED_FROM_STAGE, self.onRemove, self);
        self.container.x = 25;
    };
    ItemXiaoFeiPH.prototype.onHand = function () {
        GGlobal.layerMgr.open(UIConst.XIAOFEIPHB);
    };
    ItemXiaoFeiPH.prototype.setData = function (value) {
        var self = this;
        self._data = value;
        self.iconXWYD.visible = false;
        if (self._index == 0) {
            self.c1.setSelectedIndex(0);
            self.container.y = 55;
            self.txtPer.y = 60;
            // self.container.x = 25;
            self.container.setGrids(value.show, 3, 90);
            // self.iconFirst.visible = true;
            // self.txtPaiMing.text = "";
            // self.txtName.text = "";
        }
        else {
            self.c1.setSelectedIndex(1);
            self.container.y = 42;
            self.txtPer.y = 47;
            // self.iconFirst.visible = false;
            if (self._index == 1) {
                var second = GGlobal.modelSGQD.paiHangDatas[1];
                // self.iconPM.source = self.resUrl[1];
                self.iconPM.icon = self.resUrl[1];
                if (second && second.name) {
                    self.txtName.text = HtmlUtil.fontNoSize(second.name, "#FF9900");
                }
                else {
                    // self.txtName.text = HtmlUtil.fontNoSize("无人上榜", "#00ff00");
                    self.iconXWYD.visible = true;
                    self.txtName.text = "";
                }
                self.txtName.y = 7;
            }
            else {
                var arr = JSON.parse(value.rank)[0];
                // self.txtPaiMing.text = `第${arr[0] - arr[1]}名`;
                // self.iconPM.source = self.resUrl[self._index];
                self.iconPM.icon = self.resUrl[self._index];
                self.txtName.text = HtmlUtil.fontNoSize(HtmlUtil.createLink("查看排行"), "#00ff00");
                self.txtName.y = 3;
            }
            // if (self._index < 3) {
            //     self.container.x = 25;
            // } else {
            //     self.container.x = 115;
            // }
            self.container.setGrids(value.show, 3, 90);
        }
        self.addChild(self.txtName); //点击事件被container挡住
        if (value.fh == 0) {
            this.txtPer.visible = false;
        }
        else {
            this.txtPer.visible = true;
            this.txtPer.text = value.fh + "%";
        }
    };
    ItemXiaoFeiPH.prototype.getData = function () {
        return this._data;
    };
    ItemXiaoFeiPH.prototype.setIndex = function (value) {
        this._index = value;
    };
    ItemXiaoFeiPH.prototype.onRemove = function () {
        this.container.setGrids(null);
    };
    ItemXiaoFeiPH.URL = "ui://kdt501v2tipmg";
    ItemXiaoFeiPH.CUT_LEN = 2;
    return ItemXiaoFeiPH;
}(fairygui.GComponent));
__reflect(ItemXiaoFeiPH.prototype, "ItemXiaoFeiPH");
