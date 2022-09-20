package com.teamtop.system.event.backstage.events.backstage.blackList;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

/**
 * 黑名单数据库操作接口
 * @author hepl
 *
 */
public interface BlackListMapper extends BaseMapper<M_BlackList>{
	/**
	 * 查找某个玩家账号的黑名单信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByOpenid(String openid) throws Exception;
	
	/**
	 * 更新黑名单数据
	 * 
	 * @param m_BlackList
	 * @throws Exception
	 */
	public void updateData(M_BlackList m_BlackList) throws Exception;

}
