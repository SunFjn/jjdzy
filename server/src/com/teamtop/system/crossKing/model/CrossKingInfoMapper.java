package com.teamtop.system.crossKing.model;

import com.teamtop.util.mybatis.BaseMapper;

public interface CrossKingInfoMapper extends BaseMapper<CrossKingInfo> {
	/**
	 * 获取当前赛季数据
	 * @author lobbyer
	 */
	public CrossKingInfo findInfo() throws Exception;
	
}
