package com.teamtop.hefu;

import java.util.List;

/**
 * 合服事件接口
 * @author Administrator
 *
 */
public interface IHefuEvent {
	public void beforeDelHeros(List<DelHero> delList,int zoneid) throws Exception;
	public void beforeHefu(int zoneid) throws Exception;
	public void afterHefu(int firstZoneid) throws Exception;
	/**
	 * 合大跨服组
	 * @throws Exception
	 */
	public void heCrossZu(int zoneid)throws Exception;
	
}
