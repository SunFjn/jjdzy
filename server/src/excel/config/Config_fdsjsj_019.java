package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fdsjsj_019;
public class Config_fdsjsj_019 extends ConfigBase<Struct_fdsjsj_019> {
    private static Config_fdsjsj_019 ins = null;
    public static Config_fdsjsj_019 getIns(){
        if(ins==null){
            ins = new Config_fdsjsj_019();
        }
        return ins;
    }
    private Config_fdsjsj_019(){
        put(1,new Struct_fdsjsj_019(1,100001,"[[7200,9000]]","[[21,0,30],[22,0,120]]"));
        put(2,new Struct_fdsjsj_019(2,101001,"[[7200,9000]]","[[21,0,30],[22,0,120]]"));
        put(3,new Struct_fdsjsj_019(3,202001,"[[3600,5400]]","[[21,0,30],[22,0,120]]"));
        put(4,new Struct_fdsjsj_019(4,201001,"[[5400,7200]]","[[21,0,30],[22,0,120]]"));
        put(5,new Struct_fdsjsj_019(5,200001,"[[3600,5400]]","[[21,0,30],[22,0,120]]"));
        put(6,new Struct_fdsjsj_019(6,102001,"[[7200,9000]]","[[21,0,30],[22,0,120]]"));
        put(7,new Struct_fdsjsj_019(7,205001,"[[3600,5400]]","[[21,0,30],[22,0,120]]"));
        put(8,new Struct_fdsjsj_019(8,204001,"[[3600,5400]]","[[21,0,30],[22,0,120]]"));
        put(9,new Struct_fdsjsj_019(9,203001,"[[5400,7200]]","[[21,0,30],[22,0,120]]"));
        put(10,new Struct_fdsjsj_019(10,206001,"[[5400,7200]]","[[21,0,30],[22,0,120]]"));
        put(11,new Struct_fdsjsj_019(11,207001,"[[5400,7200]]","[[21,0,30],[22,0,120]]"));
    }
    public void reset(){
        ins = null;
    }
}