package com.teamtop.system.crossMine;

import java.util.List;

import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.util.mybatis.BaseMapper;

public interface CrossMineMapper extends BaseMapper<CrossMine> {
	/**
	 * 查找本服所有参赛数据
	 * 
	 * @author lobbyer
	 */
	public List<Object> findallCrossMine() throws Exception;

	/**
	 * 插入排行数据
	 * 
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月24日
	 */
	public void insertCrossMine(CrossMine crossMine) throws Exception;

	/**
	 * 批量更新
	 * 
	 * @param list
	 * @throws Exception
	 */
	// public void insertIntoBatch(List<CrossSelectKing> list) throws Exception;
	/**
	 * 清空数据
	 * 
	 * @author lobbyer
	 */
	public void truncate() throws Exception;
}
