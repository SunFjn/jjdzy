package com.teamtop.system.crossZhuLu.mapper;

import java.util.List;

import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.util.mybatis.BaseMapper;

public interface CrossZhuLuHeroInfoMapper extends BaseMapper<CrossZhuLuHeroInfo> {
	/**
	 * 查找数据
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Object> findAllData() throws Exception;

}
