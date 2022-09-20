package com.teamtop.system.house.yard.model;

import java.util.List;

import com.teamtop.util.mybatis.BaseMapper;

public interface CrossHouseMapper extends BaseMapper<CrossHouse> {
	/**
	 * 查找所有府邸数据
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Object> findAllData() throws Exception;

	/**
	 * 插入府邸数据
	 * 
	 * @param cHouse
	 * @throws Exception
	 */
	public void insertData(CrossHouse cHouse) throws Exception;

	/**
	 * 清空数据
	 * 
	 * @throws Exception
	 */
	public void truncate() throws Exception;
}
