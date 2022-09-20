package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_019_府邸升级表.xlsx
 */
public class Struct_fdsj_019 {
    /**府邸等级*/
    private int fddj;
    /**属性*/
    private int[][] shuxing;
    /**战力*/
    private int zhanli;
    /**升级消耗*/
    private int[][] xiaohao;
    /**繁荣度条件
	 * 注：繁荣度为达标条件，并非消耗品*/
    private int fanrongdu;
    /**侍女等级上限*/
    private int shinv;
    /**家丁阶数上限*/
    private int jiading;
    /**装饰等级上限
	 * 床，桌子，屏风，梳妆台为装饰
	 * */
    private int zhuangshi;
    /**府邸档次需求*/
    private int dc;
    /**工具等级上限
	 * 天工炉，摇钱树，金库称为工具
	 * */
    private int gj;
    /**
     * 府邸等级
     */
    public int getFddj() {
        return fddj;
    }
    /**
     * 属性
     */
    public int[][] getShuxing() {
        return shuxing;
    }
    /**
     * 战力
     */
    public int getZhanli() {
        return zhanli;
    }
    /**
     * 升级消耗
     */
    public int[][] getXiaohao() {
        return xiaohao;
    }
    /**
     * 繁荣度条件
	 * 注：繁荣度为达标条件，并非消耗品
     */
    public int getFanrongdu() {
        return fanrongdu;
    }
    /**
     * 侍女等级上限
     */
    public int getShinv() {
        return shinv;
    }
    /**
     * 家丁阶数上限
     */
    public int getJiading() {
        return jiading;
    }
    /**
     * 装饰等级上限
	 * 床，桌子，屏风，梳妆台为装饰
	 * 
     */
    public int getZhuangshi() {
        return zhuangshi;
    }
    /**
     * 府邸档次需求
     */
    public int getDc() {
        return dc;
    }
    /**
     * 工具等级上限
	 * 天工炉，摇钱树，金库称为工具
	 * 
     */
    public int getGj() {
        return gj;
    }
    public Struct_fdsj_019(int fddj,String shuxing,int zhanli,String xiaohao,int fanrongdu,int shinv,int jiading,int zhuangshi,int dc,int gj) {
        this.fddj = fddj;
        this.shuxing = ExcelJsonUtils.toObj(shuxing,int[][].class);
        this.zhanli = zhanli;
        this.xiaohao = ExcelJsonUtils.toObj(xiaohao,int[][].class);
        this.fanrongdu = fanrongdu;
        this.shinv = shinv;
        this.jiading = jiading;
        this.zhuangshi = zhuangshi;
        this.dc = dc;
        this.gj = gj;
    }
}