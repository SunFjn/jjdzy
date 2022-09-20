package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tjhb_296;
public class Config_tjhb_296 extends ConfigBase<Struct_tjhb_296> {
    private static Config_tjhb_296 ins = null;
    public static Config_tjhb_296 getIns(){
        if(ins==null){
            ins = new Config_tjhb_296();
        }
        return ins;
    }
    private Config_tjhb_296(){
        put(10,new Struct_tjhb_296(10,6,"[[4,0,10988]]",10));
        put(11,new Struct_tjhb_296(11,30,"[[4,0,12988]]",10));
        put(12,new Struct_tjhb_296(12,98,"[[4,0,34888]]",10));
        put(13,new Struct_tjhb_296(13,188,"[[4,0,49888]]",10));
        put(14,new Struct_tjhb_296(14,328,"[[4,0,69888]]",10));
        put(15,new Struct_tjhb_296(15,648,"[[4,0,144888]]",10));
        put(16,new Struct_tjhb_296(16,998,"[[4,0,194888]]",10));
        put(17,new Struct_tjhb_296(17,1588,"[[4,0,294888]]",10));
        put(18,new Struct_tjhb_296(18,2588,"[[4,0,544888]]",10));
        put(19,new Struct_tjhb_296(19,3588,"[[4,0,544888]]",10));
        put(20,new Struct_tjhb_296(20,250000,"[[4,0,25000]]",10));
        put(21,new Struct_tjhb_296(21,1000000,"[[4,0,70000]]",10));
        put(22,new Struct_tjhb_296(22,2000000,"[[4,0,100000]]",10));
        put(23,new Struct_tjhb_296(23,3500000,"[[4,0,150000]]",10));
        put(24,new Struct_tjhb_296(24,5000000,"[[4,0,150000]]",10));
        put(25,new Struct_tjhb_296(25,7500000,"[[4,0,250000]]",10));
        put(26,new Struct_tjhb_296(26,10000000,"[[4,0,250000]]",10));
        put(27,new Struct_tjhb_296(27,12500000,"[[4,0,250000]]",10));
        put(28,new Struct_tjhb_296(28,15000000,"[[4,0,250000]]",10));
        put(29,new Struct_tjhb_296(29,20000000,"[[4,0,500000]]",10));
        put(30,new Struct_tjhb_296(30,200,"[[4,0,10000]]",10));
        put(31,new Struct_tjhb_296(31,500,"[[4,0,10000]]",10));
        put(32,new Struct_tjhb_296(32,1000,"[[4,0,25000]]",10));
        put(33,new Struct_tjhb_296(33,1500,"[[4,0,25000]]",10));
        put(34,new Struct_tjhb_296(34,2000,"[[4,0,25000]]",10));
        put(40,new Struct_tjhb_296(40,300,"[[4,0,30000]]",10));
        put(41,new Struct_tjhb_296(41,600,"[[4,0,30000]]",10));
        put(42,new Struct_tjhb_296(42,1000,"[[4,0,40000]]",10));
        put(43,new Struct_tjhb_296(43,1500,"[[4,0,50000]]",10));
        put(44,new Struct_tjhb_296(44,2000,"[[4,0,50000]]",10));
    }
    public void reset(){
        ins = null;
    }
}