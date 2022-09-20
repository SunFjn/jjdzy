package excel.struct;
/**
 * H_009_活动表.xlsx
 */
public class Struct_huodong_009 {
    /**序号
	 * 说明:
	 * 
	 * 序号不能重复，线上正在开启时间段内的活动不能针对序号进行修改和删减*/
    private int index;
    /**活动ID
	 * 活动ID说明：
	 * 
	 * 这个ID调用系统开放表对应活动的系统ID*/
    private int id;
    /**期数
	 * 期数说明
	 * 
	 * 1.相同ID的活动不能同时存在相同的期数
	 * 2.如果期数关联奖励，则期数不能超过该活动配置的最大期数上限
	 * 3.如果期数不关联奖励则相同活动期数不重复即可*/
    private int qs;
    /**大活动类型
	 * 大活动的ID：
	 * 对应系统开启表
	 * 
	 * 4501 精彩活动
	 * 4601 超值返利
	 * 4701 全民狂欢*/
    private int type;
    /**活动名称*/
    private String name;
    /**服务器开始时间*/
    private String hstart;
    /**服务器结束时间*/
    private String hend;
    /**是否是合服
	 * 1 是
	 * 0 否*/
    private int hf;
    /**
     * 序号
	 * 说明:
	 * 
	 * 序号不能重复，线上正在开启时间段内的活动不能针对序号进行修改和删减
     */
    public int getIndex() {
        return index;
    }
    /**
     * 活动ID
	 * 活动ID说明：
	 * 
	 * 这个ID调用系统开放表对应活动的系统ID
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * 期数说明
	 * 
	 * 1.相同ID的活动不能同时存在相同的期数
	 * 2.如果期数关联奖励，则期数不能超过该活动配置的最大期数上限
	 * 3.如果期数不关联奖励则相同活动期数不重复即可
     */
    public int getQs() {
        return qs;
    }
    /**
     * 大活动类型
	 * 大活动的ID：
	 * 对应系统开启表
	 * 
	 * 4501 精彩活动
	 * 4601 超值返利
	 * 4701 全民狂欢
     */
    public int getType() {
        return type;
    }
    /**
     * 活动名称
     */
    public String getName() {
        return name;
    }
    /**
     * 服务器开始时间
     */
    public String getHstart() {
        return hstart;
    }
    /**
     * 服务器结束时间
     */
    public String getHend() {
        return hend;
    }
    /**
     * 是否是合服
	 * 1 是
	 * 0 否
     */
    public int getHf() {
        return hf;
    }
    public Struct_huodong_009(int index,int id,int qs,int type,String name,String hstart,String hend,int hf) {
        this.index = index;
        this.id = id;
        this.qs = qs;
        this.type = type;
        this.name = name;
        this.hstart = hstart;
        this.hend = hend;
        this.hf = hf;
    }
}