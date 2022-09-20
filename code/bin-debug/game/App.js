var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    App.init = function () {
        egret.lifecycle.addLifecycleListener(this.onLifeCycle);
        egret.lifecycle.onPause = this.onPause;
        egret.lifecycle.onResume = this.onResume;
    };
    App.onLifeCycle = function (context) {
    };
    App.onPause = function () {
        App.isLife = false;
        App.userSystemTicker();
        SoundManager.getInstance().addStopFlag("onpause");
        App.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, App.touchHD, App);
    };
    App.touchHD = function () {
        if (!App.isLife) {
            App.isLife = true;
            App.userSystemTicker();
            SoundManager.getInstance().removeStopFlag("onpause");
        }
        App.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, App.touchHD, App);
    };
    App.onResume = function () {
        console.log("onresume");
        App.isLife = true;
        App.userSystemTicker();
        SoundManager.getInstance().removeStopFlag("onpause");
        App.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, App.touchHD, App);
    };
    App.userSystemTicker = function () {
        if (!GGlobal.sdk) {
            if (App.isLife) {
                window.clearInterval(this._flag);
            }
            else {
                this._flag = window.setInterval(this.newUpdate, 1000 / 60);
            }
        }
    };
    App.newUpdate = function () {
        if (GGlobal && GGlobal.main) {
            GGlobal.main.frameLogic();
        }
    };
    App.stageWidth = 0;
    App.stageHeight = 0;
    App.isWeb = true; //是否web
    App.isLife = true;
    App.HEART_STATE = "HEART_STATE";
    App._flag = 0;
    return App;
}());
__reflect(App.prototype, "App");
