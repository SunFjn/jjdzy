module fairygui {
	export  class TransitionItem {
        public time: number;
        public targetId: string;
        public type: number;
        public tweenConfig: TweenConfig;
        public label: string;
        public value: any;
        public hook: Function;
        public hookCaller: any;

        public tweener: GTweener;
        public target: GObject;
        public displayLockToken: number;

        public constructor(type: number) {
            this.type = type;

            switch (type) {
                case TransitionActionType.XY:
                case TransitionActionType.Size:
                case TransitionActionType.Scale:
                case TransitionActionType.Pivot:
                case TransitionActionType.Skew:
                case TransitionActionType.Alpha:
                case TransitionActionType.Rotation:
                case TransitionActionType.Color:
                case TransitionActionType.ColorFilter:
                    this.value = new TValue();
                    break;

                case TransitionActionType.Animation:
                    this.value = new TValue_Animation();
                    break;

                case TransitionActionType.Shake:
                    this.value = new TValue_Shake();
                    break;

                case TransitionActionType.Sound:
                    this.value = new TValue_Sound();
                    break;

                case TransitionActionType.Transition:
                    this.value = new TValue_Transition();
                    break;

                case TransitionActionType.Visible:
                    this.value = new TValue_Visible();
                    break;

                case TransitionActionType.Text:
                case TransitionActionType.Icon:
                    this.value = new TValue_Text();
                    break;
            }
        }
    }
}