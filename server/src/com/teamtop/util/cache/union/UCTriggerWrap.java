package com.teamtop.util.cache.union;

import java.lang.reflect.Method;
/**
 * 被统一触发的包装类
 * @author Administrator
 *
 */
public class UCTriggerWrap {
	private AbsUCTrigger<?> trigger;
	private Method method;
	private Method afterMethod;
	public UCTriggerWrap(AbsUCTrigger<?> trigger, Method method) {
		super();
		this.trigger = trigger;
		this.method = method;
	}
	public AbsUCTrigger<?> getTrigger() {
		return trigger;
	}
	public Method getMethod() {
		return method;
	}
	public Method getAfterMethod() {
		return afterMethod;
	}
	public void setAfterMethod(Method afterMethod) {
		this.afterMethod = afterMethod;
	}
	
}
