package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_729藏宝阁-幸运值.xlsx
 */
public class Struct_cbg2_729 {
    /**序号*/
    private int id;
    /**幸运值
	 * 达到指定幸运值必中奖励*/
    private int xingyunzhi;
    /**奖励*/
    private int[][] jiangli;
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
     * 幸运值
	 * 达到指定幸运值必中奖励
     */
    public int getXingyunzhi() {
        return xingyunzhi;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
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
    public Struct_cbg2_729(int id,int xingyunzhi,String jiangli,int qs,int next) {
        this.id = id;
        this.xingyunzhi = xingyunzhi;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.qs = qs;
        this.next = next;
    }
}