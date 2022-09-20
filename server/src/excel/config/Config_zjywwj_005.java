package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zjywwj_005;
public class Config_zjywwj_005 extends ConfigBase<Struct_zjywwj_005> {
    private static Config_zjywwj_005 ins = null;
    public static Config_zjywwj_005 getIns(){
        if(ins==null){
            ins = new Config_zjywwj_005();
        }
        return ins;
    }
    private Config_zjywwj_005(){
        put(1001,new Struct_zjywwj_005(1001,390002,"[[2,30000],[5,30000],[8,40000]]","2019-09-11 00:00:00","2029-10-13 23:59:59"));
        put(1002,new Struct_zjywwj_005(1002,390002,"[[2,30000],[5,30000],[8,40000]]","2019-09-11 00:00:00","2029-10-13 23:59:59"));
        put(1003,new Struct_zjywwj_005(1003,390002,"[[4,25000],[13,25000],[9,25000],[11,25000]]","2019-09-11 00:00:00","2029-10-13 23:59:59"));
        put(1004,new Struct_zjywwj_005(1004,390002,"[[4,25000],[13,25000],[9,25000],[11,25000]]","2019-09-11 00:00:00","2029-10-13 23:59:59"));
        put(1005,new Struct_zjywwj_005(1005,390002,"[[10,25000],[6,25000],[12,25000],[7,25000]]","2019-09-11 00:00:00","2029-10-13 23:59:59"));
        put(1006,new Struct_zjywwj_005(1006,390002,"[[10,25000],[6,25000],[12,25000],[7,25000]]","2019-09-11 00:00:00","2029-10-13 23:59:59"));
        put(2001,new Struct_zjywwj_005(2001,390002,"[[15,50000],[18,50000]]","2019-09-27 00:00:00","2019-09-28 23:59:59"));
    }
    public void reset(){
        ins = null;
    }
}