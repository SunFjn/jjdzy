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
var ItemTeam = (function (_super) {
    __extends(ItemTeam, _super);
    function ItemTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemTeam.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.iconKick.displayObject.touchEnabled = true;
        self.iconKick.addClickListener(self.onHand, self);
        self.btnJoin.addClickListener(self.onHand, self);
    };
    ItemTeam.prototype.onHand = function (evt) {
        var target = evt.currentTarget;
        switch (target) {
            case this.iconKick:
                if (this.data.id == Model_player.voMine.id) {
                    GGlobal.modelSJMJ.CG3771();
                }
                else {
                    GGlobal.modelSJMJ.CG3767(this.data.id);
                }
                break;
            case this.btnJoin:
                GGlobal.modelSJMJ.CG3773(this.data.teamId, ItemTeam.curMiJing ? ItemTeam.curMiJing.data.id : 0);
                break;
        }
    };
    Object.defineProperty(ItemTeam.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var self = this;
            self._data = value;
            self.headInfo.setdata(value.head, 0, value.name, 0, false, value.headBg);
            if (ModelShengJieMJ.isSelfTeam) {
                self.c1.setSelectedIndex(1);
                var isLeader = value.isLeader == 1;
                self.iconLeader.visible = isLeader;
                self.iconKick.visible = GGlobal.modelSJMJ.isLeader();
                self.txtZhanLi.text = "\u6218\u529B: " + ConfigHelp.numToStr(value.zhanLi);
                self.headInfo.y = 34;
            }
            else {
                self.c1.setSelectedIndex(0);
                self.txtNum.text = "人数: " + HtmlUtil.fontNoSize(value.count + "/3", "#00ff00");
                self.headInfo.y = 8;
            }
        },
        enumerable: true,
        configurable: true
    });
    ItemTeam.URL = "ui://yqpfulefudgz43";
    return ItemTeam;
}(fairygui.GComponent));
__reflect(ItemTeam.prototype, "ItemTeam");
