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
var ItemNianShouGrid = (function (_super) {
    __extends(ItemNianShouGrid, _super);
    function ItemNianShouGrid() {
        var _this = _super.call(this) || this;
        _this._type = 0;
        return _this;
    }
    ItemNianShouGrid.createInstance = function () {
        return (fairygui.UIPackage.createObject("actComNianShou", "ItemNianShouGrid"));
    };
    ItemNianShouGrid.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.grid.addClickListener(s.onGrid, s);
    };
    ItemNianShouGrid.prototype.setVo = function (v) {
        var s = this;
        s._v = v;
        s._type = 1;
        var nsCfg = Config.nian_299[v.id];
        s.grid.isShowEff = true;
        s.grid.tipEnabled = true;
        s.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(nsCfg.reward))[0];
        s._max = nsCfg.time;
        s.setBarTxt();
        s.bar.visible = true;
        s.lb.visible = false;
        if (v.time > 0) {
            GGlobal.model_ActNianShou.listen(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
        }
        else {
            GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
        }
    };
    ItemNianShouGrid.prototype.upTime = function () {
        var s = this;
        s.setBarTxt();
    };
    Object.defineProperty(ItemNianShouGrid.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._v = v;
            s._type = 0;
            if (v) {
                var nsCfg = Config.nian_299[v.id];
                s.grid.isShowEff = true;
                s.grid.tipEnabled = false;
                s.grid.vo = ConfigHelp.makeItemListArr(JSON.parse(nsCfg.reward))[0];
                s._max = nsCfg.time;
                s.setBarTxt();
                s.bar.visible = true;
            }
            else {
                s.grid.isShowEff = false;
                s.grid.tipEnabled = false;
                s.grid.vo = null;
                s.bar.visible = false;
            }
            if (v && v.time > 0) {
                GGlobal.model_ActNianShou.listen(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
            }
            else {
                GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
            }
            s.lb.visible = v ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    ItemNianShouGrid.prototype.setBarTxt = function () {
        var s = this;
        s.bar.max = s._max;
        s.bar.value = s._v.time;
        if (s._v.time > 0) {
            s.grid.checkNotice = false;
            s.bar._titleObject.text = this.getMSBySecond4(s._v.time);
        }
        else {
            s.grid.checkNotice = s._type == 0 ? true : false;
            s.bar._titleObject.text = "00:00:00";
        }
    };
    /**例如：1天1时1分1秒 */
    ItemNianShouGrid.prototype.getMSBySecond4 = function (second, division) {
        if (division === void 0) { division = null; }
        var result = "";
        var day = Math.floor(second / (3600 * 24));
        if (day > 0) {
            result = day + "天";
        }
        var h = second % (3600 * 24);
        if (h == 0) {
            return result;
        }
        var hour = Math.floor(h / 3600);
        if (hour > 0) {
            if (hour >= 10) {
                result += hour + "时";
            }
            else {
                result += hour + "时"; //去掉0
            }
        }
        var min = Math.floor(h % 3600);
        if (min == 0)
            return result;
        var minu = Math.floor(min / 60);
        if (minu > 0) {
            if (minu >= 10) {
                result += minu + "分";
            }
            else {
                result += "0" + minu + "分";
            }
        }
        var sec = Math.floor(min % 60);
        if (day > 0)
            return result;
        var secon = sec;
        if (secon >= 10) {
            result += secon + "秒";
        }
        else {
            result += "0" + secon + "秒";
        }
        return result;
    };
    ItemNianShouGrid.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        s.grid.clean();
        GGlobal.model_ActNianShou.remove(Model_ActNianShou.uptime_ns_rew, s.upTime, s);
    };
    ItemNianShouGrid.prototype.onGrid = function () {
        var s = this;
        if (!s._v) {
            return;
        }
        if (s._type == 1) {
            return;
        }
        GGlobal.layerMgr.open(UIConst.ACTCOM_NIANSHOU_ALERT, s._v);
    };
    ItemNianShouGrid.URL = "ui://ht2966i4dsufc";
    return ItemNianShouGrid;
}(fairygui.GComponent));
__reflect(ItemNianShouGrid.prototype, "ItemNianShouGrid");
