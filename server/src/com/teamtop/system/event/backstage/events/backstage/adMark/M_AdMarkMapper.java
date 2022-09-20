package com.teamtop.system.event.backstage.events.backstage.adMark;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface M_AdMarkMapper extends BaseMapper<M_AdMark> {

	/**
	 * 查找某账号的广告号信息
	 * @param openid
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> findByOpenid(String openid) throws Exception;

	/**
	 * 更新广告号
	 * @param data
	 * @throws Exception
	 */
	public void updateData(M_AdMark data) throws Exception;

}
