package com.teamtop.system.activity.ativitys.yuanXiao.model;

import java.util.List;
import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface YuanXiaoCrossJoinerMapper extends BaseMapper<YuanXiaoCrossJoiner> {

	/**
	 * 获取数据
	 * @author lobbyer
	 * @param term
	 * @return
	 * @throws Exception
	 * @date 2016年8月30日
	 */
	public List<Object> findJoinerList() throws Exception;
	
	/**
	 * 插入数据
	 * @author lobbyer
	 * @param rank
	 * @throws Exception
	 * @date 2016年8月24日
	 */
	public void insertJoiner(YuanXiaoCrossJoiner rank) throws Exception;

	/**
	 * 更新当前数据
	 * @author lobbyer
	 * @param map
	 * @date 2016年8月30日
	 */
	public void updateRank(Map<String,Object> map) throws Exception;
	/**
	 * 清空数据
	 * @author lobbyer
	 * @throws Exception
	 * @date 2017年7月31日
	 */
	public void truncate() throws Exception;

}
