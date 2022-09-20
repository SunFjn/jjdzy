class EasePortCameraProxy extends CameraProxy {
	public constructor() {
		super();
	}

	public left0: number = -16;
	public right0: number = 16;
	public top0: number = -16;
	public bottom0: number = 16;

	public left: number = -32;
	public right: number = 32;
	public top: number = -32;
	public bottom: number = 32;

	public easeArg: number = 0.0015;

	public reset(): void {
		this.left0 = -16;
		this.right0 = 16;
		this.top0 = -16;
		this.bottom0 = 16;

		this.left = -32;
		this.right = 32;
		this.top = -32;
		this.bottom = 32;
	}

	public zero(): void {
		this.left0 = 0;
		this.right0 = 0;
		this.top0 = 0;
		this.bottom0 = 0;
		this.left = 0;
		this.right = 0;
		this.top = 0;
		this.bottom = 0;
	}

	public update(delta: number): void {
		var arg: number = this.easeArg * 30;
		if (arg > 1) arg = 1;
		var dx: number = this.focusx - this.currentx;
		var dy: number = this.focusy - this.currenty;

		var testx: number = this.currentx + dx * 0;
		var testy: number = this.currenty + dy * 0;

		if (testx <= this.focusx + this.right0 && testx >= this.focusx + this.left0) {
			this.hasChange = false;
		} else if (testx > this.focusx + this.right) {
			this.currentx = this.focusx + this.right;
			this.hasChange = true;
		} else if (testx < this.focusx + this.left) {
			this.currentx = this.focusx + this.left;
			this.hasChange = true;
		} else {
			this.currentx = testx;
			this.hasChange = true;
		}

		if (testy <= this.focusy + this.bottom0 && testy >= this.focusy + this.top0) {
		} else if (testy > this.focusy + this.bottom) {
			this.currenty = this.focusy + this.bottom;
			this.hasChange = true;
		} else if (testy < this.focusy + this.top) {
			this.currenty = this.focusy + this.top;
			this.hasChange = true;
		} else {
			this.currenty = testy;
			this.hasChange = true;
		}
	}
}