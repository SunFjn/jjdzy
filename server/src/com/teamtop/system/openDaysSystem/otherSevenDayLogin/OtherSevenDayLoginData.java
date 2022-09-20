package com.teamtop.system.openDaysSystem.otherSevenDayLogin;



import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class OtherSevenDayLoginData {
	
	/**	 * 0未领取 1可领取 2已领取	 */
	@FieldOrder(order = 1)
	private int awardsGet;//
	
	/**	 * 已领取物品列表	 */
	@FieldOrder(order = 2)
	private List<Object[]> props;
	
	


	public List<Object[]> getProps() {
		return props;
	}
	public void setProps(List<Object[]> props) {
		this.props = props;
	}
	public int getAwardsGet() {
		return awardsGet;
	}
	public void setAwardsGet(int awardsGet) {
		this.awardsGet = awardsGet;
	}
	
	
}
