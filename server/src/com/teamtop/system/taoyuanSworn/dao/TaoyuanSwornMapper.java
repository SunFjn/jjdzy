package com.teamtop.system.taoyuanSworn.dao;

import java.util.List;

import com.teamtop.system.taoyuanSworn.model.TaoyuanSworn;
import com.teamtop.util.mybatis.BaseMapper;

public interface TaoyuanSwornMapper extends BaseMapper<TaoyuanSworn> {
	public Object find(long key) throws Exception;
	public List<Object> findAll() throws Exception;
}
