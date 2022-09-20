var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
* 合并事件处理
*/
var RenderManager = (function () {
    function RenderManager() {
        this._count = 0;
        this._count1 = 0;
        this._isStop = false;
        this.stepStartTime = 0;
        this._jump = false;
        this.n = 0;
        this.FPS = 0;
        this._timer = 0;
        this._dic = {};
        this._dic1 = {};
        this.start();
    }
    RenderManager.prototype.start = function () {
        this._isStop = false;
        Timer.instance.listen(this.enterFrameHandler, this, 100);
    };
    RenderManager.prototype.enterFrameHandler = function () {
        if (this._isStop == true)
            return;
        this.nextStep();
        this._count++;
        var timer = egret.getTimer();
        if (timer - this._timer < 1000)
            return;
        var count = this._count;
        this.FPS = Math.round((count * 1000) / (timer - this._timer)) * 2;
        this._count = 0;
        this._timer = timer;
    };
    RenderManager.prototype.nextStep = function () {
        var self = this;
        self.n++;
        self._jump = false;
        self.stepStartTime = egret.getTimer();
        for (var key in self._dic) {
            var hander = self._dic[key];
            hander.run();
            self.remove(key);
        }
        if (this._jump == true)
            return;
        for (var key1 in this._dic1) {
            var hander = self._dic1[key1];
            hander.run();
            self.remove(key1, 2);
        }
    };
    RenderManager.prototype.stop = function () {
        this._isStop = true;
        Timer.instance.remove(this.enterFrameHandler, this);
    };
    /**
     * render: 执行的事件
     * type：1 必定会执行的事件  2在某些情况下会阻止延迟执行的 比如掉帧严重
     * key： 该事件的唯一标志
     * autoRemove: 是否为自动移除，即执行一次之后移除
    */
    RenderManager.prototype.add = function (render, key, type) {
        if (key === void 0) { key = ""; }
        if (type === void 0) { type = 1; }
        if (type == 1) {
            if (!this._dic[key]) {
                this._count++;
            }
            this._dic[key] = render;
        }
        else {
            if (!this._dic1[key]) {
                this._count1++;
            }
            this._dic1[key] = render;
        }
    };
    RenderManager.prototype.remove = function (key, type) {
        if (key === void 0) { key = ""; }
        if (type === void 0) { type = 1; }
        var self = this;
        if (type == 1) {
            if (self._dic[key]) {
                self._count--;
                delete self._dic[key];
            }
        }
        else {
            if (self._dic1[key]) {
                self._count1--;
                delete self._dic1[key];
            }
        }
        if (true) {
            self.print();
        }
    };
    RenderManager.prototype.jump = function () {
        this._jump = true;
    };
    Object.defineProperty(RenderManager.prototype, "length", {
        get: function () {
            return this._count;
        },
        enumerable: true,
        configurable: true
    });
    RenderManager.prototype.print = function () {
        // console.log("渲染器1:" + this._count);
        // console.log("渲染器2:" + this._count1);
    };
    RenderManager.getInstance = function () {
        if (!this._instance)
            this._instance = new RenderManager();
        return this._instance;
    };
    RenderManager.frameTime = 17; //每帧需要的时间
    RenderManager.frameWeight = 1;
    RenderManager._count = 0;
    return RenderManager;
}());
__reflect(RenderManager.prototype, "RenderManager");
