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
var VCrossKingRank = (function (_super) {
    __extends(VCrossKingRank, _super);
    function VCrossKingRank() {
        return _super.call(this) || this;
    }
    VCrossKingRank.createInstance = function () {
        return (fairygui.UIPackage.createObject("crossKing", "VCrossKingRank"));
    };
    VCrossKingRank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.lbRank = (this.getChild("lbRank"));
        this.lbName = (this.getChild("lbName"));
        this.imgRank = (this.getChild("imgRank"));
    };
    Object.defineProperty(VCrossKingRank.prototype, "vo", {
        set: function (v) {
            this.lbName.text = v.name;
            if (v.rank > 3) {
                this.lbRank.text = "" + v.rank;
                this.imgRank.visible = false;
            }
            else {
                this.lbRank.text = "";
                this.imgRank.visible = true;
                // if(v.rank == 1){
                // 	this.imgRank.url = "ui://yqpfulefqxiv1c"
                // }else if(v.rank == 2){
                // 	this.imgRank.url = "ui://yqpfulefqxiv1d"
                // }else{
                // 	this.imgRank.url = "ui://yqpfulefqxiv1e"
                // }
                this.imgRank.url = CommonManager.getCommonUrl("rank_" + v.rank);
            }
        },
        enumerable: true,
        configurable: true
    });
    VCrossKingRank.URL = "ui://me1skowlhfct41";
    return VCrossKingRank;
}(fairygui.GComponent));
__reflect(VCrossKingRank.prototype, "VCrossKingRank");
