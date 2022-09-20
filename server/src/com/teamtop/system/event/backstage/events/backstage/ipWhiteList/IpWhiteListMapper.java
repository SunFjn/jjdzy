package com.teamtop.system.event.backstage.events.backstage.ipWhiteList;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface IpWhiteListMapper extends BaseMapper<M_IpWhiteList> {

	/**
	 * 查找ip的白名单信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByIp(String openid) throws Exception;

	/**
	 * 更新白名单
	 * @param data
	 * @throws Exception
	 */
	public void updateData(M_IpWhiteList data) throws Exception;

}
