package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_729藏宝阁奖励.xlsx
 */
public class Struct_cbg_729 {
    /**序号*/
    private int id;
    /**编号
	 * 阶段编号
	 * 1：幸运值[[0,50]]
	 * 2:幸运值[[51,100]]
	 * 3:幸运值[[101,500]]
	 * 4:幸运值[[501,800]]
	 * 5:幸运值[[801,1000]]
	 * 
	 * 每一阶段具体数值读阶段字段
	 * */
    private int bianhao;
    /**阶段
	 * 幸运值阶段,每个阶段抽奖概率不同
	 * 
	 * [[A,B]]
	 * 例：[[0,50]]为幸运值在0~50之间（包括0和50）
	 * */
    private int[][] jieduan;
    /**奖励*/
    private int[][] jiangli;
    /**概率*/
    private int gailv;
    /**大奖
	 * 1：大奖，需要公示和广播
	 * 0：普通奖励，不公示和广播*/
    private int dajiang;
    /**期数*/
    private int qs;
    /**下一期数*/
    private int next;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 编号
	 * 阶段编号
	 * 1：幸运值[[0,50]]
	 * 2:幸运值[[51,100]]
	 * 3:幸运值[[101,500]]
	 * 4:幸运值[[501,800]]
	 * 5:幸运值[[801,1000]]
	 * 
	 * 每一阶段具体数值读阶段字段
	 * 
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 阶段
	 * 幸运值阶段,每个阶段抽奖概率不同
	 * 
	 * [[A,B]]
	 * 例：[[0,50]]为幸运值在0~50之间（包括0和50）
	 * 
     */
    public int[][] getJieduan() {
        return jieduan;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    /**
     * 概率
     */
    public int getGailv() {
        return gailv;
    }
    /**
     * 大奖
	 * 1：大奖，需要公示和广播
	 * 0：普通奖励，不公示和广播
     */
    public int getDajiang() {
        return dajiang;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 下一期数
     */
    public int getNext() {
        return next;
    }
    public Struct_cbg_729(int id,int bianhao,String jieduan,String jiangli,int gailv,int dajiang,int qs,int next) {
        this.id = id;
        this.bianhao = bianhao;
        this.jieduan = ExcelJsonUtils.toObj(jieduan,int[][].class);
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.gailv = gailv;
        this.dajiang = dajiang;
        this.qs = qs;
        this.next = next;
    }
}