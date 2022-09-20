package com.teamtop.system.hero;

/**
 * hero和侠客资质属性
 * 宠物的灵性属性
 * @author hepl
 *
 */
public class PotentialAttr {
    /**气血*/
    private int hp;
    /**物理攻击*/
    private int attack;
    /**物理防御*/
    private int defend;
    /**暴击*/
    private int critical;
    /**韧性*/
    private int tonghness;
    /**格档*/
    private int block;
    /**破击*/
    private int wreck;
    /**攻击速度*/
    private int attSpeed;
    /**暴击伤害*/
    private int critDamg;
    /**抵抗暴伤*/
    private int resistCrit;
    /**移动速度*/
    private int moveSpeed;
    /**
     * 气血
     */
    public int getHp() {
        return hp;
    }
    /**
     * 物理攻击
     */
    public int getAttack() {
        return attack;
    }
    /**
     * 物理防御
     */
    public int getDefend() {
        return defend;
    }
    /**
     * 暴击
     */
    public int getCritical() {
        return critical;
    }
    /**
     * 韧性
     */
    public int getTonghness() {
        return tonghness;
    }
    /**
     * 格档
     */
    public int getBlock() {
        return block;
    }
    /**
     * 破击
     */
    public int getWreck() {
        return wreck;
    }
    /**
     * 攻击速度
     */
    public int getAttSpeed() {
        return attSpeed;
    }
    /**
     * 暴击伤害
     */
    public int getCritDamg(){
    	return critDamg;
    }
    /**
     * 抵抗暴伤
     */
    public int getResistCrit(){
    	return resistCrit;
    }
    /**
     * 移动速度
     */
    public int getMoveSpeed(){
    	return moveSpeed;
    }
    
    public PotentialAttr(int hp,int attack,int defend,int critical,int tonghness,
    		int block,int wreck,int attSpeed,int critDamg,int resistCrit,int moveSpeed) {
        this.hp = hp;
        this.attack = attack;
        this.defend = defend;
        this.critical = critical;
        this.tonghness = tonghness;
        this.block = block;
        this.wreck = wreck;
        this.attSpeed = attSpeed;
        this.critDamg = critDamg;
        this.resistCrit = resistCrit;
        this.moveSpeed = moveSpeed;
    }
}
