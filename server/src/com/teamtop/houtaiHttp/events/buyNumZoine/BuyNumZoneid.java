package com.teamtop.houtaiHttp.events.buyNumZoine;

import com.teamtop.util.db.trans.FieldOrder;

public class BuyNumZoneid {
	
	/**	 * 平台号	 */
	@FieldOrder(order = 1)
	private String pf;
	/**	 * 区号	 */
	@FieldOrder(order = 2)
	private int zoneid;
	
	public BuyNumZoneid() {
		super();
	}
	
	public BuyNumZoneid(String pf, int zoneid) {
		super();
		this.pf = pf;
		this.zoneid = zoneid;
	}



	public String getPf() {
		return pf;
	}
	public void setPf(String pf) {
		this.pf = pf;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	
	

}
