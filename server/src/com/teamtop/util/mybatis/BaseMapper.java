package com.teamtop.util.mybatis;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface BaseMapper<T> {
	/**
	 * 插入到数据库
	 * @param obj 一个实例,会是一个model类的实例
	 * @return 插入结果,插入到mysql会返回主键ID
	 */
	public long insert(T t) throws SQLException;
	
	/**
	 * 更新到数据库
	 * @param obj 实例
	 */
	public void update(String sql) throws SQLException;
	
	/**
	 * 从数据库查找
	 * @param priKey 查询条件,主键
	 * @return 查找结果对应的一个model实例
	 */
	public Map<String,Object> find(String sql) throws SQLException;
	/**
	 * 查找多条
	 * @param hid
	 * @return
	 * @throws SQLException
	 */
	public List<Object> findMany(long hid) throws SQLException;
	/**
	 * 删除一条记录
	 * @param sql
	 * @throws SQLException
	 */
	public void delOne(String sql) throws SQLException;
	/**
	 * 批量更新
	 * @param sql
	 * @throws SQLException
	 */
	public void insertOnDuplicateBatch(String sql) throws SQLException;
	
	/**
	 * 根据多条hid查找多条
	 * @param hid
	 * @return
	 * @throws SQLException
	 */
	public List<Object> findManyByMany(List<Long> hids) throws SQLException;
	/**
	 * 查询整个表
	 */
	public List<Object> findAllHeroUnit() throws SQLException;
	
	
	
}
