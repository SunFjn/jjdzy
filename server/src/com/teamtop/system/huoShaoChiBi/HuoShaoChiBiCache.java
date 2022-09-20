package com.teamtop.system.huoShaoChiBi;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 火烧赤壁 公共记录（榜主以及每层的极限通关者）
 * 
 * @author jjjjyyy
 *
 */
public class HuoShaoChiBiCache {
	/**榜主**/
	@FieldOrder(order = 1)
	private HuoShaoChiBier firster;
	/**每层极限通关者**/
	@FieldOrder(order = 2)
	private ConcurrentHashMap<Integer, HuoShaoChiBier> flooers;
	
	public HuoShaoChiBiCache() {
		super();
	}

	

	public HuoShaoChiBiCache(HuoShaoChiBier firster, ConcurrentHashMap<Integer, HuoShaoChiBier> flooers,
			ConcurrentHashMap<Integer, Integer> passNum) {
		super();
		this.firster = firster;
		this.flooers = flooers;
	}



	public HuoShaoChiBier getFirster() {
		return firster;
	}

	public void setFirster(HuoShaoChiBier firster) {
		this.firster = firster;
	}

	public ConcurrentHashMap<Integer, HuoShaoChiBier> getFlooers() {
		return flooers;
	}

	public void setFlooers(ConcurrentHashMap<Integer, HuoShaoChiBier> flooers) {
		this.flooers = flooers;
	}


	
	
	
	

}
