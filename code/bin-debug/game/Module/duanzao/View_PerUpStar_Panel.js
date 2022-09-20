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
var View_PerUpStar_Panel = (function (_super) {
    __extends(View_PerUpStar_Panel, _super);
    function View_PerUpStar_Panel() {
        var _this = _super.call(this) || this;
        _this.childrenCreated();
        return _this;
    }
    View_PerUpStar_Panel.prototype.childrenCreated = function () {
        var a = this;
        a.view = fairygui.UIPackage.createObject("DuanZao", "View_PerUpStar_Panel").asCom;
        a.contentPane = a.view;
        a.upStar = (a.view.getChild("upStar"));
        a.countLb = (a.view.getChild("countLb"));
        _super.prototype.childrenCreated.call(this);
        a.upStar.addClickListener(a.upHandle, this);
    };
    View_PerUpStar_Panel.prototype.upHandle = function () {
        if (this.upStar.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_UPSTAR_PERFECT(this.vo.type);
        }
        else {
            var cfg = Config.dzstar_209[this.vo.starLv];
            if (cfg.consume1 != "0") {
                View_CaiLiao_GetPanel.show(this._costItem);
            }
            else {
                ViewCommonWarn.text("已满星");
            }
        }
    };
    View_PerUpStar_Panel.prototype.updateShow = function () {
        var a = this;
        a.vo = a._args;
        var cfg = Config.dzstar_209[a.vo.starLv];
        if (cfg.consume1 == "0") {
            a.countLb.setCount("已满星");
            a.countLb.setImgUrl();
            a.upStar.checkNotice = false;
            a.upStar.enabled = false;
        }
        else {
            var costArr = JSON.parse(cfg.consume1);
            this._costItem = VoItem.create(costArr[0][1]);
            var count = Model_Bag.getItemCount(costArr[0][1]);
            a.countLb.setLb(count, costArr[0][2]);
            a.countLb.setImgUrl(this._costItem.icon);
            a.upStar.checkNotice = count >= costArr[0][2];
            a.upStar.enabled = true;
        }
    };
    View_PerUpStar_Panel.prototype.onShown = function () {
        var a = this;
        a.updateShow();
        GGlobal.reddot.listen(ReddotEvent.CHECK_DAUNZAO, a.updateShow, a);
    };
    View_PerUpStar_Panel.prototype.onHide = function () {
        var a = this;
        GGlobal.layerMgr.close(UIConst.DUANZAO_STAR_PERFECT);
        GGlobal.reddot.remove(ReddotEvent.CHECK_DAUNZAO, a.updateShow, a);
    };
    View_PerUpStar_Panel.URL = "ui://pofv8989tlm32e";
    return View_PerUpStar_Panel;
}(UIModalPanel));
__reflect(View_PerUpStar_Panel.prototype, "View_PerUpStar_Panel");
