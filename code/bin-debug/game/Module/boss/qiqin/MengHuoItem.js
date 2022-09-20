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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var MengHuoItem = (function (_super) {
    __extends(MengHuoItem, _super);
    function MengHuoItem() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.rank = 0;
        return _this;
    }
    MengHuoItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Boss", "MengHuoItem"));
    };
    MengHuoItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.lbLv = (this.getChild("lbLv"));
        this.btnCheck = (this.getChild("btnCheck"));
        this.btnCheck.addClickListener(this.onCheck, this);
    };
    MengHuoItem.prototype.onCheck = function () {
        var rk = 0;
        var vo = GGlobal.modelBoss.mhVO;
        if (this.type == 0) {
            var l = vo.personRankWard.length;
            rk = this.rank > l ? l : this.rank;
            var arr = vo.personRankWard[rk - 1];
        }
        else {
            var l = vo.personRankWard.length;
            rk = this.rank > l ? l : this.rank;
            var arr = vo.contryWard[rk - 1];
        }
        GGlobal.layerMgr.open(UIConst.LVBUBOX, { rank: this.rank, data: arr });
    };
    MengHuoItem.prototype.setdata = function (index, data, t) {
        this.type = t;
        this.rank = index;
        this.lbRank.text = "第" + index + "名";
        if (t == 1) {
            if (data[0] == 0)
                this.lbName.text = "虚位以待";
            else
                this.lbName.text = Model_Country.getCountryName(data[0]);
        }
        else {
            this.lbName.text = "" + data[0];
        }
        this.lbLv.text = "" + ConfigHelp.getYiWanText(data[1]);
    };
    MengHuoItem.URL = "ui://47jfyc6eee1117";
    return MengHuoItem;
}(fairygui.GComponent));
__reflect(MengHuoItem.prototype, "MengHuoItem");
