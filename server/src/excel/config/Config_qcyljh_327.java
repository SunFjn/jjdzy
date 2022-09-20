package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qcyljh_327;
public class Config_qcyljh_327 extends ConfigBase<Struct_qcyljh_327> {
    private static Config_qcyljh_327 ins = null;
    public static Config_qcyljh_327 getIns(){
        if(ins==null){
            ins = new Config_qcyljh_327();
        }
        return ins;
    }
    private Config_qcyljh_327(){
        put(10001,new Struct_qcyljh_327(10001,1,1,30));
        put(10002,new Struct_qcyljh_327(10002,2,1,98));
        put(10003,new Struct_qcyljh_327(10003,3,1,198));
        put(10004,new Struct_qcyljh_327(10004,4,1,488));
        put(20001,new Struct_qcyljh_327(20001,1,2,30));
        put(20002,new Struct_qcyljh_327(20002,2,2,98));
        put(20003,new Struct_qcyljh_327(20003,3,2,198));
        put(20004,new Struct_qcyljh_327(20004,4,2,488));
        put(30001,new Struct_qcyljh_327(30001,4,3,48));
        put(30002,new Struct_qcyljh_327(30002,2,3,98));
        put(30003,new Struct_qcyljh_327(30003,1,3,298));
        put(30004,new Struct_qcyljh_327(30004,3,3,498));
    }
    public void reset(){
        ins = null;
    }
}