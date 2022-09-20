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
var DDFH_RankItem = (function (_super) {
    __extends(DDFH_RankItem, _super);
    function DDFH_RankItem() {
        var _this = _super.call(this) || this;
        _this.rank = 0;
        _this.isCross = false;
        return _this;
    }
    DDFH_RankItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("Arena", "DDFH_RankItem"));
    };
    DDFH_RankItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.boxImg.addClickListener(a.boxHandler, a);
    };
    DDFH_RankItem.prototype.boxHandler = function () {
        var a = this;
        var arr = Model_DDFH.rankArr;
        var len;
        var cfg;
        if (a.isCross) {
            len = arr[1].length;
            for (var i = 0; i < len; i++) {
                cfg = arr[1][i];
                var arr1 = JSON.parse(cfg.rank);
                if (a.rank >= arr1[0][0] && a.rank <= arr1[0][1]) {
                    var arr2 = JSON.parse(cfg.reward);
                    GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_REWARDSHOW, { reward: arr2, num: a.rank, panelId: UIConst.DANDAO_FUHUI_RANK, isCross: a.isCross });
                    break;
                }
            }
        }
        else {
            len = arr[0].length;
            for (var i = 0; i < len; i++) {
                cfg = arr[0][i];
                var arr1 = JSON.parse(cfg.rank);
                if (a.rank >= arr1[0][0] && a.rank <= arr1[0][1]) {
                    var arr2 = JSON.parse(cfg.reward);
                    GGlobal.layerMgr.open(UIConst.DANDAO_FUHUI_REWARDSHOW, { reward: arr2, num: a.rank, panelId: UIConst.DANDAO_FUHUI_RANK, isCross: a.isCross });
                    break;
                }
            }
        }
    };
    //I:排名B:段位L:玩家idU:玩家名字I:积分
    DDFH_RankItem.prototype.show = function (arr, isCross) {
        if (isCross === void 0) { isCross = false; }
        var a = this;
        a.isCross = isCross;
        a.rank = arr[0];
        if (arr[0] > 3) {
            a.lbRank.text = arr[0] + "";
            a.rankIcon.visible = false;
        }
        else {
            a.rankIcon.url = CommonManager.getCommonUrl("rank_" + arr[0]);
            a.rankIcon.visible = true;
            a.lbRank.text = "";
        }
        a.nameLb.text = arr[3];
        a.jifenLb.text = arr[4] + "";
        a.levelImg.url = CommonManager.getUrl("Arena", "grade_" + (arr[1] - 1));
    };
    DDFH_RankItem.URL = "ui://me1skowlr4oge";
    return DDFH_RankItem;
}(fairygui.GComponent));
__reflect(DDFH_RankItem.prototype, "DDFH_RankItem");
