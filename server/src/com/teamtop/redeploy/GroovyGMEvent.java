package com.teamtop.redeploy;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.houtaiHttp.events.groovy.GroovyCache;
import com.teamtop.redeploy.cross.RedeployLocalToCross;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.hero.Hero;
/**
 * 脚本GM，在内测服发送脚本其他服
 * @author Administrator
 *
 */
public class GroovyGMEvent extends AbsGMEvent {
	private static GroovyGMEvent ins = null;
	
	public static GroovyGMEvent getIns() {
		if (ins == null) {
			ins = new GroovyGMEvent();
		}
		return ins;
	}
	
	@Override
	public void gm(Hero hero, int type, String[] param) {
		List<Integer> zonelist = new ArrayList<Integer>();
		int start = Integer.parseInt(param[0]);
		int end = Integer.parseInt(param[1]);
		for(int i=start;i<=end;i++){
			if(!zonelist.contains(new Integer(i))){
				zonelist.add(i);
			}
		}
		RedeployLocalToCross.groovyByZIDListLC(zonelist, GroovyCache.DEBUG_FILE_NAME, RedeployEnum.groovy.name());
	}
}
