module fairygui {
	export class TweenConfig {
        public duration: number = 0;
        public easeType: number;
        public repeat: number = 0;
        public yoyo: boolean = false;
        public startValue: TValue;
        public endValue: TValue;
        public endLabel: string;
        public endHook: Function;
        public endHookCaller: any;

        public constructor() {
            this.easeType = EaseType.QuadOut;
            this.startValue = new TValue();
            this.endValue = new TValue();
        }
    }
}