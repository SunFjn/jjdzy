package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * K_338_犒赏三军周挑战表.xlsx
 */
public class Struct_xslweek1_338 {
    /**ID*/
    private int id;
    /**下一任务*/
    private int next;
    /**期数*/
    private int qs;
    /**任务类型
	 * 任务1：装备强化X次
	 * 任务2：装备升星X次（失败也算）
	 * 任务3：消耗XX元宝
	 * 任务4：国家捐献X次
	 * 任务5：战胜个人BOSS X次（扫荡也算）
	 * 任务6：竞技场挑战X次（扫荡也算）
	 * 任务7：战胜材料副本X次（扫荡也算）
	 * 任务8：神秘商城购买X次
	 * 任务9：战胜全民BOSS X次（扫荡也算）
	 * 任务10：少主护送雇佣吕布护送X次
	 * 任务11：战胜升阶秘境X次
	 * 任务12：战胜组队副本X次
	 * 任务13：参与击杀七擒孟获X次
	 * 任务14：参与击杀魔神吕布X次
	 * 任务15：参与隆中对X次
	 * 任务16：乱世枭雄挑战X次
	 * 任务17：南征北战挑战X次
	 * 
	 * */
    private int lx;
    /**参数*/
    private int cs;
    /**奖励*/
    private int[][] reward;
    /**勋章经验*/
    private int exp;
    /**
     * ID
     */
    public int getId() {
        return id;
    }
    /**
     * 下一任务
     */
    public int getNext() {
        return next;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 任务类型
	 * 任务1：装备强化X次
	 * 任务2：装备升星X次（失败也算）
	 * 任务3：消耗XX元宝
	 * 任务4：国家捐献X次
	 * 任务5：战胜个人BOSS X次（扫荡也算）
	 * 任务6：竞技场挑战X次（扫荡也算）
	 * 任务7：战胜材料副本X次（扫荡也算）
	 * 任务8：神秘商城购买X次
	 * 任务9：战胜全民BOSS X次（扫荡也算）
	 * 任务10：少主护送雇佣吕布护送X次
	 * 任务11：战胜升阶秘境X次
	 * 任务12：战胜组队副本X次
	 * 任务13：参与击杀七擒孟获X次
	 * 任务14：参与击杀魔神吕布X次
	 * 任务15：参与隆中对X次
	 * 任务16：乱世枭雄挑战X次
	 * 任务17：南征北战挑战X次
	 * 
	 * 
     */
    public int getLx() {
        return lx;
    }
    /**
     * 参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 勋章经验
     */
    public int getExp() {
        return exp;
    }
    public Struct_xslweek1_338(int id,int next,int qs,int lx,int cs,String reward,int exp) {
        this.id = id;
        this.next = next;
        this.qs = qs;
        this.lx = lx;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.exp = exp;
    }
}