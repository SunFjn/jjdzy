package com.teamtop.system.crossSelectKing;

import java.util.List;

import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.util.mybatis.BaseMapper;

public interface CrossSelectKingMapper extends BaseMapper<CrossSelectKing>{
	/**
	 * 查找本服所有参赛数据
	 * @author lobbyer
	 */
	public List<Object> findallCrossSelectKing() throws Exception;
	/**
	 * 批量更新
	 * @param list
	 * @throws Exception
	 */
	//public void insertIntoBatch(List<CrossSelectKing> list) throws Exception;
	/**
	 * 清空本地排行角色数据
	 * @author lobbyer
	 */
	public void truncate() throws Exception;
}
