package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ewjl_753;
public class Config_ewjl_753 extends ConfigBase<Struct_ewjl_753> {
    private static Config_ewjl_753 ins = null;
    public static Config_ewjl_753 getIns(){
        if(ins==null){
            ins = new Config_ewjl_753();
        }
        return ins;
    }
    private Config_ewjl_753(){
        put(10001,new Struct_ewjl_753(10001,1,1,3,"[[1,400176,20]]"));
        put(10002,new Struct_ewjl_753(10002,1,1,6,"[[1,410086,2]]"));
        put(10003,new Struct_ewjl_753(10003,1,1,9,"[[1,410121,30]]"));
        put(10004,new Struct_ewjl_753(10004,1,2,3,"[[1,400176,20]]"));
        put(10005,new Struct_ewjl_753(10005,1,2,6,"[[1,410086,2]]"));
        put(10006,new Struct_ewjl_753(10006,1,2,9,"[[1,410121,30]]"));
        put(20001,new Struct_ewjl_753(20001,2,1,3,"[[1,400176,20]]"));
        put(20002,new Struct_ewjl_753(20002,2,1,6,"[[1,416063,5]]"));
        put(20003,new Struct_ewjl_753(20003,2,1,9,"[[1,410121,30]]"));
        put(20004,new Struct_ewjl_753(20004,2,2,3,"[[1,400176,20]]"));
        put(20005,new Struct_ewjl_753(20005,2,2,6,"[[1,416063,5]]"));
        put(20006,new Struct_ewjl_753(20006,2,2,9,"[[1,410121,30]]"));
        put(30001,new Struct_ewjl_753(30001,3,1,3,"[[1,400176,20]]"));
        put(30002,new Struct_ewjl_753(30002,3,1,6,"[[1,410086,2]]"));
        put(30003,new Struct_ewjl_753(30003,3,1,9,"[[1,410121,30]]"));
        put(30004,new Struct_ewjl_753(30004,3,2,3,"[[1,400176,20]]"));
        put(30005,new Struct_ewjl_753(30005,3,2,6,"[[1,410086,2]]"));
        put(30006,new Struct_ewjl_753(30006,3,2,9,"[[1,410121,30]]"));
        put(40001,new Struct_ewjl_753(40001,4,1,3,"[[1,400176,20]]"));
        put(40002,new Struct_ewjl_753(40002,4,1,6,"[[1,416063,5]]"));
        put(40003,new Struct_ewjl_753(40003,4,1,9,"[[1,410121,30]]"));
        put(40004,new Struct_ewjl_753(40004,4,2,3,"[[1,400176,20]]"));
        put(40005,new Struct_ewjl_753(40005,4,2,6,"[[1,416063,5]]"));
        put(40006,new Struct_ewjl_753(40006,4,2,9,"[[1,410121,30]]"));
        put(50001,new Struct_ewjl_753(50001,5,1,3,"[[1,400176,20]]"));
        put(50002,new Struct_ewjl_753(50002,5,1,6,"[[1,410086,2]]"));
        put(50003,new Struct_ewjl_753(50003,5,1,9,"[[1,410121,30]]"));
        put(50004,new Struct_ewjl_753(50004,5,2,3,"[[1,400176,20]]"));
        put(50005,new Struct_ewjl_753(50005,5,2,6,"[[1,410086,2]]"));
        put(50006,new Struct_ewjl_753(50006,5,2,9,"[[1,410121,30]]"));
        put(60001,new Struct_ewjl_753(60001,6,1,3,"[[1,400176,20]]"));
        put(60002,new Struct_ewjl_753(60002,6,1,6,"[[1,416063,5]]"));
        put(60003,new Struct_ewjl_753(60003,6,1,9,"[[1,410121,30]]"));
        put(60004,new Struct_ewjl_753(60004,6,2,3,"[[1,400176,20]]"));
        put(60005,new Struct_ewjl_753(60005,6,2,6,"[[1,416063,5]]"));
        put(60006,new Struct_ewjl_753(60006,6,2,9,"[[1,410121,30]]"));
        put(70001,new Struct_ewjl_753(70001,7,1,3,"[[1,400176,20]]"));
        put(70002,new Struct_ewjl_753(70002,7,1,6,"[[1,410086,2]]"));
        put(70003,new Struct_ewjl_753(70003,7,1,9,"[[1,410121,30]]"));
        put(70004,new Struct_ewjl_753(70004,7,2,3,"[[1,400176,20]]"));
        put(70005,new Struct_ewjl_753(70005,7,2,6,"[[1,410086,2]]"));
        put(70006,new Struct_ewjl_753(70006,7,2,9,"[[1,410121,30]]"));
        put(80001,new Struct_ewjl_753(80001,8,1,3,"[[1,400176,20]]"));
        put(80002,new Struct_ewjl_753(80002,8,1,6,"[[1,416063,5]]"));
        put(80003,new Struct_ewjl_753(80003,8,1,9,"[[1,410121,30]]"));
        put(80004,new Struct_ewjl_753(80004,8,2,3,"[[1,400176,20]]"));
        put(80005,new Struct_ewjl_753(80005,8,2,6,"[[1,416063,5]]"));
        put(80006,new Struct_ewjl_753(80006,8,2,9,"[[1,410121,30]]"));
    }
    public void reset(){
        ins = null;
    }
}