package com.teamtop.system.crossKing.model;

import java.util.List;
import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface CrossKingRankMapper extends BaseMapper<CrossKingRank> {
	/**
	 * 获取当前届所有节点数据
	 * @author lobbyer
	 * @param term
	 * @return
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public List<Object> findTermRank() throws Exception;
	
	/**
	 * 插入排行数据
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月24日
	 */
	public void insertRank(CrossKingRank rank) throws Exception;

	/**
	 * 更新当前排行数据
	 * @author lobbyer
	 * @param map
	 * @date 2016年8月30日
	 */
	public void updateRank(Map<String,Object> map) throws Exception;
	/**
	 * 清空所有本服晋级赛角色数据
	 * @author lobbyer
	 * @throws Exception
	 * @date 2017年7月31日
	 */
	public void truncate() throws Exception;
}
