/*
* 合并事件处理
*/
class RenderManager {
    //不会中断的事件，通常需要执行完成
    private _dic: any;
    //可以被中断的逻辑
    //比如一些轮询会被新的代替
    private _dic1: any;
    private _count: number = 0;
    private _count1: number = 0;
    private _isStop: Boolean = false;
    public stepStartTime: number = 0;
    private _jump: Boolean = false;
    private n: number = 0;
    public static frameTime: number = 17;//每帧需要的时间
    public static frameWeight: number = 1;
    public FPS: number = 0;
    constructor() {
        this._dic = {};
        this._dic1 = {};
        this.start();
    }

    public start(): void {
        this._isStop = false;
        Timer.instance.listen(this.enterFrameHandler, this, 100);
    }

    private _timer: number = 0;
    private static _count: number = 0;
    private enterFrameHandler(): void {
        if (this._isStop == true) return;
        this.nextStep()
        this._count++;

        var timer: number = egret.getTimer();
        if (timer - this._timer < 1000) return;
        var count: number = this._count;

        this.FPS = Math.round((count * 1000) / (timer - this._timer)) * 2;
        this._count = 0;
        this._timer = timer;
    }

    public nextStep(): void {
        let self = this;
        self.n++;
        self._jump = false;
        self.stepStartTime = egret.getTimer();
        for (let key in self._dic) {
            let hander = self._dic[key];
            hander.run();
            self.remove(key);
        }
        if (this._jump == true) return;
        for (let key1 in this._dic1) {
            let hander = self._dic1[key1];
            hander.run();
            self.remove(key1, 2, );
        }
    }

    public stop(): void {
        this._isStop = true;
        Timer.instance.remove(this.enterFrameHandler, this)
    }

    /**
     * render: 执行的事件
     * type：1 必定会执行的事件  2在某些情况下会阻止延迟执行的 比如掉帧严重
     * key： 该事件的唯一标志
     * autoRemove: 是否为自动移除，即执行一次之后移除
    */
    public add(render: Handler, key: string = "", type: number = 1): void {
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
    }

    public remove(key: string = "", type: number = 1): void {
        let self = this;
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
        if(DEBUG){
            self.print();
        }
    }

    public jump(): void {
        this._jump = true;
    }
    public get length(): number {
        return this._count;
    }
    public print(): void {
        // console.log("渲染器1:" + this._count);
        // console.log("渲染器2:" + this._count1);
    }

    private static _instance: RenderManager;
    public static getInstance(): RenderManager {
        if (!this._instance)
            this._instance = new RenderManager();
        return this._instance;
    }

}