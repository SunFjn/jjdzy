package com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu;

import java.util.List;

import com.teamtop.util.mybatis.BaseMapper;

public interface KuaFuFenQuMapper extends BaseMapper<KuaFuFenQuInfo> {

	public List<KuaFuFenQuInfo> findKuaFuFenQuInfo() throws Exception;

}
