package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_332-新活动-三国战令任务表.xlsx
 */
public class Struct_sgzlrw_332 {
    /**编号*/
    private int id;
    /**任务类型
	 * 1:累计登陆XXX天
	 * 2:全民BOSS累计挑战XXX次
	 * 3:战场BOSS累计击杀XXX次
	 * 4:神将抽奖XXX次
	 * 5:祈愿XXX次
	 * 6:圣兽寻宝XXX圈
	 * 7:鉴定符文XXX次
	 * 8:仙山寻兽XXX次
	 * 9:虎牢关参与XXX次
	 * 10:累计充值35元以上XXX天
	 * 11:孟获参与XXX次
	 * 12:挖玉矿XXX次（协助不算）
	 * 13:使用异兽灵元丹XXX个
	 * 14:累计消费XXX元宝
	 * 15:累计充值XXX元
	 * */
    private int leixing;
    /**参数*/
    private int canshu;
    /**后置任务*/
    private int houzhi;
    /**任务奖励*/
    private int[][] putong;
    /**期数*/
    private int qs;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 任务类型
	 * 1:累计登陆XXX天
	 * 2:全民BOSS累计挑战XXX次
	 * 3:战场BOSS累计击杀XXX次
	 * 4:神将抽奖XXX次
	 * 5:祈愿XXX次
	 * 6:圣兽寻宝XXX圈
	 * 7:鉴定符文XXX次
	 * 8:仙山寻兽XXX次
	 * 9:虎牢关参与XXX次
	 * 10:累计充值35元以上XXX天
	 * 11:孟获参与XXX次
	 * 12:挖玉矿XXX次（协助不算）
	 * 13:使用异兽灵元丹XXX个
	 * 14:累计消费XXX元宝
	 * 15:累计充值XXX元
	 * 
     */
    public int getLeixing() {
        return leixing;
    }
    /**
     * 参数
     */
    public int getCanshu() {
        return canshu;
    }
    /**
     * 后置任务
     */
    public int getHouzhi() {
        return houzhi;
    }
    /**
     * 任务奖励
     */
    public int[][] getPutong() {
        return putong;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_sgzlrw_332(int id,int leixing,int canshu,int houzhi,String putong,int qs) {
        this.id = id;
        this.leixing = leixing;
        this.canshu = canshu;
        this.houzhi = houzhi;
        this.putong = ExcelJsonUtils.toObj(putong,int[][].class);
        this.qs = qs;
    }
}