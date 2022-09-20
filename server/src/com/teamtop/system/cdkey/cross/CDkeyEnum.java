package com.teamtop.system.cdkey.cross;

/**
 * 激活码枚举类
 * @author hepl
 *
 */
public enum CDkeyEnum {
	cdkey, // 激活码
	type,//激活码类型
	gainCDkeyRecordMap,//玩家已领取激活码记录Map
	commCDkeyMap, // 通用码记录Map
	pf, // 渠道code
	state;// 1成功,2激活码有误,3,激活码已被使用
}
