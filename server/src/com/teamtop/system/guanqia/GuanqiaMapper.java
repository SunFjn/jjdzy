package com.teamtop.system.guanqia;

import java.util.List;

import com.teamtop.util.mybatis.BaseMapper;
/**
 * 关卡
 *
 */
public interface GuanqiaMapper extends BaseMapper<Guanqia> {
	public List<Object> initRank();
}
