package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸档次表.xlsx
 */
public class Struct_fddc_019 {
    /**府邸档次
	 * 1=初级茅庐
	 * 2=普通民居
	 * 3=富户豪宅
	 * 4=奢华宫殿*/
    private int dangci;
    /**元宝消耗*/
    private int[][] xiaohao;
    /**府邸等级条件*/
    private int dengji;
    /**摇钱树倍数
	 * 倍数需要除以100000*/
    private int yqsbs;
    /**天工炉奖池
	 * 倍数需除以100000*/
    private String tgljc;
    /**天工炉消耗
	 * 天工炉积分*/
    private int tglxh;
    /**繁荣度增加*/
    private int frd;
    /**每10分钟增加*/
    private int[][] zengjia;
    /**地图ID*/
    private int dt;
    /**强盗刷新坐标*/
    private int[][] point;
    /**
     * 府邸档次
	 * 1=初级茅庐
	 * 2=普通民居
	 * 3=富户豪宅
	 * 4=奢华宫殿
     */
    public int getDangci() {
        return dangci;
    }
    /**
     * 元宝消耗
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 府邸等级条件
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 摇钱树倍数
	 * 倍数需要除以100000
     */
    public int getYqsbs() {
        return yqsbs;
    }
    /**
     * 天工炉奖池
	 * 倍数需除以100000
     */
    public String getTgljc() {
        return tgljc;
    }
    /**
     * 天工炉消耗
	 * 天工炉积分
     */
    public int getTglxh() {
        return tglxh;
    }
    /**
     * 繁荣度增加
     */
    public int getFrd() {
        return frd;
    }
    /**
     * 每10分钟增加
     */
    public int[][] getZengjia() {
        return zengjia;
    }
    /**
     * 地图ID
     */
    public int getDt() {
        return dt;
    }
    /**
     * 强盗刷新坐标
     */
    public int[][] getPoint() {
        return point;
    }
    public Struct_fddc_019(int dangci,String xiaohao,int dengji,int yqsbs,String tgljc,int tglxh,int frd,String zengjia,int dt,String point) {
        this.dangci = dangci;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.dengji = dengji;
        this.yqsbs = yqsbs;
        this.tgljc = tgljc;
        this.tglxh = tglxh;
        this.frd = frd;
        this.zengjia = ExcelJsonUtils.toObj(zengjia,int[][].class);
        this.dt = dt;
        this.point = ExcelJsonUtils.toObj(point,int[][].class);
    }
}