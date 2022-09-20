package com.teamtop.system.redBox.cross;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redBox.RedBoxFunction;

public class RedBoxCrossEvent extends AbsSystemEvent {


    private static volatile RedBoxCrossEvent ins = null;

    public static RedBoxCrossEvent getIns() {
        if (ins == null) {
            synchronized (RedBoxCrossEvent.class) {
                if (ins == null) {
                    ins = new RedBoxCrossEvent();
                }
            }
        }
        return ins;
    }
	
	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void zeroPub(int now){
		RedBoxFunction.getIns().crossCacheZero();
	}

}
