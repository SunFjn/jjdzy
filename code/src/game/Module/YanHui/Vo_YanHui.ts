class Vo_YanHui {
	public id = 0;
	/**宴会类型 */
	public type = 0;
	public state = 0;
	public head = 0;
	public framePic = 0;
	public roleName: string;
	public num = 0;
	public isPT = 0;
	/**宴会举办者ID */
	public holdId = 0;
	/**是否申请0.未申请 1.已申请 2.已同意申请 */
	public isApply = 0;

	public static create(): Vo_YanHui {
		let vo: Vo_YanHui = new Vo_YanHui();
		return vo;
	}
}