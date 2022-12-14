package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_wdtx_260;
public class Config_wdtx_260 extends ConfigBase<Struct_wdtx_260> {
    private static Config_wdtx_260 ins = null;
    public static Config_wdtx_260 getIns(){
        if(ins==null){
            ins = new Config_wdtx_260();
        }
        return ins;
    }
    private Config_wdtx_260(){
        put(1,new Struct_wdtx_260(1,"[[1,400900,1]]","[[1,400899,1],[3,0,120000]]","[[1,400899,1],[3,0,120000]]",1,0,"[[273001,10]]",5,0,380001,60,5));
        put(2,new Struct_wdtx_260(2,"[[1,400900,1]]","[[1,400899,1],[3,0,150000]]","[[1,400899,1],[3,0,150000]]",1,0,"[[273002,10]]",8,0,380002,30,8));
        put(3,new Struct_wdtx_260(3,"[[1,400900,1]]","[[1,400899,1],[3,0,200000]]","[[1,400899,1],[3,0,200000]]",2,10000,"[[273003,10]]",10,0,380003,10,10));
        put(4,new Struct_wdtx_260(4,"[[1,400900,2]]","[[1,400899,1],[3,0,700000]]","[[1,400899,1],[3,0,700000]]",3,20000,"[[273004,10]]",15,0,380004,0,15));
        put(5,new Struct_wdtx_260(5,"[[1,400900,2]]","[[1,400899,2],[3,0,1200000]]","[[1,400899,2],[3,0,1200000]]",4,40000,"[[273005,10]]",20,0,380005,0,20));
        put(6,new Struct_wdtx_260(6,"[[1,400900,2]]","[[1,400899,2],[3,0,1700000]]","[[1,400899,2],[3,0,1700000]]",5,70000,"[[273006,10]]",30,0,380006,0,30));
        put(7,new Struct_wdtx_260(7,"[[1,400900,3]]","[[1,400899,2],[3,0,2200000]]","[[1,400899,2],[3,0,2200000]]",0,100000,"[[273007,1]]",40,0,380007,0,40));
    }
    public void reset(){
        ins = null;
    }
}