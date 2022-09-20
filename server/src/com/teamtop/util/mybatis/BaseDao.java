package com.teamtop.util.mybatis;

import java.util.Collection;
import java.util.List;


public abstract class BaseDao<T> {
	/**
	 * 插入到数据库
	 * @param obj 一个实例,会是一个model类的实例
	 */
	public abstract void insert(T t) throws Exception;
	
	/**
	 * 更新到数据库
	 * @param obj 实例
	 */
	public void update(T t) throws Exception{
		
	}
	
	/**
	 * 查找一条
	 * @param priKey 查询条件,主键
	 * @return 查找结果对应的一个model实例
	 */
	public T find(long id) throws Exception{
		return null;
	}
	/**
	 * 批量更新，适用于多条数据的系统
	 * @param coll
	 * @throws Exception
	 */
	public void updateBatch(Collection<T> coll) throws Exception{
		
	}
	/**
	 * 查找多条，适用于有多条数据的系统
	 * @param hid
	 * @return
	 * @throws Exception
	 */
	public List<T> findMany(long hid) throws Exception{
		return null;
	}
}
