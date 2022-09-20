package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_262_闯关有礼任务表.xlsx
 */
public class Struct_cgylrw_262 {
    /**索引id*/
    private int id;
    /**任务类型
	 * 1.关卡任务
	 * ◆玩家达到XX关可领
	 *   任务进度(玩家当前达到关卡/任务要求达到关卡)
	 * 2.玩家战力
	 * ◆玩家总战力达到XX可领
	 *   任务进度(玩家当前总战力/任务要求总战力)
	 *   注:前端用XX万显示战力,不然显示不下
	 * 3.等级
	 * ◆玩家等级达到XX级可领
	 *   任务进度(玩家当前等级/任务要求等级)
	 * 4.全身强化
	 * ◆玩家全身强化等级达到XX可领
	 *   任务进度(玩家当前满足强化等级的部位数量/10)
	 * 5.全身升星
	 * ◆玩家全身升星等级达到XX可领
	 *   任务进度(玩家当前满足升星星级的部位数量/10)
	 * 6.宝石总等级
	 * ◆玩家宝石总等级达到XX级可领
	 *   任务进度(玩家当前宝石总等级/任务要求宝石总等级)
	 *   该任务满足条件后即使玩家取下宝石导致等级不足也需算完成
	 * 7.技能总等级
	 * ◆玩家技能总等级达到XX级可领
	 *   任务进度(玩家当前技能总等级/任务要求技能总等级)
	 * */
    private int type;
    /**任务参数*/
    private int cs;
    /**任务奖励*/
    private int[][] reward;
    /**所属目标*/
    private int mb;
    /**监控ID*/
    private int jiankong;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 任务类型
	 * 1.关卡任务
	 * ◆玩家达到XX关可领
	 *   任务进度(玩家当前达到关卡/任务要求达到关卡)
	 * 2.玩家战力
	 * ◆玩家总战力达到XX可领
	 *   任务进度(玩家当前总战力/任务要求总战力)
	 *   注:前端用XX万显示战力,不然显示不下
	 * 3.等级
	 * ◆玩家等级达到XX级可领
	 *   任务进度(玩家当前等级/任务要求等级)
	 * 4.全身强化
	 * ◆玩家全身强化等级达到XX可领
	 *   任务进度(玩家当前满足强化等级的部位数量/10)
	 * 5.全身升星
	 * ◆玩家全身升星等级达到XX可领
	 *   任务进度(玩家当前满足升星星级的部位数量/10)
	 * 6.宝石总等级
	 * ◆玩家宝石总等级达到XX级可领
	 *   任务进度(玩家当前宝石总等级/任务要求宝石总等级)
	 *   该任务满足条件后即使玩家取下宝石导致等级不足也需算完成
	 * 7.技能总等级
	 * ◆玩家技能总等级达到XX级可领
	 *   任务进度(玩家当前技能总等级/任务要求技能总等级)
	 * 
     */
    public int getType() {
        return type;
    }
    /**
     * 任务参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 任务奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 所属目标
     */
    public int getMb() {
        return mb;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_cgylrw_262(int id,int type,int cs,String reward,int mb,int jiankong) {
        this.id = id;
        this.type = type;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.mb = mb;
        this.jiankong = jiankong;
    }
}