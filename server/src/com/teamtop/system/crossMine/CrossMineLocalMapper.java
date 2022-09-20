package com.teamtop.system.crossMine;

import com.teamtop.system.crossMine.model.CrossMineLocal;
import com.teamtop.util.mybatis.BaseMapper;

public interface CrossMineLocalMapper extends BaseMapper<CrossMineLocal> {
	/**
	 * 更新协助id
	 * @param hid
	 * @throws Exception
	 */
	public void updataCrossMine(long hid) throws Exception;

}
