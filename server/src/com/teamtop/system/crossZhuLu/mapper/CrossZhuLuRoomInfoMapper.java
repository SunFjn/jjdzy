package com.teamtop.system.crossZhuLu.mapper;

import java.util.List;

import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.util.mybatis.BaseMapper;

public interface CrossZhuLuRoomInfoMapper extends BaseMapper<CrossZhuLuRoomInfo> {
	/**
	 * 查找数据
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Object> findAllData() throws Exception;

}
