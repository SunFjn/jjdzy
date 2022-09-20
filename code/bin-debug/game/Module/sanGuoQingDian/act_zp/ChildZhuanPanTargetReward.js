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
var ChildZhuanPanTargetReward = (function (_super) {
    __extends(ChildZhuanPanTargetReward, _super);
    function ChildZhuanPanTargetReward() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        return _this;
    }
    ChildZhuanPanTargetReward.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "ChildZhuanPanTargetReward"));
    };
    ChildZhuanPanTargetReward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        s.label = (s.getChild("label"));
        for (var i = 0; i < 3; i++) {
            var grid = (s.getChild("grid" + i));
            s.gridArr.push(grid);
        }
        s.drawImg = (s.getChild("drawImg"));
        s.drawBt = (s.getChild("drawBt"));
        s.drawBt.addClickListener(s.drawHandler, s);
    };
    ChildZhuanPanTargetReward.prototype.drawHandler = function () {
        if (this.vo.state == 1) {
            GGlobal.modelSGQD.CGDrawReward4129(this.vo.cfg.id);
        }
        else {
            ViewCommonWarn.text("未达到领取条件");
        }
    };
    ChildZhuanPanTargetReward.prototype.updateShow = function (vo) {
        var s = this;
        if (vo.state == 0 && ModelSGQD.zpCtMy >= vo.cfg.time) {
            vo.state = 1;
        }
        s.vo = vo;
        s.label.text = "转盘" + vo.cfg.time + "次";
        var rewardArr = ConfigHelp.makeItemListArr(JSON.parse(vo.cfg.reward));
        for (var i = 0; i < s.gridArr.length; i++) {
            if (i < rewardArr.length) {
                s.gridArr[i].visible = true;
                s.gridArr[i].vo = rewardArr[i];
                s.gridArr[i].isShowEff = true;
                s.gridArr[i].tipEnabled = true;
            }
            else {
                s.gridArr[i].visible = false;
            }
        }
        s.drawBt.visible = true;
        s.drawImg.visible = false;
        s.drawBt.checkNotice = vo.state == 1;
        switch (vo.state) {
            case 0:
                s.drawBt.visible = false;
                break;
            case 1:
                s.drawBt.text = "可领取";
                break;
            case 2:
                s.drawBt.visible = false;
                s.drawImg.visible = true;
                break;
        }
    };
    ChildZhuanPanTargetReward.prototype.clean = function () {
        var s = this;
        for (var i = 0; i < s.gridArr.length; i++) {
            s.gridArr[i].clean();
        }
    };
    ChildZhuanPanTargetReward.URL = "ui://kdt501v2dg2219";
    return ChildZhuanPanTargetReward;
}(fairygui.GComponent));
__reflect(ChildZhuanPanTargetReward.prototype, "ChildZhuanPanTargetReward");
