package com.teamtop.system.peacockFloor;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 铜雀台 公共记录（榜主以及每层的极限通关者）
 * @author jjjjyyy
 *
 */
public class PeacockCache {
	/**榜主**/
	@FieldOrder(order = 1)
	private PeacockFloorer firster;
	/**每层极限通关者**/
	@FieldOrder(order = 2)
	private ConcurrentHashMap<Integer, PeacockFloorer> flooers;
	/**双倍层通过人数**/
	@FieldOrder(order = 3)
	private ConcurrentHashMap<Integer, Integer> passNum;
	
	public PeacockCache() {
		super();
	}

	

	public PeacockCache(PeacockFloorer firster, ConcurrentHashMap<Integer, PeacockFloorer> flooers,
			ConcurrentHashMap<Integer, Integer> passNum) {
		super();
		this.firster = firster;
		this.flooers = flooers;
		this.passNum = passNum;
	}



	public PeacockFloorer getFirster() {
		return firster;
	}

	public void setFirster(PeacockFloorer firster) {
		this.firster = firster;
	}

	public ConcurrentHashMap<Integer, PeacockFloorer> getFlooers() {
		return flooers;
	}

	public void setFlooers(ConcurrentHashMap<Integer, PeacockFloorer> flooers) {
		this.flooers = flooers;
	}

	public ConcurrentHashMap<Integer, Integer> getPassNum() {
		return passNum;
	}

	public void setPassNum(ConcurrentHashMap<Integer, Integer> passNum) {
		this.passNum = passNum;
	}
	
	
	
	

}
