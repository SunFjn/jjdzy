package com.teamtop.system.event.backstage.events.backstage.whiteList;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface WhiteListMapper extends BaseMapper<M_WhiteList> {

	/**
	 * 查找某账号的白名单信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByOpenid(String openid) throws Exception;

	/**
	 * 更新白名单
	 * @param data
	 * @throws Exception
	 */
	public void updateData(M_WhiteList data) throws Exception;

}
