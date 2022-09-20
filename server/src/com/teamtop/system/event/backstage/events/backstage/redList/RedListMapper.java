package com.teamtop.system.event.backstage.events.backstage.redList;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

/**
 * 红名单数据库操作接口
 * @author hepl
 *
 */
public interface RedListMapper extends BaseMapper<M_RedList>{
	/**
	 * 查找某个玩家账号的红名单信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByOpenid(String openid) throws Exception;
	
}
