class IScene extends fairygui.GComponent {
	public sceneId:number
	public constructor() {
		super();
	}

	public show(): void {
	}

	public reSize(): void {
	}

	sortChild(){}

	public disposeScene(): void {
		while (this.numChildren) {
			var child: fairygui.GObject = this.getChildAt(0);

			if (child instanceof fairygui.GImage)
				(child as fairygui.GImage).texture.dispose();
			this.removeChild(child);
		}
	}
	public reSizeNow(): void {
		this.reSize();
	}
}