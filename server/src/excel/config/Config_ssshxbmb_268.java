package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_ssshxbmb_268;
public class Config_ssshxbmb_268 extends ConfigBase<Struct_ssshxbmb_268> {
    private static Config_ssshxbmb_268 ins = null;
    public static Config_ssshxbmb_268 getIns(){
        if(ins==null){
            ins = new Config_ssshxbmb_268();
        }
        return ins;
    }
    private Config_ssshxbmb_268(){
        put(1,new Struct_ssshxbmb_268(1,1,"[[1,410049,5]]"));
        put(2,new Struct_ssshxbmb_268(2,3,"[[1,410049,10],[1,410053,1]]"));
        put(3,new Struct_ssshxbmb_268(3,5,"[[1,410049,10],[1,410053,2]]"));
        put(4,new Struct_ssshxbmb_268(4,10,"[[1,410049,15],[1,410050,1],[1,410053,3],[1,400918,1]]"));
        put(5,new Struct_ssshxbmb_268(5,15,"[[1,410049,15],[1,410050,1],[1,410053,3]]"));
        put(6,new Struct_ssshxbmb_268(6,20,"[[1,410049,20],[1,410050,2],[1,410053,5],[1,400918,1]]"));
        put(7,new Struct_ssshxbmb_268(7,40,"[[1,410049,25],[1,410050,3],[1,410053,5]]"));
        put(8,new Struct_ssshxbmb_268(8,60,"[[1,410049,30],[1,410050,5],[1,410053,8],[1,400918,2]]"));
        put(9,new Struct_ssshxbmb_268(9,80,"[[1,410049,40],[1,410050,8],[1,410053,10]]"));
        put(10,new Struct_ssshxbmb_268(10,100,"[[1,410049,50],[1,410050,15],[1,410053,15],[1,400917,1]]"));
        put(11,new Struct_ssshxbmb_268(11,120,"[[1,410049,60],[1,410050,15],[1,410053,10]]"));
        put(12,new Struct_ssshxbmb_268(12,140,"[[1,410049,70],[1,410050,20],[1,410053,10]]"));
        put(13,new Struct_ssshxbmb_268(13,160,"[[1,410049,70],[1,410050,20],[1,410053,10]]"));
        put(14,new Struct_ssshxbmb_268(14,180,"[[1,410049,80],[1,410050,30],[1,410053,10]]"));
        put(15,new Struct_ssshxbmb_268(15,200,"[[1,410049,100],[1,410050,50],[1,410053,20],[1,400917,1]]"));
        put(16,new Struct_ssshxbmb_268(16,220,"[[1,410049,130],[1,410050,50],[1,410053,12]]"));
        put(17,new Struct_ssshxbmb_268(17,240,"[[1,410049,150],[1,410050,60],[1,410053,12]]"));
        put(18,new Struct_ssshxbmb_268(18,260,"[[1,410049,200],[1,410050,80],[1,410053,12]]"));
        put(19,new Struct_ssshxbmb_268(19,280,"[[1,410049,250],[1,410050,80],[1,410053,12]]"));
        put(20,new Struct_ssshxbmb_268(20,300,"[[1,410049,320],[1,410050,100],[1,410053,20],[1,400917,2]]"));
    }
    public void reset(){
        ins = null;
    }
}