package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_238_武圣榜目标表.xlsx
 */
public class Struct_wsmb_238 {
    /**目标id
	 * jingyu:
	 * AXX
	 * A=活动id
	 * */
    private int id;
    /**目标类型
	 * jingyu:
	 * 1：宝物等级
	 * 2：天书等级
	 * 3：战甲等级id（前端需根据id转换为显示用的X阶X级）
	 * 4：图鉴总等级（所有已激活图鉴等级之和）
	 * 5：将魂总等级（所有已激活将魂等级之和）
	 * 6：铜雀台通关层数
	 * 7：总战力*/
    private int type;
    /**目标参数*/
    private int canshu;
    /**奖励*/
    private int[][] reward;
    /**下一目标*/
    private int next;
    /**
     * 目标id
	 * jingyu:
	 * AXX
	 * A=活动id
	 * 
     */
    public int getId() {
        return id;
    }
    /**
     * 目标类型
	 * jingyu:
	 * 1：宝物等级
	 * 2：天书等级
	 * 3：战甲等级id（前端需根据id转换为显示用的X阶X级）
	 * 4：图鉴总等级（所有已激活图鉴等级之和）
	 * 5：将魂总等级（所有已激活将魂等级之和）
	 * 6：铜雀台通关层数
	 * 7：总战力
     */
    public int getType() {
        return type;
    }
    /**
     * 目标参数
     */
    public int getCanshu() {
        return canshu;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 下一目标
     */
    public int getNext() {
        return next;
    }
    public Struct_wsmb_238(int id,int type,int canshu,String reward,int next) {
        this.id = id;
        this.type = type;
        this.canshu = canshu;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.next = next;
    }
}