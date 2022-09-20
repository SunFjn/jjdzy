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
var Model_Setting = (function (_super) {
    __extends(Model_Setting, _super);
    function Model_Setting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否开启声音*/
        _this.enableSound = true;
        return _this;
    }
    /**1021 更换头像和头像框 I:头像headId I:头像框headFrame */
    Model_Setting.prototype.CGChangeIcon = function (headId, headFrame) {
        var bates = this.getBytes();
        bates.writeInt(headId);
        bates.writeInt(headFrame);
        this.sendSocket(1021, bates);
    };
    /**1023 修改名字 U:新名字 */
    Model_Setting.prototype.CGChangeName = function (name) {
        var bates = this.getBytes();
        bates.writeUTF(name);
        this.sendSocket(1023, bates);
    };
    /**1025 操作声音 B:0：开启，1：关闭 */
    Model_Setting.prototype.CGOperateSound = function (op, op1) {
        var bates = this.getBytes();
        bates.writeByte(op);
        bates.writeByte(op1);
        this.sendSocket(1025, bates);
    };
    /**1027 隐藏势力操作  B:0：显示，1：隐藏 */
    Model_Setting.prototype.CGOperateCountry = function (op) {
        var bates = this.getBytes();
        bates.writeByte(op);
        this.sendSocket(1027, bates);
    };
    //协议处理
    Model_Setting.prototype.listenServ = function (mgr) {
        this.socket = mgr;
        mgr.regHand(1020, this.GCLoginSend, this);
        mgr.regHand(1022, this.GCChangeIcon, this);
        mgr.regHand(1024, this.GCChangeName, this);
        mgr.regHand(1030, this.GCUseIconTool, this);
        mgr.regHand(1032, this.GCUpdateIconFrame, this);
    };
    /**登录发送数据 B:头像idB:头像框idB:是否显示势力（0：显示，1：不显示）B:是否开启声音（0：开启，1：不开启）[I:头像id]拥有的头像[I:头像框id]拥有的头像框*/
    Model_Setting.prototype.GCLoginSend = function (self, data) {
        Model_Setting.headId = data.readInt();
        Model_Setting.frameId = data.readInt();
        Model_Setting.showCamp = data.readByte();
        Model_Setting.showVoiceBGM = data.readByte();
        Model_Setting.showVoice = data.readByte();
        var len = data.readShort();
        Model_Setting.headIdArr = [];
        for (var i = 0; i < len; i++) {
            Model_Setting.headIdArr.push(data.readInt());
        }
        len = data.readShort();
        Model_Setting.frameIdArr = [];
        for (var i = 0; i < len; i++) {
            Model_Setting.frameIdArr.push(data.readInt());
        }
        self.setSound(Model_Setting.showVoiceBGM == 0, Model_Setting.showVoice == 0);
        GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_HEAD);
    };
    Model_Setting.prototype.setSound = function (bgm, eff) {
        SoundManager.getInstance().setBGM(bgm);
        SoundManager.getInstance().setEFF(eff);
    };
    //更换头像和头像框的结果 B:0：失败，1：成功B:头像idB:头像框id
    Model_Setting.prototype.GCChangeIcon = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            Model_Setting.headId = data.readInt();
            Model_Setting.frameId = data.readInt();
            ViewCommonWarn.text("更改成功");
            GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_HEAD);
        }
        else {
            ViewCommonWarn.text("更改失败");
        }
    };
    //B:0:成功，1：名字不能超过12个字符，2：非法字符，3：名字没有改变，4：名字已存在U:名字
    Model_Setting.prototype.GCChangeName = function (self, data) {
        var result = data.readByte();
        if (result == 0) {
            Model_player.voMine.name = data.readUTF();
            ViewCommonWarn.text("更改成功");
            GGlobal.control.notify(Enum_MsgType.SETTING_CHANGE_NAME);
        }
        else if (result == 1) {
            ViewCommonWarn.text("名字不能超过12个字符");
        }
        else if (result == 2) {
            ViewCommonWarn.text("非法字符");
        }
        else if (result == 3) {
            ViewCommonWarn.text("名字没有改变");
        }
        else if (result == 4) {
            ViewCommonWarn.text("名字已存在");
        }
        else {
            ViewCommonWarn.text("更改失败");
        }
    };
    //使用头像、头像框激活道具错误提示 B:1:系统未开启，2：已激活过
    Model_Setting.prototype.GCUseIconTool = function (self, data) {
        var result = data.readByte();
        if (result == 1) {
            ViewCommonWarn.text("系统未开启");
        }
        else if (result == 2) {
            ViewCommonWarn.text("已激活过");
        }
    };
    //更新头像、头像框 [I:头像id]拥有的头像[I:头像框id]拥有的头像框
    Model_Setting.prototype.GCUpdateIconFrame = function (self, data) {
        var len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_Setting.headIdArr.push(data.readInt());
        }
        len = data.readShort();
        for (var i = 0; i < len; i++) {
            Model_Setting.frameIdArr.push(data.readInt());
        }
    };
    Object.defineProperty(Model_Setting, "headList", {
        get: function () {
            if (Model_Setting._headList == null) {
                Model_Setting.initConfig();
            }
            return Model_Setting._headList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Model_Setting, "frameList", {
        get: function () {
            if (Model_Setting._frameList == null) {
                Model_Setting.initConfig();
            }
            return Model_Setting._frameList;
        },
        enumerable: true,
        configurable: true
    });
    Model_Setting.initConfig = function () {
        Model_Setting._headList = [];
        Model_Setting._frameList = [];
        for (var keys in Config.shezhi_707) {
            var shezhi = Config.shezhi_707[keys];
            if (shezhi.type == 1) {
                Model_Setting._headList.push(shezhi);
            }
            else {
                Model_Setting._frameList.push(shezhi);
            }
        }
    };
    Model_Setting.onCopy = function (str, alert) {
        if (!GGlobal.sdk) {
            var input = document.createElement("input");
            input.setAttributeNode(document.createAttribute("readonly"));
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length);
            document.execCommand('Copy');
            document.body.removeChild(input);
            if (alert) {
                ViewCommonWarn.text(alert);
            }
        }
        else {
            wx.setClipboardData({
                data: str,
                success: function (res) {
                    if (alert) {
                        ViewCommonWarn.text(alert);
                    }
                }
            });
        }
    };
    //头像id
    Model_Setting.headId = 0;
    //头像框i
    Model_Setting.frameId = 0;
    //否显示势力 0：显示，1：不显示
    Model_Setting.showCamp = 0;
    //是否开启声音（0：开启，1：不开启）
    Model_Setting.showVoice = 0;
    //是否开启声音（0：开启，1：不开启）
    Model_Setting.showVoiceBGM = 0;
    //改名卡id
    Model_Setting.CHANGE_NAME = 410024;
    return Model_Setting;
}(BaseModel));
__reflect(Model_Setting.prototype, "Model_Setting");
