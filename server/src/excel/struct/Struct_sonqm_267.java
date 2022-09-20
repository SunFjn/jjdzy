package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-267-少主亲密表.xlsx
 */
public class Struct_sonqm_267 {
    /**等级*/
    private int lv;
    /**升级所需经验*/
    private int exp;
    /**属性*/
    private int[][] attr;
    /**解锁技能孔*/
    private int skill;
    /**奖励*/
    private int[][] reward;
    /**
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 升级所需经验
     */
    public int getExp() {
        return exp;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 解锁技能孔
     */
    public int getSkill() {
        return skill;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_sonqm_267(int lv,int exp,String attr,int skill,String reward) {
        this.lv = lv;
        this.exp = exp;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.skill = skill;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}