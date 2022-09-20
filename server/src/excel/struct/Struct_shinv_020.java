package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_020_侍女表.xlsx
 */
public class Struct_shinv_020 {
    /**侍女ID*/
    private int id;
    /**头像
	 * D:\haiou\client\sanguo\resource\image\icon70
	 * 
	 * */
    private int touxiang;
    /**原画*/
    private int yuanhua;
    /**激活（升星）消耗*/
    private int[][] xiaohao;
    /**品质*/
    private int pinzhi;
    /**升星上限*/
    private int shangxian;
    /**动态解锁星级*/
    private int dongtai;
    /**
     * 侍女ID
     */
    public int getId() {
        return id;
    }
    /**
     * 头像
	 * D:\haiou\client\sanguo\resource\image\icon70
	 * 
	 * 
     */
    public int getTouxiang() {
        return touxiang;
    }
    /**
     * 原画
     */
    public int getYuanhua() {
        return yuanhua;
    }
    /**
     * 激活（升星）消耗
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 品质
     */
    public int getPinzhi() {
        return pinzhi;
    }
    /**
     * 升星上限
     */
    public int getShangxian() {
        return shangxian;
    }
    /**
     * 动态解锁星级
     */
    public int getDongtai() {
        return dongtai;
    }
    public Struct_shinv_020(int id,int touxiang,int yuanhua,String xiaohao,int pinzhi,int shangxian,int dongtai) {
        this.id = id;
        this.touxiang = touxiang;
        this.yuanhua = yuanhua;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.pinzhi = pinzhi;
        this.shangxian = shangxian;
        this.dongtai = dongtai;
    }
}