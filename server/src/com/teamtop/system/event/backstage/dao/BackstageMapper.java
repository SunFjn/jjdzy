package com.teamtop.system.event.backstage.dao;

import java.sql.SQLException;

public interface BackstageMapper {
	/**
	 * 批量插入
	 * @param colls
	 * @throws Exception
	 */
	public void insertBatch(String sql) throws Exception;
	/**
	 * 批量更新
	 * @param sql
	 * @throws SQLException
	 */
	public void insertOnDuplicateBatch(String sql) throws SQLException;
	
}
