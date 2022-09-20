package com.teamtop.system.event.backstage.events.backstage.antiaddiction;

import java.util.Map;

import com.teamtop.system.antiAddictionSystem.model.AntiAddictionInfo;
import com.teamtop.util.mybatis.BaseMapper;

public interface AntiAddictionMapper extends BaseMapper<AntiAddictionInfo> {

	/**
	 * 根据账号查找防沉迷数据
	 * 
	 * @param openid
	 * @return
	 */
	public Map<String, Object> findInfo(String openid) throws Exception;

	/**
	 * 更新防沉迷数据
	 * 
	 * @param info
	 * @throws Exception
	 */
	public void updateData(AntiAddictionInfo info) throws Exception;

}
