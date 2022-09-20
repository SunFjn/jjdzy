package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_018-异兽送礼任务表.xlsx
 */
public class Struct_ysslrw_018 {
    /**编号*/
    private int id;
    /**期数*/
    private int qishu;
    /**任务类型
	 * 1.激活异兽数量
	 * 2.异兽总阶数
	 * 3.异兽总战力
	 * 4.异兽抽奖次数*/
    private int leixing;
    /**参数*/
    private int canshu;
    /**任务奖励*/
    private int[][] putong;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 任务类型
	 * 1.激活异兽数量
	 * 2.异兽总阶数
	 * 3.异兽总战力
	 * 4.异兽抽奖次数
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
     * 任务奖励
     */
    public int[][] getPutong() {
        return putong;
    }
    public Struct_ysslrw_018(int id,int qishu,int leixing,int canshu,String putong) {
        this.id = id;
        this.qishu = qishu;
        this.leixing = leixing;
        this.canshu = canshu;
        this.putong = ExcelJsonUtils.toObj(putong,int[][].class);
    }
}