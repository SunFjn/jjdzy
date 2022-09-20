module fairygui {
	export class Bounce {
		public static easeIn(time: number, duration: number): number {
			return 1 - Bounce.easeOut(duration - time, duration);
		}

		public static easeOut(time: number, duration: number): number {
			if ((time /= duration) < (1 / 2.75)) {
				return (7.5625 * time * time);
			}
			if (time < (2 / 2.75)) {
				return (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75);
			}
			if (time < (2.5 / 2.75)) {
				return (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375);
			}
			return (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375);
		}

		public static easeInOut(time: number, duration: number): number {
			if (time < duration * 0.5) {
				return Bounce.easeIn(time * 2, duration) * 0.5;
			}
			return Bounce.easeOut(time * 2 - duration, duration) * 0.5 + 0.5;
		}
	}
}