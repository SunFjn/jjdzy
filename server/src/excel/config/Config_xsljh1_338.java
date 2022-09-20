package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xsljh1_338;
public class Config_xsljh1_338 extends ConfigBase<Struct_xsljh1_338> {
    private static Config_xsljh1_338 ins = null;
    public static Config_xsljh1_338 getIns(){
        if(ins==null){
            ins = new Config_xsljh1_338();
        }
        return ins;
    }
    private Config_xsljh1_338(){
        put(1,new Struct_xsljh1_338(1,"[[1,402005,1],[4,0,75000]]",403));
        put(2,new Struct_xsljh1_338(2,"[[1,402005,1],[4,0,192000]]",404));
        put(3,new Struct_xsljh1_338(3,"[[1,402005,1],[4,0,75000]]",403));
        put(4,new Struct_xsljh1_338(4,"[[1,402005,1],[4,0,192000]]",404));
        put(5,new Struct_xsljh1_338(5,"[[1,402005,1],[4,0,75000]]",403));
        put(6,new Struct_xsljh1_338(6,"[[1,402005,1],[4,0,192000]]",404));
        put(101,new Struct_xsljh1_338(101,"[[1,431209,1],[4,0,75000]]",401));
        put(201,new Struct_xsljh1_338(201,"[[1,431215,1],[4,0,192000]]",402));
    }
    public void reset(){
        ins = null;
    }
}