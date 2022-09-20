package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_327_运筹帷幄_奇策有礼任务表.xlsx
 */
public class Struct_qcylrw_327 {
    /**编号*/
    private int id;
    /**期数*/
    private int qishu;
    /**任务类型
	 * 1.激活奇策数量
	 * 2.奇策总阶数
	 * 3.奇策总战力
	 * 4.奇策总星数*/
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
	 * 1.激活奇策数量
	 * 2.奇策总阶数
	 * 3.奇策总战力
	 * 4.奇策总星数
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
    public Struct_qcylrw_327(int id,int qishu,int leixing,int canshu,String putong) {
        this.id = id;
        this.qishu = qishu;
        this.leixing = leixing;
        this.canshu = canshu;
        this.putong = ExcelJsonUtils.toObj(putong,int[][].class);
    }
}