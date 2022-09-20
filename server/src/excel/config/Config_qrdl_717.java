package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qrdl_717;
public class Config_qrdl_717 extends ConfigBase<Struct_qrdl_717> {
    private static Config_qrdl_717 ins = null;
    public static Config_qrdl_717 getIns(){
        if(ins==null){
            ins = new Config_qrdl_717();
        }
        return ins;
    }
    private Config_qrdl_717(){
        put(1,new Struct_qrdl_717(1,"[[3,0,1000000],[1,411001,20],[9,0,100000]]",26001));
        put(2,new Struct_qrdl_717(2,"[[1,432001,1],[1,411003,20],[9,0,100000]]",26002));
        put(3,new Struct_qrdl_717(3,"[[1,400841,1],[1,411008,20],[9,0,100000]]",26003));
        put(4,new Struct_qrdl_717(4,"[[4,0,74888],[1,411007,20],[9,0,100000]]",26004));
        put(5,new Struct_qrdl_717(5,"[[1,400541,1],[1,411005,20],[9,0,100000]]",26005));
        put(6,new Struct_qrdl_717(6,"[[4,0,149888],[1,411002,20],[9,0,100000]]",26006));
        put(7,new Struct_qrdl_717(7,"[[1,431219,1],[1,411004,20],[1,460020,1]]",26007));
    }
    public void reset(){
        ins = null;
    }
}