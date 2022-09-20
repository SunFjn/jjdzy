package com.teamtop.util.common;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * 需要更新的属性
 *
 */
public class UpdatePropertyValue {
	
	/**
	 * 需要更新的属性和值映射
	 */
	private Map<Object,Object> propertyValue = new HashMap<Object,Object>(4);
	
	/**
	 * 添加需要更新的属性和其更新值
	 * @param property  属性
	 * @param value     更新值
	 */
	public UpdatePropertyValue addProperty(Object property,Object value){
		propertyValue.put(property, value);
		return this;
	}

	/**
	 * 返回属性集合
	 * @return
	 */
	public Collection<Object> getProperties(){
		return propertyValue.keySet();
	}
	
	/**
	 * 返回对应属性需要更新的值集合
	 * @return
	 */
	public Object[] getValues(){
		return propertyValue.values().toArray();
	}
	
	public Map<Object,Object> getPropertyValue(){
		return propertyValue;
	}
	
	/**
	 * 清空所有属性值 
	 */
	public void clear(){
		propertyValue.clear();
	}
}
