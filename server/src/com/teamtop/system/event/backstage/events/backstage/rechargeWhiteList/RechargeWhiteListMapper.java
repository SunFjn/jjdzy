package com.teamtop.system.event.backstage.events.backstage.rechargeWhiteList;

import java.util.List;
import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface RechargeWhiteListMapper extends BaseMapper<M_RechargeWhiteList> {

	/**
	 * 查找某账号的充值白名单信息
	 * 
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByOpenid(String openid) throws Exception;

	/**
	 * 查找所有充值白名单数据
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<M_RechargeWhiteList> findAll() throws Exception;

	/**
	 * 更新充值白名单
	 * 
	 * @param data
	 * @throws Exception
	 */
	public void updateData(M_RechargeWhiteList data) throws Exception;

}
