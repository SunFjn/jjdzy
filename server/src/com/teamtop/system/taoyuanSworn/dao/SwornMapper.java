package com.teamtop.system.taoyuanSworn.dao;

import java.util.Map;

import com.teamtop.system.taoyuanSworn.model.Sworn;
import com.teamtop.util.mybatis.BaseMapper;

public interface SwornMapper extends BaseMapper<Sworn> {
	//获取桃园结义id
	public Map<String, Object> getSwornByHid(long hid) throws Exception;
	//更新桃园结义信息
//	public void updateSwornByHid(Map<String, Object> params) throws Exception;
}
