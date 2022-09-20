
module fairygui {

    export class GMovieClip extends GObject {
        private _movieClip: MovieClip;

        public constructor() {
            super();
        }

        public get color(): number {
            return 0;
        }

        public set color(value: number) {
        }

        protected createDisplayObject(): void {
            this._movieClip = new MovieClip();
            this._movieClip["$owner"] = this;
            this._movieClip.touchEnabled = false;
            this.setDisplayObject(this._movieClip);
        }

        public get playing(): boolean {
            return this._movieClip.playing;
        }

        public set playing(value: boolean) {
            if (this._movieClip.playing != value) {
                this._movieClip.playing = value;
                this.updateGear(5);
            }
        }

        public get frame(): number {
            return this._movieClip.frame;
        }

        public set frame(value: number) {
            if (this._movieClip.frame != value) {
                this._movieClip.frame = value;
                this.updateGear(5);
            }
        }

        public get timeScale(): number {
            return this._movieClip.timeScale;
        }

        public set timeScale(value: number) {
            this._movieClip.timeScale = value;
        }

        public rewind(): void {
            this._movieClip.rewind();
        }

        public syncStatus(anotherMc: GMovieClip): void {
            this._movieClip.syncStatus(anotherMc._movieClip);
        }

        public advance(timeInMiniseconds: number): void {
            this._movieClip.advance(timeInMiniseconds);
        }

        //从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
        public setPlaySettings(start: number = 0, end: number = -1,
            times: number = 0, endAt: number = -1,
            endCallback: Function = null, callbackObj: any = null): void {
            this._movieClip.setPlaySettings(start, end, times, endAt, endCallback, callbackObj);
        }

        public constructFromResource(): void {
            this.sourceWidth = this.packageItem.width;
            this.sourceHeight = this.packageItem.height;
            this.initWidth = this.sourceWidth;
            this.initHeight = this.sourceHeight;

            this.setSize(this.sourceWidth, this.sourceHeight);

            this.packageItem.load();

            this._movieClip.interval = this.packageItem.interval;
            this._movieClip.swing = this.packageItem.swing;
            this._movieClip.repeatDelay = this.packageItem.repeatDelay;
            this._movieClip.frames = this.packageItem.frames;
            this._movieClip.smoothing = this.packageItem.smoothing;
        }

        public setup_beforeAdd(buffer: ByteBuffer, beginPos: number): void {
            super.setup_beforeAdd(buffer, beginPos);

            buffer.seek(beginPos, 5);

            if (buffer.readBool())
                this.color = buffer.readColor();
            buffer.readByte(); //flip
            this._movieClip.frame = buffer.readInt();
            this._movieClip.playing = buffer.readBool();
        }
    }
}