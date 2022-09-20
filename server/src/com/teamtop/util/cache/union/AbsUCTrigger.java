package com.teamtop.util.cache.union;
/**
 * 缓存触发器，包括入库出库，删除缓存
 * @author Administrator
 *
 * @param <T>
 */
public abstract class AbsUCTrigger<T> {
	protected T map;//缓存 如HeroMap为Map<Long,Hero>
	/**
	 * 加载全部，默认由serverstart时机触发
	 */
	public void loadAll() throws Exception{
		
	}
	/**
	 * 加载一个，默认由登陆触发
	 * @param key id
	 * @return
	 */
	public Object loadOne(Object key){
		return null;
	}
	/**
	 * 同步一个
	 * @param key id
	 */
	public void syncOne(Object key){
		
	}
	/**
	 * 同步全部
	 */
	public void syncAll(){
		
	}
	/**
	 * 移除一个，通常为从缓存中移除一个
	 * @param key
	 */
	public void killOne(Object key){
		
	}
	/**
	 * 移除全部
	 */
	public void killAll(){
		
	}
	public AbsUCTrigger(T t) {
		super();
		this.map = t;
	}
	@SuppressWarnings("unchecked")
	public void setT(Object t){
		this.map = (T) t;
	}
	public AbsUCTrigger() {
	}
}
