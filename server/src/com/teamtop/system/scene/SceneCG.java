package com.teamtop.system.scene;
import com.teamtop.system.hero.Hero;

/**
 * SceneCG.java
 * 场景
 */
public class SceneCG{

	private static SceneCG ins = null;

	public static SceneCG getIns(){
		if(ins == null){
			ins = new SceneCG();
		}
		return ins;
	}

	/**
	 * CG 请求进入某个场景 3901
	 * @param sid| 场景id| int
	 */
	public void inscene(Hero hero, Object[] datas){
		int sid = (int)datas[0];
		SceneManager.getIns().inscene(hero, sid);
	} 
	/**
	 * CG移动坐标点集合 3907
	 * @param movearr| | Object[]
	 */
	public void move(Hero hero, Object[] datas){
		Object[] movearr = (Object[])datas[0];
		SceneManager.getIns().move(hero, movearr);
	} 
	/**
	 * CG 移动完毕 3909
	 * @param endx| endx| short
	 * @param endy| endy| short
	 */
	public void finishMove(Hero hero, Object[] datas){
		int endx = (short)datas[0];
		int endy = (short)datas[1];
		SceneManager.getIns().finishMove(hero, endx, endy);
	} 
	/**
	 * CG坐标同步 3911
	 * @param x| X坐标| short
	 * @param y| Y坐标| short
	 */
	public void syncPosXY(Hero hero, Object[] datas){
		int x = (short)datas[0];
		int y = (short)datas[1];
		SceneManager.getIns().syncPosXY(hero, x, y);
	} 
	/**
	 * CG路径同步 3913
	 * @param posarr| 坐标点集合| Object[]
	 */
	public void syncRoute(Hero hero, Object[] datas){
		Object[] posarr = (Object[])datas[0];
		SceneManager.getIns().syncRoute(hero, posarr);
	} 
	/**
	 * 进入场景OK 3903
	 */
	public void succEnterScene(Hero hero, Object[] datas){
		SceneManager.getIns().succEnterScene(hero);
	} 
	/**
	 * 切换场景OK 3905
	 */
	public void changeSceneOK(Hero hero, Object[] datas){
		SceneManager.getIns().changeSceneOK(hero);
	} 
	/**
	 * CG 离开场景 3919
	 */
	public void exitScene(Hero hero, Object[] datas){
		SceneManager.getIns().exitScene(hero);
	} 
}