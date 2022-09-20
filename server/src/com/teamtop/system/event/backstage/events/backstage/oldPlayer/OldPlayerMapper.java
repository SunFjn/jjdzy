package com.teamtop.system.event.backstage.events.backstage.oldPlayer;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

/**
 * 滚服玩家数据操作接口
 * @author hepl
 *
 */
public interface OldPlayerMapper extends BaseMapper<M_OldPlayer>{
	/**
	 * 查找某个玩家账号的滚服信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByOpenid(String openid) throws Exception;

	/**
	 * 查找某个ip注册的账号数量
	 * @param createIp
	 * @return
	 * @throws Exception
	 */
	public int findSameIpOpenidNum(String createIp) throws Exception;
}
