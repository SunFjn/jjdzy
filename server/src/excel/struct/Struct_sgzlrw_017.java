package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_017-三国战令任务表.xlsx
 */
public class Struct_sgzlrw_017 {
    /**编号*/
    private int id;
    /**任务类型
	 * 1.累计登陆X天
	 * 2.累计挑战全民BOSS X次
	 * 3.累计击杀战场BOSS X次（本服和跨服都算）
	 * 4.火烧赤壁通关X关
	 * 5.圣兽洗练X次
	 * 6.圣兽寻宝跑X圈
	 * 7.激活X个圣兽幻形
	 * 8.激活X个10星印记
	 * 9.圣兽战力达到X
	 * 10.累计充值35元以上X天
	 * 11.累计充值X元
	 * 12.累计消费X元宝
	 * */
    private int leixing;
    /**参数*/
    private int canshu;
    /**后置任务*/
    private int houzhi;
    /**任务奖励*/
    private int[][] putong;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 任务类型
	 * 1.累计登陆X天
	 * 2.累计挑战全民BOSS X次
	 * 3.累计击杀战场BOSS X次（本服和跨服都算）
	 * 4.火烧赤壁通关X关
	 * 5.圣兽洗练X次
	 * 6.圣兽寻宝跑X圈
	 * 7.激活X个圣兽幻形
	 * 8.激活X个10星印记
	 * 9.圣兽战力达到X
	 * 10.累计充值35元以上X天
	 * 11.累计充值X元
	 * 12.累计消费X元宝
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
    public Struct_sgzlrw_017(int id,int leixing,int canshu,int houzhi,String putong) {
        this.id = id;
        this.leixing = leixing;
        this.canshu = canshu;
        this.houzhi = houzhi;
        this.putong = ExcelJsonUtils.toObj(putong,int[][].class);
    }
}