package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xzbc_023;
public class Config_xzbc_023 extends ConfigBase<Struct_xzbc_023> {
    private static Config_xzbc_023 ins = null;
    public static Config_xzbc_023 getIns(){
        if(ins==null){
            ins = new Config_xzbc_023();
        }
        return ins;
    }
    private Config_xzbc_023(){
        put(1,new Struct_xzbc_023(1,"0"));
        put(2,new Struct_xzbc_023(2,"0"));
        put(3,new Struct_xzbc_023(3,"0"));
        put(4,new Struct_xzbc_023(4,"0"));
        put(5,new Struct_xzbc_023(5,"0"));
        put(6,new Struct_xzbc_023(6,"0"));
        put(7,new Struct_xzbc_023(7,"0"));
        put(8,new Struct_xzbc_023(8,"[[1,410006,5],[1,411001,80]]"));
        put(9,new Struct_xzbc_023(9,"[[1,410007,5],[1,411003,80]]"));
        put(10,new Struct_xzbc_023(10,"[[1,410007,5],[1,400175,100]]"));
        put(11,new Struct_xzbc_023(11,"[[1,410007,8],[1,400175,100]]"));
        put(12,new Struct_xzbc_023(12,"[[1,410007,8],[1,400175,120]]"));
        put(13,new Struct_xzbc_023(13,"[[1,410007,10],[1,400175,120]]"));
        put(14,new Struct_xzbc_023(14,"[[1,410007,10],[1,400175,150]]"));
        put(15,new Struct_xzbc_023(15,"[[1,410051,40],[1,400175,150]]"));
        put(16,new Struct_xzbc_023(16,"[[1,410051,50],[1,400175,180]]"));
        put(17,new Struct_xzbc_023(17,"[[1,410051,60],[1,400175,180]]"));
        put(18,new Struct_xzbc_023(18,"[[1,410051,60],[1,400175,200]]"));
        put(19,new Struct_xzbc_023(19,"[[1,410051,70],[1,400175,200]]"));
        put(20,new Struct_xzbc_023(20,"[[1,410051,80],[1,400175,250]]"));
    }
    public void reset(){
        ins = null;
    }
}