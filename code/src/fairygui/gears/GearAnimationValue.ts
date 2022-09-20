module fairygui {
	export   class GearAnimationValue {
        public playing: boolean;
        public frame: number;

        public constructor(playing: boolean = true, frame: number = 0) {
            this.playing = playing;
            this.frame = frame;
        }
    }
}