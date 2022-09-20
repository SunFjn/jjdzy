package com.teamtop.util.asyncHttp;

import com.teamtop.system.hero.Hero;

/**
 * 异步请求回调
 * @author Administrator
 *
 */
public abstract class AbsAsyncHttpCallback {
	/**
	 * 处理返回数据
	 * @param hero
	 * @param data
	 */
	public abstract void handleData(Hero hero,String rtnData,Object ext);
	/**
	 * 连接超时
	 * @param hero
	 */
	public abstract void timeout(Hero hero,Object ext);
}
