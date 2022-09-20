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
var JinShengRewardItem = (function (_super) {
    __extends(JinShengRewardItem, _super);
    function JinShengRewardItem() {
        var _this = _super.call(this) || this;
        _this.gridArr = [];
        return _this;
    }
    JinShengRewardItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("rebirth", "JinShengRewardItem"));
    };
    JinShengRewardItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        for (var i = 0; i < 3; i++) {
            var grid = (a.getChild("grid" + i));
            a.gridArr.push(grid);
        }
        // a.drawBt = <Button1><any>(a.getChild("drawBt"));
        a.promptLb = (a.getChild("promptLb"));
        a.drawImg = (a.getChild("drawImg"));
        // a.drawBt.addClickListener(a.onDraw, this);
    };
    JinShengRewardItem.prototype.onDraw = function () {
        var a = this;
        GGlobal.modeljinsheng.CG_JINSHENG_DRAWREWARD(a.vo.id);
    };
    JinShengRewardItem.prototype.show = function (cfg, isShow) {
        var a = this;
        a.vo = cfg;
        var arr = JSON.parse(cfg.reward);
        if (isShow && cfg.time != "0")
            arr = arr.concat(JSON.parse(cfg.time));
        var reward = ConfigHelp.makeItemListArr(arr);
        var len = a.gridArr.length;
        for (var i = 0; i < len; i++) {
            var grid = a.gridArr[i];
            if (i < reward.length) {
                grid.visible = true;
                grid.setVo(reward[i], isShow && cfg.time != "0" && i == reward.length - 1);
            }
            else {
                grid.visible = false;
            }
        }
        a.drawImg.visible = false;
        // a.drawBt.visible = false;
        a.promptLb.visible = false;
        if (Model_JinSheng.drawArr.indexOf(cfg.id) != -1) {
            a.drawImg.visible = true;
        }
        else {
            // 	if (Model_JinSheng.level >= cfg.id) {
            // 		a.drawBt.visible = true;
            // 		a.drawBt.checkNotice = true;
            // 	} else {
            a.promptLb.visible = true;
            a.promptLb.text = cfg.tips;
            // 	}
        }
    };
    JinShengRewardItem.prototype.clean = function () {
        for (var i = 0; i < this.gridArr.length; i++) {
            this.gridArr[i].clean();
        }
    };
    JinShengRewardItem.URL = "ui://dllc71i9elpxi";
    return JinShengRewardItem;
}(fairygui.GComponent));
__reflect(JinShengRewardItem.prototype, "JinShengRewardItem");
