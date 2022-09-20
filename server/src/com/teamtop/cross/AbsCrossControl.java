package com.teamtop.cross;

import com.teamtop.system.hero.Hero;

/**
 * 服务器收到CG包后是否处理
 * @author Administrator
 *
 */
public abstract class AbsCrossControl {
	public abstract boolean reciCG(Hero hero,boolean isCrossServer,int cmd);
}
