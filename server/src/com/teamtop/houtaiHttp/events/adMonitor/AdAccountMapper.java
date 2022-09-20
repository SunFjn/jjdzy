package com.teamtop.houtaiHttp.events.adMonitor;

import java.util.Map;

import com.teamtop.util.mybatis.BaseMapper;

public interface AdAccountMapper extends BaseMapper<M_AdAccount> {
	//查找某个玩家账号的广告号信息
	public Map<String,Object> findByOpenid(String openid) throws Exception;
	//根据账号删除广告号信息
	public void delByOpenid(String openid) throws Exception;
}
