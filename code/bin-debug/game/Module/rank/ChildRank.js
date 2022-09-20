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
var ChildRank = (function (_super) {
    __extends(ChildRank, _super);
    function ChildRank() {
        return _super.call(this) || this;
    }
    ChildRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("rank", "ChildRank"));
    };
    ChildRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.addClickListener(self.onInfo, self);
    };
    ChildRank.prototype.setVo = function (v, index, vo) {
        var self = this;
        self._vo = v;
        self.labName.text = v ? "<font color='#f2be0a'>昵称：</font>" + v.name : "";
        self.labPower.text = Model_Rank.setPowerTxt(v);
        if (vo.TYPE == 1 && v) {
            self.labLevel.text = Model_Rank.setRankTxt(v) + "(" + v.lunhui + "世轮回)";
        }
        else {
            self.labLevel.text = Model_Rank.setRankTxt(v);
        }
        if (v) {
            var country = v.showCoun == 0 ? v.country : 0;
            self.viewHead.setdata(v.headId, -1, "", v.vip, false, v.frameId, country);
            self.imgNo.visible = false;
        }
        else {
            self.viewHead.setdata(null);
            self.imgNo.visible = true;
        }
        if (index > 3) {
            self.labRank.text = "第" + index + "名";
            self.imgRank.visible = false;
        }
        else {
            self.labRank.text = "";
            self.imgRank.visible = true;
            if (index == 1) {
                self.imgRank.url = "ui://y2wvab26nxcb8";
            }
            else if (index == 2) {
                self.imgRank.url = "ui://y2wvab26nxcb9";
            }
            else if (index == 3) {
                self.imgRank.url = "ui://y2wvab26nxcba";
            }
        }
    };
    ChildRank.prototype.onInfo = function () {
        var self = this;
        if (self._vo)
            GGlobal.layerMgr.open(UIConst.RANK_INFO, self._vo);
    };
    ChildRank.URL = "ui://y2wvab26mq9u1";
    return ChildRank;
}(fairygui.GComponent));
__reflect(ChildRank.prototype, "ChildRank");
