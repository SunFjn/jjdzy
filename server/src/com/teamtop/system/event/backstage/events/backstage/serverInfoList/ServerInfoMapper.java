package com.teamtop.system.event.backstage.events.backstage.serverInfoList;

import java.util.List;
import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface ServerInfoMapper extends BaseMapper<M_ServerInfo> {

	/**
	 * 插入新服务数据
	 * 
	 * @param info
	 * @return
	 * @throws Exception
	 */
	public long insertData(M_ServerInfo info) throws Exception;

	/**
	 * 更新服务器信息
	 * 
	 * @throws Exception
	 */
	public void updateData(M_ServerInfo info) throws Exception;

	/**
	 * 获取所有服务器信息
	 * @return
	 * @throws Exception
	 */
	public List<M_ServerInfo> findAll() throws Exception;

	/**
	 * 获取部分服务器信息
	 */
	public List<M_ServerInfo> findByZID( List<Integer> zidList) throws Exception;

	/**
	 * 获取删除所有数据表语句
	 * 
	 * @param sql
	 * @throws Exception
	 */
	public List<String> selectAllDrop(String sql) throws Exception;

	/**
	 * 删除所有数据表
	 * 
	 * @param sql
	 * @throws Exception
	 */
	public void deleteAllTables(String sql) throws Exception;

	/**
	 * 更新客户端版本号
	 * 
	 * @param clientVersion
	 * @throws Exception
	 */
	public void updateClientVersionAll(Map<String, Object> map) throws Exception;

	/**
	 * 更新客户端版本号
	 * 
	 * @param clientVersion
	 * @throws Exception
	 */
	public void updateClientVersion(Map<String, Object> map) throws Exception;

}
