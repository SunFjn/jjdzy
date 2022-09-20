package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_752_异兽录-天赋技能.xlsx
 */
public class Struct_ystf_752 {
    /**等级
	 * 1XXX：穷奇
	 * 2XXX：天狗
	 * 3XXX：麒麟
	 * 4XXX：毕方
	 * 5XXX：虎蛟
	 * 6XXX：狰
	 * 7XXX：九尾狐
	 * 8XXX：白泽*/
    private int dj;
    /**下一级*/
    private int xj;
    /**升级条件
	 * 
	 * [[A,B]]
	 * A:装备id
	 * B:等级
	 * 等级与天赋升级表对应*/
    private int[][] tj;
    /**类型
	 * 对应属性字段
	 * 
	 * 1.每次攻击回复怒气xx点，固定数值
	 * 
	 * 2.宝物、天书CD减少xx时间，固定数值
	 *   两个宝物位置一起减少xx毫秒
	 * 
	 * 3.增强宝物治疗效果xx%，十万分比
	 *   自己使用回血类道具，治疗效果增强x%
	 * 
	 * 4.被控时间减少xxx，固定数值
	 *   PVP战斗中，被控制类道具控制的时间减少xx毫秒
	 * 
	 * 5.敌方武将技能降低xx%伤害，十万分比
	 *   敌方对自己造成的技能伤害降低xx%（技能123）
	 * 
	 * 6.降低敌方治疗效果xx%，十万分比
	 *   PVP战斗中，敌方使用回血类道具会减少x%效果
	 * 
	 * 7.少主主动技能提升xx%伤害，十万分比
	 *   
	 * 8.武将技能提升xx%伤害，十万分比
	 *   武将的技能1,2,3都要提升xx%伤害
	 * 
	 * 
	 * 
	 * */
    private int lx;
    /**属性*/
    private int[][] sx;
    /**升级提升
	 * 提升装备升级属性十万分比*/
    private int sj;
    /**升品提升
	 * 提升装备升品属性十万分比*/
    private int sp;
    /**
     * 等级
	 * 1XXX：穷奇
	 * 2XXX：天狗
	 * 3XXX：麒麟
	 * 4XXX：毕方
	 * 5XXX：虎蛟
	 * 6XXX：狰
	 * 7XXX：九尾狐
	 * 8XXX：白泽
     */
    public int getDj() {
        return dj;
    }
    /**
     * 下一级
     */
    public int getXj() {
        return xj;
    }
    /**
     * 升级条件
	 * 
	 * [[A,B]]
	 * A:装备id
	 * B:等级
	 * 等级与天赋升级表对应
     */
    public int[][] getTj() {
        return tj;
    }
    /**
     * 类型
	 * 对应属性字段
	 * 
	 * 1.每次攻击回复怒气xx点，固定数值
	 * 
	 * 2.宝物、天书CD减少xx时间，固定数值
	 *   两个宝物位置一起减少xx毫秒
	 * 
	 * 3.增强宝物治疗效果xx%，十万分比
	 *   自己使用回血类道具，治疗效果增强x%
	 * 
	 * 4.被控时间减少xxx，固定数值
	 *   PVP战斗中，被控制类道具控制的时间减少xx毫秒
	 * 
	 * 5.敌方武将技能降低xx%伤害，十万分比
	 *   敌方对自己造成的技能伤害降低xx%（技能123）
	 * 
	 * 6.降低敌方治疗效果xx%，十万分比
	 *   PVP战斗中，敌方使用回血类道具会减少x%效果
	 * 
	 * 7.少主主动技能提升xx%伤害，十万分比
	 *   
	 * 8.武将技能提升xx%伤害，十万分比
	 *   武将的技能1,2,3都要提升xx%伤害
	 * 
	 * 
	 * 
	 * 
     */
    public int getLx() {
        return lx;
    }
    /**
     * 属性
     */
    public int[][] getSx() {
        return sx;
    }
    /**
     * 升级提升
	 * 提升装备升级属性十万分比
     */
    public int getSj() {
        return sj;
    }
    /**
     * 升品提升
	 * 提升装备升品属性十万分比
     */
    public int getSp() {
        return sp;
    }
    public Struct_ystf_752(int dj,int xj,String tj,int lx,String sx,int sj,int sp) {
        this.dj = dj;
        this.xj = xj;
        this.tj = ExcelJsonUtils.toObj(tj,int[][].class);
        this.lx = lx;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.sj = sj;
        this.sp = sp;
    }
}