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
var ItemHomeTask = (function (_super) {
    __extends(ItemHomeTask, _super);
    function ItemHomeTask() {
        return _super.call(this) || this;
    }
    ItemHomeTask.createInstance = function () {
        return (fairygui.UIPackage.createObject("homeTask", "ItemHomeTask"));
    };
    ItemHomeTask.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.btnLQ.addClickListener(s.onGet, s);
        s.btn.addClickListener(s.onGo, s);
    };
    Object.defineProperty(ItemHomeTask.prototype, "vo", {
        set: function (v) {
            var s = this;
            s._vo = v;
            s.progress.max = 1;
            s.progress.value = v.state == 0 ? 0 : 1;
            //奖励
            // var award = JSON.parse(v.award);
            // for (var i = 0; i < award.length; i++) {
            // 	let na
            // 	let ct
            // 	if (award[i][0] == Enum_Attr.ITEM || award[i][0] == Enum_Attr.EQUIP) {
            // 		na = ConfigHelp.getItemColorName(award[i][1], false);
            // 		ct = award[i][2]
            // 	} else {
            // 		na = Vo_attr.getAttrName(award[i][0]);
            // 		ct = award[i][2];
            // 	}
            // 	s["lbNa" + i].text = na
            // 	s["lbCt" + i].text = "+" + ct
            // 	s["img" + i]
            // }
            var award = ConfigHelp.makeItemListArr(JSON.parse(v.award));
            for (var i = 0; i < award.length; i++) {
                s["lbNa" + i].text = award[i].name;
                s["lbCt" + i].text = "+" + award[i].count;
                IconUtil.setImg(s["img" + i], Enum_Path.ICON70_URL + award[i].icon + ".png");
            }
            s.lbTitle.text = v.name;
            var icon = ConfigHelp.makeItemListArr(JSON.parse(v.icon));
            ;
            s.grid.tipEnabled = s.grid.isShowEff = true;
            s.grid.vo = icon[0];
            s.imgYWC.visible = v.state == 2;
            s.btn.visible = v.state == 0;
            s.btnLQ.visible = v.state == 1;
        },
        enumerable: true,
        configurable: true
    });
    ItemHomeTask.prototype.onGet = function () {
        var s = this;
        if (!s._vo) {
            return;
        }
        GGlobal.model_HomeTask.CG_GET_TASK_REWARD_11409(s._vo.id);
    };
    ItemHomeTask.prototype.onGo = function () {
        var s = this;
        if (!s._vo) {
            return;
        }
        GGlobal.layerMgr.open(s._vo.nextto);
        GGlobal.layerMgr.close2(UIConst.HOME_TASK);
    };
    ItemHomeTask.prototype.clean = function () {
        _super.prototype.clean.call(this);
        var s = this;
        s.grid.clean();
        for (var i = 0; i < 2; i++) {
            IconUtil.setImg(s["img" + i], null);
        }
    };
    ItemHomeTask.URL = "ui://oy62ymetd8t63";
    return ItemHomeTask;
}(fairygui.GComponent));
__reflect(ItemHomeTask.prototype, "ItemHomeTask");
