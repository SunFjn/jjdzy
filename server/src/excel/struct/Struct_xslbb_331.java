package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_331_限时礼包表.xlsx
 */
public class Struct_xslbb_331 {
    /**序号*/
    private int id;
    /**礼包类型
	 * 1.转数
	 * 2.切换地图
	 * 3.红将收集
	 * 4.一骑当千
	 * */
    private int lx;
    /**礼包类型2
	 * 1.豪华成长礼包
	 * 2.至尊成长礼包*/
    private int lx2;
    /**参数
	 * 1：普通
	 * 2：困难
	 * 3：噩梦
	 * 4：传说*/
    private int cs;
    /**充值id
	 * 读充值表
	 * */
    private int cz;
    /**奖励和展示*/
    private int[][] jl;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 礼包类型
	 * 1.转数
	 * 2.切换地图
	 * 3.红将收集
	 * 4.一骑当千
	 * 
     */
    public int getLx() {
        return lx;
    }
    /**
     * 礼包类型2
	 * 1.豪华成长礼包
	 * 2.至尊成长礼包
     */
    public int getLx2() {
        return lx2;
    }
    /**
     * 参数
	 * 1：普通
	 * 2：困难
	 * 3：噩梦
	 * 4：传说
     */
    public int getCs() {
        return cs;
    }
    /**
     * 充值id
	 * 读充值表
	 * 
     */
    public int getCz() {
        return cz;
    }
    /**
     * 奖励和展示
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xslbb_331(int id,int lx,int lx2,int cs,int cz,String jl,int qs) {
        this.id = id;
        this.lx = lx;
        this.lx2 = lx2;
        this.cs = cs;
        this.cz = cz;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.qs = qs;
    }
}