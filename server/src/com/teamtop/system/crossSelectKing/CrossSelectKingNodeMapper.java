package com.teamtop.system.crossSelectKing;

import java.util.List;
import java.util.Map;

import com.teamtop.system.crossSelectKing.cross.CrossSelectKingNode;
import com.teamtop.util.mybatis.BaseMapper;

public interface CrossSelectKingNodeMapper extends BaseMapper<CrossSelectKingNode>{
	/**
	 * 获取当前届所有节点数据
	 * @author lobbyer
	 * @return
	 * @throws Exception
	 * @date 2017年7月31日
	 */
	public List<Object> findCrossSelectKingNode() throws Exception;

	/**
	 * 更新当前节点数据
	 * @author lobbyer
	 * @param map
	 * @date 2017年7月31日
	 */
	public void updateNode(Map<String,Object> map);
	/**
	 * 批量insert装备
	 * @param list
	 * @throws Exception
	 */
	public void insertIntoBatch(List<CrossSelectKingNode> list) throws Exception;
	/**
	 * 清空所有本服晋级赛角色数据
	 * @author lobbyer
	 * @throws Exception
	 * @date 2017年7月31日
	 */
	public void truncateCrossSelectKingNode() throws Exception;
}
