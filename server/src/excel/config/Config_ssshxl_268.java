package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ssshxl_268;
public class Config_ssshxl_268 extends ConfigBase<Struct_ssshxl_268> {
    private static Config_ssshxl_268 ins = null;
    public static Config_ssshxl_268 getIns(){
        if(ins==null){
            ins = new Config_ssshxl_268();
        }
        return ins;
    }
    private Config_ssshxl_268(){
        put(1,new Struct_ssshxl_268(1,5,"[[1,410058,5]]"));
        put(2,new Struct_ssshxl_268(2,10,"[[1,410058,5]]"));
        put(3,new Struct_ssshxl_268(3,20,"[[1,410058,10]]"));
        put(4,new Struct_ssshxl_268(4,50,"[[1,410058,10],[1,410051,2],[1,410053,1]]"));
        put(5,new Struct_ssshxl_268(5,100,"[[1,410058,15],[1,410051,2],[1,410053,1]]"));
        put(6,new Struct_ssshxl_268(6,200,"[[1,410058,15],[1,410051,3],[1,410053,1]]"));
        put(7,new Struct_ssshxl_268(7,300,"[[1,410058,20],[1,410051,3],[1,410053,2]]"));
        put(8,new Struct_ssshxl_268(8,400,"[[1,410058,20],[1,410051,5],[1,410053,2]]"));
        put(9,new Struct_ssshxl_268(9,500,"[[1,410058,30],[1,410051,5],[1,410053,2]]"));
        put(10,new Struct_ssshxl_268(10,700,"[[1,410058,30],[1,410051,8],[1,410053,3]]"));
        put(11,new Struct_ssshxl_268(11,1000,"[[1,410058,50],[1,410051,8],[1,400917,1]]"));
        put(12,new Struct_ssshxl_268(12,1200,"[[1,410058,50],[1,410051,10],[1,400917,1]]"));
        put(13,new Struct_ssshxl_268(13,1500,"[[1,410058,70],[1,410051,10]]"));
        put(14,new Struct_ssshxl_268(14,1800,"[[1,410058,70],[1,410051,12],[1,410053,4],[1,400917,1]]"));
        put(15,new Struct_ssshxl_268(15,2000,"[[1,410058,80],[1,410051,12],[1,400917,1]]"));
        put(16,new Struct_ssshxl_268(16,2500,"[[1,410058,80],[1,410051,15],[1,410053,4]]"));
        put(17,new Struct_ssshxl_268(17,3000,"[[1,410058,100],[1,410051,15],[1,400916,1]]"));
        put(18,new Struct_ssshxl_268(18,4000,"[[1,410058,100],[1,410051,20],[1,410053,5]]"));
        put(19,new Struct_ssshxl_268(19,5000,"[[1,410058,100],[1,410051,20],[1,400916,1]]"));
        put(20,new Struct_ssshxl_268(20,6000,"[[1,410058,120],[1,410051,25],[1,410053,5]]"));
        put(21,new Struct_ssshxl_268(21,7000,"[[1,410058,120],[1,410051,25],[1,400916,1]]"));
        put(22,new Struct_ssshxl_268(22,8000,"[[1,410058,120],[1,410051,30],[1,410053,5]]"));
        put(23,new Struct_ssshxl_268(23,9000,"[[1,410058,140],[1,410051,30],[1,400911,1]]"));
        put(24,new Struct_ssshxl_268(24,10000,"[[1,410058,140],[1,410051,30],[1,410053,7]]"));
        put(25,new Struct_ssshxl_268(25,11000,"[[1,410058,140],[1,410051,35],[1,400911,1]]"));
        put(26,new Struct_ssshxl_268(26,12000,"[[1,410058,160],[1,410051,35],[1,410053,8]]"));
        put(27,new Struct_ssshxl_268(27,13000,"[[1,410058,200],[1,410051,40],[1,400911,1]]"));
    }
    public void reset(){
        ins = null;
    }
}