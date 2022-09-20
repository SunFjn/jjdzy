class CameraProxy {
	public constructor() {
	}

	public focusx: number = 300;
	public focusy: number = 300;

	public currentx: number = -Number.MAX_VALUE;
	public currenty: number = -Number.MAX_VALUE;
	public hasChange: boolean;
	public update(delta: number): void {
	}

	/**
	 * 重置镜头转换为默认值
	 */
	public reset(): void {
	}

	/**
	 * 將鏡頭轉換至0
	 */
	public zero(): void {
	}
}