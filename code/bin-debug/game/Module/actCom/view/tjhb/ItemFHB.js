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
/**
 * 发红包item
 */
var ItemFHB = (function (_super) {
    __extends(ItemFHB, _super);
    function ItemFHB() {
        return _super.call(this) || this;
    }
    ItemFHB.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
    };
    ItemFHB.prototype.setVo = function (vo) {
        var self = this;
        self._vo = vo;
        if (!vo)
            return;
        var cfg = Config.tjhb_296[vo.id];
        var type = Math.floor(cfg.id / 10);
        var color = vo.param >= cfg.cs ? Color.GREENSTR : Color.REDSTR;
        if (type == 1) {
            self.labTitle.text = BroadCastManager.reTxt("充值{0}元<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
        }
        else if (type == 2) {
            self.labTitle.text = BroadCastManager.reTxt("消费{0}元宝<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
        }
        else if (type == 3) {
            self.labTitle.text = BroadCastManager.reTxt("寻宝{0}次<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
        }
        else if (type == 4) {
            self.labTitle.text = BroadCastManager.reTxt("神将阁{0}次<font color='{1}'>({2}/{3})</font>", cfg.cs, color, vo.param, cfg.cs);
        }
        var id = Number(ConfigHelp.SplitStr(cfg.hb)[0][0]);
        var v = VoItem.create(id);
        IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
        var num = Number(ConfigHelp.SplitStr(cfg.hb)[0][2]);
        self.labTotal.text = BroadCastManager.reTxt("<font color='{0}'>{1}</font>", color, num);
        self.residueLab.text = BroadCastManager.reTxt("可抢个数：<font color='{0}'>{1}</font>", color, cfg.sl);
        if (vo.sendStatus == 0) {
            self.c1.selectedIndex = 0;
            self.scendBtn.enabled = false;
            self.scendBtn.grayed = true;
            self.scendBtn.checkNotice = false;
        }
        else if (vo.sendStatus == 1) {
            self.c1.selectedIndex = 0;
            self.scendBtn.enabled = true;
            self.scendBtn.grayed = false;
            self.scendBtn.addClickListener(self.onScend, self);
            self.scendBtn.checkNotice = true;
        }
        else if (vo.sendStatus == 2) {
            self.c1.selectedIndex = 1;
        }
    };
    /**
     * 发红包
     */
    ItemFHB.prototype.onScend = function (e) {
        var self = this;
        if (!self._vo)
            return;
        GGlobal.model_TJHB.CG_SEND(self._vo.id);
    };
    ItemFHB.URL = "ui://fm0lrzctv4653";
    return ItemFHB;
}(fairygui.GComponent));
__reflect(ItemFHB.prototype, "ItemFHB");
