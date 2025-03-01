(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("form");
            this.set_titletext("실기관리");
            if (Form == this.constructor)
            {
                this._setFormPosition(1640,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_input", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PYEONIP_YYYY\" type=\"STRING\" size=\"256\"/><Column id=\"JUYA_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_MOJIP_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_HAKNYEON\" type=\"STRING\" size=\"256\"/><Column id=\"MYEONJEOP_YN\" type=\"STRING\" size=\"256\"/><Column id=\"SILGI_YN\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row><Col id=\"MYEONJEOP_YN\">N</Col><Col id=\"SILGI_YN\">Y</Col></Row></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMaster", this);
            obj.set_enableevent("true");
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_preload("true");
            obj.set_updatecontrol("true");
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"CHK\" type=\"STRING\" size=\"1\"/><Column id=\"PYEONIP_YYYY\" type=\"STRING\" size=\"4\"/><Column id=\"PYEONIP_MOJIP_GBCD\" type=\"STRING\" size=\"10\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"10\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"256\"/><Column id=\"ORIGIN_JEONGONG_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JUYA_GBCD\" type=\"STRING\" size=\"10\"/><Column id=\"PYEONIP_HAKNYEON\" type=\"STRING\" size=\"256\"/><Column id=\"CHAEJEOM_GBCD\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_gijunYyyy", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"YYYY\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_Hakgwa", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_SearchJuya", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"JUYA_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"JUYA_GBNM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_SearchHakgwa", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGWA_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_Juya", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_SearchHaknyeon", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PYEONIP_HAKNYEON\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_HAKNYEON_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_SearchMojip", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PYEONIP_MOJIP_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_MOJIP_NM\" type=\"STRING\" size=\"256\"/><Column id=\"HYEONJAE_MOJIP_YN\" type=\"STRING\" size=\"256\"/><Column id=\"JEOPSU_FRDT\" type=\"STRING\" size=\"256\"/><Column id=\"JEOPSU_TODT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsDetail01", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PYEONIP_YYYY\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_MOJIP_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JUYA_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_HAKNYEON\" type=\"STRING\" size=\"256\"/><Column id=\"SILGIHANGMOK_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"ORIGIN_SILGIHANGMOK_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"MAX_JEOMSU\" type=\"STRING\" size=\"256\"/><Column id=\"SORT\" type=\"STRING\" size=\"256\"/><Column id=\"ORIGIN_MYEONJEOPHANGMOK_GBCD\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsDetail02", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PYEONIP_YYYY\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_MOJIP_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JUYA_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_HAKNYEON\" type=\"STRING\" size=\"1\"/><Column id=\"SABEON\" type=\"STRING\" size=\"256\"/><Column id=\"SORT\" type=\"STRING\" size=\"256\"/><Column id=\"SEONGMYEONG\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMyeonjeophangmokGbcd", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_input2", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"PYEONIP_YYYY\" type=\"STRING\" size=\"256\"/><Column id=\"JUYA_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_MOJIP_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"JIWONHAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"PYEONIP_HAKNYEON\" type=\"STRING\" size=\"256\"/><Column id=\"SUHEOM_NO\" type=\"STRING\" size=\"256\"/><Column id=\"SUHEOMSAENG_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsResult1", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"RESULT_CNT\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsChaejeomGbcd", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"256\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_SearchJeongong", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"UP_DEPT_CD\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("divSearch","0","0",null,"42","0",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_cssclass("div_WF_SearchBox");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("stc_01","7","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("6");
            obj.set_text("편입년도");
            obj.set_cssclass("sta_WF_SearchLbl");
            this.divSearch.addChild(obj.name, obj);

            obj = new Spin("spnSearchYYYY","86","9","81","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("0");
            obj.set_cssclass("point");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01","167","0","56","39",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("7");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00","0","0","27","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("8");
            obj.set_text("27");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00","270","1","10","38",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("9");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_02_00","202","9","70","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("10");
            obj.set_text("모집구분");
            obj.set_cssclass("sta_WF_SearchLbl");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchMojip","280","9","110","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("1");
            obj.set_innerdataset("ds_SearchMojip");
            obj.set_codecolumn("PYEONIP_MOJIP_GBCD");
            obj.set_datacolumn("PYEONIP_MOJIP_NM");
            obj.set_cssclass("point");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_00","390","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("11");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_02_00_00","427","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("12");
            obj.set_text("학부/학과");
            obj.set_cssclass("sta_WF_SearchLbl");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00","501","1","10","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("13");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchHakgwa","511","9","120","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("2");
            obj.set_innerdataset("ds_SearchHakgwa");
            obj.set_codecolumn("HAKGWA_CD");
            obj.set_datacolumn("HAKGWA_NM");
            obj.set_cssclass("point");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_00_00","830","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("14");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_02_00_00_00","866","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("15");
            obj.set_text("주야구분");
            obj.set_cssclass("sta_WF_SearchLbl");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchJuya","944","9","90","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("4");
            obj.set_innerdataset("ds_SearchJuya");
            obj.set_codecolumn("JUYA_GBCD");
            obj.set_datacolumn("JUYA_GBNM");
            obj.set_cssclass("point");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00","934","1","10","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("16");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_02_00_00_00_00","1071","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("17");
            obj.set_text("학년");
            obj.set_cssclass("sta_WF_SearchLbl");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_00_00_00","1034","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("18");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00_00","1114","1","10","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("19");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchHaknyeon","1124","9","90","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("5");
            obj.set_innerdataset("ds_SearchHaknyeon");
            obj.set_codecolumn("PYEONIP_HAKNYEON");
            obj.set_datacolumn("PYEONIP_HAKNYEON_NM");
            obj.set_cssclass("point");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00_00_00","710","0","10","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("20");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_01","76","0","10","39",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("21");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_00_00_01","631","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("22");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_02_00_00_00_00_01","667","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("23");
            obj.set_text("전공");
            obj.set_cssclass("sta_WF_SearchLbl");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchJeongong","720","9","110","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("3");
            obj.set_innerdataset("ds_SearchJeongong");
            obj.set_codecolumn("DEPT_CD");
            obj.set_datacolumn("DEPT_NM");
            obj.set_enable("false");
            obj.set_cssclass("point");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_01","0","0","1260","9",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("24");
            obj.set_text("9");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 9pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_01_00","0","31","1260","9",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("25");
            obj.set_text("9");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 9pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_09_00","0","57","115","32",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_text("학부/학과-전공");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Static("staRowCnt","117","57","123","34",null,null,null,null,null,null,this);
            obj.set_taborder("13");
            obj.set_text("[총 <fc v=\'red\'><b v=\'true\'>0 </b></fc>건]");
            obj.set_usedecorate("true");
            this.addChild(obj.name, obj);

            obj = new Grid("grdMaster","0","87","649",null,null,"0",null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_binddataset("dsMaster");
            obj.set_autofittype("col");
            obj.set_cellsizingtype("col");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"389\"/><Column size=\"196\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"상태\"/><Cell col=\"1\" text=\"전공명\"/><Cell col=\"2\" text=\"채점기준\"/></Band><Band id=\"body\"><Cell expr=\"expr:(dataset.getRowType(currow)) == &apos;2&apos; ? &apos;+&apos;:(dataset.getRowType(currow)) == &apos;4&apos; ? &apos;U&apos;:currow+1\"/><Cell col=\"1\" text=\"bind:JEONGONG_CD\" displaytype=\"combotext\" combodataset=\"ds_jeongongCd\" combocodecol=\"DEPT_CD\" combodatacol=\"DEPT_NM\" expr=\"expr:JEONGONG_CD != &quot;&quot; ? &quot;combocontrol&quot; : &quot;none&quot;\"/><Cell col=\"2\" text=\"bind:CHAEJEOM_GBCD\" combodataset=\"dsChaejeomGbcd\" combocodecol=\"CODE\" combodatacol=\"CODE_NM\" displaytype=\"expr:CHAEJEOM_GBCD != &quot;&quot; ? &quot;combocontrol&quot; : &quot;none&quot;\" edittype=\"combo\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stc_09_00_00","678","57","155","32",null,null,null,null,null,null,this);
            obj.set_taborder("14");
            obj.set_text("실기 채점 기준표");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Button("btnNew1","1450","54",null,"25","130",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave1","1515","54",null,"25","65",null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnDel1","1580","54",null,"25","0",null,null,null,null,null,this);
            obj.set_taborder("6");
            obj.set_text("삭제");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnNew2","1450","360",null,"25","130",null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("신규");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnSave2","1515","360",null,"25","65",null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_text("저장");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnDel2","1580","360",null,"25","0",null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("삭제");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Grid("grdDetail01","679","87",null,"260","0",null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_binddataset("dsDetail01");
            obj.set_autofittype("col");
            obj.set_cellsizingtype("col");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"150\"/><Column size=\"120\"/><Column size=\"45\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"상태\"/><Cell col=\"1\" text=\"실기항목명\"/><Cell col=\"2\" text=\"최대점수\"/><Cell col=\"3\" text=\"순서\"/></Band><Band id=\"body\"><Cell expr=\"expr:(dataset.getRowType(currow)) == &apos;2&apos; ? &apos;+&apos;:(dataset.getRowType(currow)) == &apos;4&apos; ? &apos;U&apos;:currow+1\"/><Cell col=\"1\" text=\"bind:MYEONJEOPHANGMOK_GBCD\" displaytype=\"expr:MYEONJEOPHANGMOK_GBCD != &quot;&quot; ? &quot;combocontrol&quot; : &quot;none&quot;\" edittype=\"combo\" combodataset=\"dsMyeonjeophangmokGbcd\" combocodecol=\"CODE\" combodatacol=\"CODE_NM\"/><Cell col=\"2\" text=\"bind:MAX_JEOMSU\" editmaxlength=\"3\" editinputtype=\"digit\"/><Cell col=\"3\" text=\"bind:SORT\" editmaxlength=\"2\" editinputtype=\"digit\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Grid("grdDetail02","679","392",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_binddataset("dsDetail02");
            obj.set_autofittype("col");
            obj.set_cellsizingtype("col");
            obj.set_autoenter("select");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"48\"/><Column size=\"150\"/><Column size=\"120\"/><Column size=\"45\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell text=\"상태\"/><Cell col=\"1\" text=\"학부/학과\"/><Cell col=\"2\" text=\"교수명\"/><Cell col=\"3\" text=\"순서\"/></Band><Band id=\"body\"><Cell expr=\"expr:(dataset.getRowType(currow)) == &apos;2&apos; ? &apos;+&apos;:(dataset.getRowType(currow)) == &apos;4&apos; ? &apos;U&apos;:currow+1\"/><Cell col=\"1\" text=\"bind:HAKGWA_CD\" displaytype=\"combotext\" combodataset=\"ds_Hakgwa\" combocodecol=\"CODE\" combodatacol=\"CODE_NM\"/><Cell col=\"2\" text=\"bind:SEONGMYEONG\"/><Cell col=\"3\" text=\"bind:SORT\" editmaxlength=\"2\" editinputtype=\"digit\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stc_09_00_00_00","678","363","155","32",null,null,null,null,null,null,this);
            obj.set_taborder("15");
            obj.set_text("실기 담당 교수");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Button("btnDaesangjaNew","424","54","110","25",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("실기대상자 생성");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Button("btnDaesangjaDel","539","54","110","25",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("실기대상자 삭제");
            obj.set_cssclass("btn_WF_Crud");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00","1","79","1630","8",null,null,null,null,null,null,this);
            obj.set_taborder("16");
            obj.set_text("8");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00_00","645","385","950","8",null,null,null,null,null,null,this);
            obj.set_taborder("17");
            obj.set_text("8");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00_01","649","50","30","630",null,null,null,null,null,null,this);
            obj.set_taborder("18");
            obj.set_text("30");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","141","42","100","45",null,null,null,null,null,null,this);
            obj.set_taborder("19");
            obj.set_text("↑\r\n45\r\n↓");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 7pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_00_00","890","347","100","45",null,null,null,null,null,null,this);
            obj.set_taborder("20");
            obj.set_text("↑\r\n45\r\n↓");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 7pt/normal \"Arial\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1640,800,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","divSearch.form.spnSearchYYYY","value","ds_input","PYEONIP_YYYY");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","divSearch.form.cboSearchSeunginSangtae00_00","value","ds_input","HAKGWA_CD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","divSearch.form.cboSearchMojip","value","ds_input","PYEONIP_MOJIP_GBCD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","divSearch.form.cboSearchHakgwa","value","ds_input","HAKGWA_CD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item4","divSearch.form.cboSearchJuya","value","ds_input","JUYA_GBCD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","divSearch.form.cboSearchHaknyeon","value","ds_input","PYEONIP_HAKNYEON");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","divSearch.form.cboSearchJeongong","value","ds_input","JEONGONG_CD");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("data","","dsMaster");
        };
        
        // User Script
        this.registerScript("ET04_1020402_M.xfdl", function() {
        /**********************************************************************
        * FormID(화면   ID명): ET04_1020402_M.xfdl(편입학 실기관리)
        * 작 성         일 명: 박경민
        * 작 성         일 자: 2021/05/07
        * 변 경         일 자:
        * 변 경         자 명:
        * 변경 및 수정 로그 :
        */
        /**********************************************************************
                01. 전처리 공통 함수 선언
        ***********************************************************************/
        /**********************************************************************
                02. 폼 변수 정의
        ***********************************************************************/
        this.lvchkColidDs   = "PYEONIP_YYYY$PYEONIP_MOJIP_GBCD$JIWONHAKGWA_CD$JUYA_GBCD$PYEONIP_HAKNYEON";                        // 필수 입력사항 칼럼ID  예)  "commSmcd$commName"
        this.lvchkColNameDs = "편입 년도$편입모집구분코드$지원학과$주야구분$학년";
        /**********************************************************************
                03. 폼 로드 및 닫을때(폼이 포커스 갈때)
        ***********************************************************************/
        /**
         * 기능 : 폼 로드 완료후 초기값 Setting
         */
        this.form_onload = function(obj,e)
        {
        	//폼에 공통으로 로드시 사용하는 함수.
            this.gfn_formOnload(obj.e);
            //사용자 화면  초기화 함수
            this.fn_formInit();
        };

        /**********************************************************************
                04. 공통 코드 및 콤보 데이타 조회
        ***********************************************************************/
        this.fn_formInit = function()
        {
            var strDs    = "ds_Hakgwa|ds_Juya|dsMyeonjeophangmokGbcd|dsChaejeomGbcd";                    // 데이터를 받을 데이터셋리스트     예) "DS_CODE01|DS_CODE02|DS_CODE03"
            var strLgcd  = "01029|00003|01018|01019";                           // 공통코드 중분류 코드, 데이터셋 개수와 같아야 한다. 예) "Z01|Z02|Z03"
            var strComb  = "X|X|X|X";                                   // 콤보옵션 (T:전체, S:선택, N:공백, X:해당사항없음)
            var strOptn  = "";                                      // 조건문 " AND COMM_IT02 = '" + vip + "'|||";
            var svcId    = "Init";

                // gfn_CmmnMultiComboLoad(데이터셋 리스트, 대분류코드 , 콤보 옵션);
                // 서비스 ID : 코드 조회 실행 후 CALLBACK 함수 지정.

            this.gfn_CmmnMultiComboLoad(strDs
                                      , strLgcd
                                      , strComb
                                      , strOptn
                                      , svcId);

        	this.fn_SearchJeongong();
        	this.fn_GijunYyyy();
        };
        /**
         * 기능 : 콜백함수(후처리)
         */
        this.fn_callBack = function(sSvcId,nErrorCode, sErrorMsg)
        {

            this.gfn_clearSortAll(this.grdMaster);
            if(nErrorCode != 0)
            {
                this.gfn_alert(sErrorMsg,"에러정보","","error");
                return false;
            }else
            {
                /*sSvcId (Transaction Id)*/
                switch(sSvcId)
                {
                    case "GijunYyyy":
                            this.fn_PostGijunYyyy();
                        break;
        			case "SearchMojip":
                            this.fn_PostSearchMojip();
                        break;
        			case "SearchHakgwa":
                            this.fn_PostSearchHakgwa();
                        break;
        			case "SearchJeongong":
                            this.fn_PostSearchJeongong();
                        break;
        			case "SearchJuya":
                            this.fn_PostSearchJuya();
                        break;
        			case "SearchHaknyeon":
                            this.fn_PostSearchHaknyeon();
                        break;
                    case "Ret":
                            this.fn_PostRet();
                        break;
                    case "Save":
                            this.fn_PostSave();
                        break;
                    case "New":
                            this.fn_PostNew();
                        break;
                    case "Del":
                            this.fn_PostDel();
                        break;
        			case "DRet":
        					this.fn_PostDRet();
        				break;
        			case "ET04_1020402_M_04_02":
        					this.gfn_alert("저장에 성공하였습니다.","저장정보","","information");
        				break;
        			case "ET04_1020402_M_04_03":
        					this.gfn_alert("저장에 성공하였습니다.","저장정보","","information");
        				break;
        			case "ET04_1020402_M_01_P":
        					this.gfn_alert("면접대상자 생성에 성공하였습니다.","저장정보","","information");
        					this.fn_Ret();
        			    break;
        			case "ET04_1020402_M_02_P":
        					this.gfn_alert("면접대상자 삭제에 성공하였습니다.","저장정보","","information");
        					this.fn_Ret();
        			    break;
                    default:
                        break;
                }
            }
        };

        //Popup callback영역
        this.fn_popupCallback = function(strId, strVal)
        {
        	switch(strId)
        	{
        		case "EN01_1010106_T04P":
        			var sRtn = strVal.split(",");
        			if(sRtn[0] != "CLOSE")
        			{
        				if (this.gfn_isNull(sRtn[0])) {
        					this.gfn_alert("면접담당교수를 선택하세요.","선택정보","","question");
        					return;
        				}
        				var maxVal = 0;
        				for(var i = 0 ; i < this.dsDetail02.rowcount; i ++){
        					if(this.dsDetail02.getColumn(i, "SORT") > maxVal){
        						maxVal = this.dsDetail02.getColumn(i, "SORT");
        						maxVal = parseInt(maxVal);
        					}
        				}
        				var nRow = this.dsDetail02.addRow();
        				this.dsDetail02.setColumn(nRow, "PYEONIP_YYYY", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_YYYY"));
        				this.dsDetail02.setColumn(nRow, "PYEONIP_MOJIP_GBCD", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_MOJIP_GBCD"));
        				this.dsDetail02.setColumn(nRow, "HAKGWA_CD", this.dsMaster.getColumn(this.dsMaster.rowposition, "HAKGWA_CD"));
        				this.dsDetail02.setColumn(nRow, "JUYA_GBCD", this.dsMaster.getColumn(this.dsMaster.rowposition, "JUYA_GBCD"));
        				this.dsDetail02.setColumn(nRow, "PYEONIP_HAKNYEON"	, this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_HAKNYEON"));
        				this.dsDetail02.setColumn(nRow, "SORT", maxVal + 1);
        				this.dsDetail02.setColumn(nRow, "SEONGMYEONG",sRtn[1]);
        				this.dsDetail02.setColumn(nRow, "SABEON",sRtn[0]);
        			}
        			break;
        		default	:
        			break;
        	}
        }
        /************************************************************************************************;
         * 공통 버튼 호출 영역(공통버튼 사용에만사용);
         ************************************************************************************************/;
        /*;
         * _gfn_btnClick여기서 호출시 버튼을 클릭처릭(개인폼에 모든스크립터 복사함);
         */;
        this.fn_cmmBtnClick = function(sBtn)
        {
            switch(sBtn)
            {
                case "ret" :        // 조회
                        this.fn_Ret();
                    break;
                case "new" :         // 신규
                        this.fn_New();
                    break;
                case "del" :         // 삭제
                        this.fn_Del();
                    break;
                case "save" :        // 저장
                        this.fn_Save();
                    break;
                case "excel" :       // 엑셀
                        this.fn_Excel();
                    break;
                case "print" :       // 출력
                         this.fn_Print();
                    break;
                case "confirm" :     // 확정
                         this.fn_Confirm();
                    break;
                case "tmp1" :        // 팁
                         this.fn_Tip();
                    break;
        		case "tmp2" :        // 수험표 출력
                         this.fn_PrintSuheompyo();
                    break;
        		case "tmp3" :        // 면접확인대장 출력
                         this.fn_PrintMyeonjeop();
                    break;
                default :
                    break;
            };
        };

        /**********************************************************************
                05. 조회 함수 선언(마스터 함수)
        ***********************************************************************/
        /**
         * 기능 : 조회 전 실행
         */
        this.fn_PreRet = function()
        {
            // 조회조건 셋팅
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "PYEONIP_YYYY")))
        	{
        		this.gfn_alert("편입년도를 입력해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "PYEONIP_MOJIP_GBCD")))
        	{
        		this.gfn_alert("모집구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "HAKGWA_CD")))
        	{
        		this.gfn_alert("학과를 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "JUYA_GBCD")))
        	{
        		this.gfn_alert("주야구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "PYEONIP_HAKNYEON")))
        	{
        		this.gfn_alert("학년을 선택해주세요.","입력정보","","warning");
        		return false;
        	}

        	if(this.fn_beforeclose())
        	{
        		var result = this.gfn_confirm( "변경된 데이터가 있습니다. 그래도 이동하시겠습니까?", "저장","", "question" );
        		if(result == 0)
        		{
        			return false;
        		}
        	}
            return true;
        };

        /**
         * 기능 : 마스터 조회 실행
         */
        this.fn_Ret = function()
        {
            if(!this.fn_PreRet())
            {
                return false;
            }
            var strSvc      = "Ret";
            var strUrl      = "/prj/ET/ET04/Retrieve_1020402_M_01.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //생략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        /**
         * 기능 : 조회 후 실행
         */
        this.fn_PostRet = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                05-1. 조회 함수 선언(디테일 함수)
        ***********************************************************************/
        this.dsMaster_onrowposchanged = function(obj,e)
        {
        	this.ds_input2.setColumn(0, "PYEONIP_YYYY", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_YYYY"));
        	this.ds_input2.setColumn(0, "PYEONIP_MOJIP_GBCD", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_MOJIP_GBCD"));
        	this.ds_input2.setColumn(0, "HAKGWA_CD", this.dsMaster.getColumn(this.dsMaster.rowposition, "HAKGWA_CD"));
        	this.ds_input2.setColumn(0, "JUYA_GBCD", this.dsMaster.getColumn(this.dsMaster.rowposition, "JUYA_GBCD"));
        	this.ds_input2.setColumn(0, "PYEONIP_HAKNYEON", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_HAKNYEON"));

        	this.fn_DRet();
        };

        /**
         * 기능 : 마스터 조회 실행
         */
        this.fn_DRet = function()
        {

        	//편입학 실기항목 조회
        	var strSvc      = "";
            var strUrl      = "/prj/ET/ET04/Retrieve_1020402_M_02.do";
            var strInDs     = "ds_input=ds_input2";
            var strOutDs    = "dsDetail01=dsDetail01";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = false;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);

        	//편입학 실기교수 조회
        	var strSvc      = "";
            var strUrl      = "/prj/ET/ET04/Retrieve_1020402_M_03.do";
            var strInDs     = "ds_input=ds_input2";
            var strOutDs    = "dsDetail02=dsDetail02";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = false;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);

        	//편입학 면접대상자생성여부 조회
        	var strSvc      = "DRet";
            var strUrl      = "/prj/ET/ET04/Retrieve_1020402_M_04.do";
            var strInDs     = "ds_input=ds_input2";
            var strOutDs    = "dsResult1=dsResult1";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        /**
         * 기능 : 조회 후 실행
         */
        this.fn_PostDRet = function()
        {
            var resultCnt = this.dsResult1.getColumn(0, "RESULT_CNT");
        	if(  parseInt(resultCnt) > 0  )
        	{
        		this.btnNew1.set_visible(false);
        		this.btnSave1.set_visible(false);
        		this.btnDel1.set_visible(false);
        		this.grdDetail01.setCellProperty( "body", 1, "displaytype", "combotext" );
        		this.grdDetail01.setCellProperty( "body", 1, "edittype", "none" );
        		this.grdDetail01.setCellProperty( "body", 2, "edittype", "none" );
        		this.grdDetail01.setCellProperty( "body", 3, "edittype", "none" );
        		this.btnNew2.set_visible(false);
        		this.btnSave2.set_visible(false);
        		this.btnDel2.set_visible(false);
        		this.grdDetail02.setCellProperty( "body", 3, "edittype", "none" );
        	}
        	else
        	{
        		this.btnNew1.set_visible(true);
        		this.btnSave1.set_visible(true);
        		this.btnDel1.set_visible(true);
        		this.grdDetail01.setCellProperty( "body", 1, "edittype", "combo" );
        		this.grdDetail01.setCellProperty( "body", 2, "edittype", "text" );
        		this.grdDetail01.setCellProperty( "body", 3, "edittype", "text" );
        		this.btnNew2.set_visible(true);
        		this.btnSave2.set_visible(true);
        		this.btnDel2.set_visible(true);
        		this.grdDetail02.setCellProperty( "body", 3, "edittype", "text" );
        	}
        };

        /**********************************************************************
                06. 추가 함수 선언
        ***********************************************************************/
        /**
         * 기능 : 추가 전 실행(기본체크사항)
         */
        this.fn_PreNew = function()
        {
        	var pyeonipYyyy 		= this.ds_input.getColumn(0, "PYEONIP_YYYY");
        	var mojipGbcd 			= this.ds_input.getColumn(0, "PYEONIP_MOJIP_GBCD");
        	var hakgwaCd 			= this.ds_input.getColumn(0, "HAKGWA_CD");
        	var juyaGbcd 			= this.ds_input.getColumn(0, "JUYA_GBCD");
        	var pyeonipHaknyeon     = this.ds_input.getColumn(0, "PYEONIP_HAKNYEON");

        	if (this.gfn_isNull(pyeonipYyyy))
        	{
        		this.gfn_alert("편입년도를 입력해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(mojipGbcd))
        	{
        		this.gfn_alert("모집구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(hakgwaCd))
        	{
        		this.gfn_alert("학과를 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(pyeonipHaknyeon))
        	{
        		this.gfn_alert("학년을 선택해주세요.","입력정보","","warning");
        		return false;
        	}

            return true;
        };

        /**
         * 기능 : 마스터 추가 실행
         */
        this.fn_New = function()
        {
            if(!this.fn_PreNew())
            {
                return false;
            }
        	var nRow = this.dsMaster.addRow();
        	this.dsMaster.setColumn(nRow, "PYEONIP_YYYY", this.ds_input.getColumn(0, "PYEONIP_YYYY"));
        	this.dsMaster.setColumn(nRow, "PYEONIP_MOJIP_GBCD", this.ds_input.getColumn(0, "PYEONIP_MOJIP_GBCD"));
        	this.dsMaster.setColumn(nRow, "HAKGWA_CD", this.ds_input.getColumn(0, "HAKGWA_CD"));
        	this.dsMaster.setColumn(nRow, "JUYA_GBCD", this.ds_input.getColumn(0, "JUYA_GBCD"));
        	this.dsMaster.setColumn(nRow, "PYEONIP_HAKNYEON", this.ds_input.getColumn(0, "PYEONIP_HAKNYEON"));
        };

        /**********************************************************************
                06-1. 실기채점기준표 추가 함수 선언
        ***********************************************************************/
        this.btnNew1_onclick = function(obj,e)
        {
        	if (this.dsMaster.rowposition == -1)
        	{
        		this.gfn_alert("추가할 학과를 선택해주세요.", "", "");
        	}
        	else if (this.dsMaster.getRowType(this.dsMaster.rowposition) == "2" || this.dsMaster.getRowType(this.dsMaster.rowposition) == "4")
        	{
        		this.gfn_alert("선택된 전공을 저장한 이후에 추가해주세요.", "", "");
        	}
        	else
        	{
        		var maxVal = 0;
        		for(var i = 0 ; i < this.dsDetail01.rowcount; i ++)
        		{
        			if(this.dsDetail01.getColumn(i, "SORT") > maxVal)
        			{
        				maxVal = this.dsDetail01.getColumn(i, "SORT");
        				maxVal = parseInt(maxVal);
        			}
        		}
        		this.dsDetail01.addRow();
        		this.dsDetail01.setColumn(this.dsDetail01.rowposition, "PYEONIP_YYYY", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_YYYY"));
        		this.dsDetail01.setColumn(this.dsDetail01.rowposition, "PYEONIP_MOJIP_GBCD", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_MOJIP_GBCD"));
        		this.dsDetail01.setColumn(this.dsDetail01.rowposition, "HAKGWA_CD", this.dsMaster.getColumn(this.dsMaster.rowposition, "HAKGWA_CD"));
        		this.dsDetail01.setColumn(this.dsDetail01.rowposition, "JUYA_GBCD", this.dsMaster.getColumn(this.dsMaster.rowposition, "JUYA_GBCD"));
        		this.dsDetail01.setColumn(this.dsDetail01.rowposition, "PYEONIP_HAKNYEON", this.dsMaster.getColumn(this.dsMaster.rowposition, "PYEONIP_HAKNYEON"));
        		this.dsDetail01.setColumn(this.dsDetail01.rowposition, "SORT", maxVal + 1);
        	}
        };

        /**********************************************************************
                06-2. 실기담당교수 추가 함수 선언
        ***********************************************************************/
        this.btnNew2_onclick = function(obj,e)
        {
        	if (this.dsMaster.rowposition == -1)
        	{
        		this.gfn_alert("추가할 학과를 선택해주세요.", "", "");
        	}
        	else
        	{
        		var oArg = {};
        		var oOption = {};
        		var sPopupCallBack = "fn_popupCallback";
        		this.gfn_openPopup( "EN01_1010106_T04P","EN01::EN01_1010106_T04P.xfdl", oArg,sPopupCallBack,oOption);
        	}
        };

        /**********************************************************************
                07. 삭제 함수 선언
        ***********************************************************************/
        /**
         * 기능 : 삭제 버튼 실행
         */
        this.fn_PreDel = function()
        {
            //멀티삭제용도
            if(this.dsMaster.rowcount < 1)
            {
                this.gfn_alert("삭제할 데이터가 없습니다.","삭제정보","","warning");
                return false;
            }
            var result = this.gfn_confirm( "현재선택행을 삭제하시겠습니까?", "삭제정보","","question" );

            if(result == 0)
            {
                return false;
            }

            //개별삭제시
            this.dsMaster.deleteRow(this.dsMaster.rowposition);
            return true;
        };

        /**
         * 기능 : Row 삭제 또는 Transaction 삭제 처리
         */
        this.fn_Del = function()
        {
            if(!this.fn_PreDel())
            {
                return false;
            }
            var strSvc      = "Del";
            var strUrl      = "/prj/ET/ET04/Delete_1020402_M_01.do";
            var strInDs     = "dsMaster=dsMaster:u";
            var strOutDs    = "";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        this.fn_PostDel = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                07-1. 실기채점기준표 삭제 함수 선언
        ***********************************************************************/
        this.btnDel1_onclick = function(obj,e)
        {
        	if (this.dsDetail01.rowposition == -1)
        	{
        		alert("삭제할 면접항목을 선택해주세요.");
        	}
        	else
        	{
        		this.dsDetail01.deleteRow(this.dsDetail01.rowposition);
        	}
        };

        /**********************************************************************
                07-2. 실기담당교수 삭제 함수 선언
        ***********************************************************************/
        this.btnDel2_onclick = function(obj,e)
        {
        	if (this.dsDetail02.rowposition == -1)
        	{
        		this.gfn_alert("삭제할 교수를 선택해주세요.", "", "");
        	}
        	else
        	{
        		this.dsDetail02.deleteRow(this.dsDetail02.rowposition);
        	}
        };

        /**********************************************************************
                08. 저장 함수 선언
        ***********************************************************************/
        /**
         * 기능 : 저장 전 실행
         */
        this.fn_PreSave = function()
        {
            if(this.dsMaster.rowcount > 0)
            {
                for(var i=0;i<this.dsMaster.rowcount; i++)
                {
                    if(this.dsMaster.getColumn(i,"CHK") == "0")
                    {
                        continue;
                    }
                    this.dsMaster.setColumn(i,"CHK","0");
                }
            }

            if(!this.gfn_isUpdate(this.dsMaster))
            {
                this.gfn_alert("변경된 이력이 없습니다.","저장정보","","question");
                return false;
            }

            // 필수 입력사항 체크 =>grid 필수항목체크할거냐:true,일반 컴포넌트에 필수항목을 할거냐false)
            var chkFocusFlg = true;
            var result      = this.gfn_cmmnChkEssentialItem(this.dsMaster, this.lvchkColidDs, this.lvchkColNameDs, this.grdMaster, chkFocusFlg, this);

            if (result[0] != "success")
            {
                this.gfn_alert(result[0],"저장정보","","question");
                this.dsMaster.set_rowposition(result[1]); //데이터셋 변경
                return false;
             }

        	 var r = new Array();
        	 //중복 데이터 체크
        	 for(var i = 0 ; i < this.dsMaster.rowcount ; i++)
        	 {
        		var JEONGONG_CD = this.dsMaster.getColumn(i, "JEONGONG_CD");
        		r.push(JEONGONG_CD);
        	 }

        	 if(this.fn_Unique(r) != 0)
        	 {
        		this.gfn_alert("저장된 데이터가 존재합니다.", "", "");
        		return false;
        	 }

             var result = this.gfn_confirm( "저장 하시겠습니까?", "저장","", "question" );
             if(result == 0)
             {
                 return false;
             }
             return true;
        };

        /**
         * 기능 : 저장 실행
         */
        this.fn_Save = function()
        {
            if(!this.fn_PreSave())
            {
                return false;
            }
            var strSvc      = "Save";
            var strUrl      = "/prj/ET/ET04/Save_1020402_M_01.do";
            var strInDs     = "ds_input=ds_input:a ";
                strInDs    += "dsMaster=dsMaster:u";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };
        /**
         *      기능 : 저장시 후처리
         */
        this.fn_PostSave = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                08-1. 실기채점기준표 저장 함수 선언
        ***********************************************************************/
        this.btnSave1_onclick = function(obj,e)
        {
        	// 면접항목에 변경사항이 있는 경우에 저장 처리
        	if(this.gfn_isUpdate(this.dsDetail01))
        	{
        		// 필수 입력사항 체크 =>grid 필수항목체크할거냐:true,일반 컴포넌트에 필수항목을 할거냐false)
        		var chkFocusFlg = true;
        		var lvchkColidDs1 = "MYEONJEOPHANGMOK_GBCD$MAX_JEOMSU$SORT";
        		var lvchkColNameDs1 = "면접항목명$최대점수$순서";
        		var result      = this.gfn_cmmnChkEssentialItem(this.dsDetail01, lvchkColidDs1, lvchkColNameDs1, this.grdDetail01, chkFocusFlg, this);
        		if (result[0] != "success")
        		{
        			this.gfn_alert(result[0],"저장정보","","question");
        			return;
        		}

        		var r = new Array();
        		//중복 데이터 체크
        		for(var i = 0 ; i < this.dsDetail01.rowcount ; i++){
        			 var MYEONJEOPHANGMOK_GBCD = this.dsDetail01.getColumn(i, "MYEONJEOPHANGMOK_GBCD");
        			 r.push(MYEONJEOPHANGMOK_GBCD);
        		}

        		if(this.fn_Unique(r) == 0)
        		{
        			if (this.gfn_confirm( "저장하시겠습니까?", "저장정보","","question" ))
        			{
        				var strSvc      = "ET04_1020402_M_04_02";
        				var strUrl      = "/prj/ET/ET04/Save_1020402_M_02.do";
        				var strInDs     = "ds_input=ds_input:a ";
        					strInDs    += "dsDetail01=dsDetail01:u";
        				var strOutDs    = "";
        				var strArg      = "";
        				var GBV_MENUID    = objApp.gv_cutPrgId;
        				if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
        				{
        					strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
        				}
        				var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
        				var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
        				this.gfn_Transaction(strSvc
        								   , strUrl
        								   , strInDs
        								   , strOutDs
        								   , strArg
        								   , strCallBack
        								   , strASync);
        			}
        		}
        		else
        		{
        			this.gfn_alert("저장된 데이터가 존재합니다.", "", "");
        		}
        	}
        	else
        	{
        		this.gfn_alert("변경된 이력이 없습니다.","저장정보","","question");
        	}
        };

        /**********************************************************************
                08-2. 실기담당교수 저장 함수 선언
        ***********************************************************************/
        this.btnSave2_onclick = function(obj,e)
        {
        	if(this.gfn_isUpdate(this.dsDetail02))
        	{
        		// 필수 입력사항 체크 =>grid 필수항목체크할거냐:true,일반 컴포넌트에 필수항목을 할거냐false)
        		var chkFocusFlg = true;
        		var lvchkColidDs1 = "HAKGWA_CD$SEONGMYEONG$SORT";
        		var lvchkColNameDs1 = "학부/학과$성명$순서";
        		var result      = this.gfn_cmmnChkEssentialItem(this.dsDetail02, lvchkColidDs1, lvchkColNameDs1, this.grdDetail02, chkFocusFlg, this);
        		if (result[0] != "success")
        		{
        			this.gfn_alert(result[0],"저장정보","","question");
        			this.dsMaster.set_rowposition(result[1]); //데이터셋 변경
        			return false;
        		}

        		var r = new Array();
        		//중복 데이터 체크
        		for(var i = 0 ; i < this.dsDetail02.rowcount ; i++)
        		{
        			 var SABEON = this.dsDetail02.getColumn(i, "SABEON");
        			 r.push(SABEON);
        		}

        		if(this.fn_Unique(r) == 0)
        		{
        			if (this.gfn_confirm( "저장하시겠습니까?", "저장정보","","question" ))
        			{
        				var strSvc      = "ET04_1020402_M_04_03";
        				var strUrl      = "/prj/ET/ET04/Save_1020402_M_03.do";
        				var strInDs     = "ds_input=ds_input:a ";
        					strInDs    += "dsDetail02=dsDetail02:u";
        				var strOutDs    = "";
        				var strArg      = "";
        				var GBV_MENUID    = objApp.gv_cutPrgId;
        				if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
        				{
        					strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
        				}
        				var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
        				var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
        				this.gfn_Transaction(strSvc
        								   , strUrl
        								   , strInDs
        								   , strOutDs
        								   , strArg
        								   , strCallBack
        								   , strASync);
        			}
        		}
        		else
        		{
        			this.gfn_alert("저장된 데이터가 존재합니다.", "", "");
        		}
        	}
        	else
        	{
        		this.gfn_alert("변경된 이력이 없습니다.","저장정보","","question");
        	}
        };

        /**********************************************************************
                09-1. 실기대상자 생성 함수 선언
        ***********************************************************************/
        this.btnDaesangjaNew_onclick = function(obj,e)
        {
        	var pyeonipYyyy = this.dsMaster.getColumn( this.dsMaster.rowposition, "PYEONIP_YYYY");
        	var mojipGbcd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "PYEONIP_MOJIP_GBCD");
        	var hakgwaCd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "HAKGWA_CD");
        	var jeongongCd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "JEONGONG_CD");
        	var juyaGbcd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "JUYA_GBCD");
        	var pyeonipHaknyeon = this.dsMaster.getColumn( this.dsMaster.rowposition, "PYEONIP_HAKNYEON");

        	if(hakgwaCd == '1800')
        	{
        		if(pyeonipYyyy == "" || mojipGbcd == "" || jeongongCd == "" || juyaGbcd == "" || pyeonipHaknyeon == "")
        		{
        			this.gfn_alert("검색조건의 항목들을 모두 선택해주세요.", "", "");
        			return;
        		}
        	}
        	else
        	{
        		if(pyeonipYyyy == "" || mojipGbcd == "" || juyaGbcd == "" || pyeonipHaknyeon == "")
        		{
        			this.gfn_alert("검색조건의 항목들을 모두 선택해주세요.", "", "");
        			return;
        		}
        	}

        	// 면접항목의 최대접수의 합이 200인지 체크
        	var rowCount = this.dsDetail01.rowcount;
        	var sum = 0;
        	if(rowCount > 0){
        		for(var i = 0 ; i < rowCount ; i++)
        		{
        			if(this.gfn_isNull(this.dsDetail01.getColumn(i, "MAX_JEOMSU")))
        			{
        				sum += 0;
        			}
        			else
        			{
        				sum += parseInt(this.dsDetail01.getColumn(i, "MAX_JEOMSU"));
        			}
        		}
        	}

        	if (sum != 200)
        	{
        		this.gfn_alert("실기항목의 최대점수의 합계가 200점이 되어야 합니다.", "", "");
        		return;
        	}

        	if (!this.gfn_confirm( "선택된 학과를 기준으로 실기대상자를 생성합니까?", "프로시저","", "question" ))
        	{
        		return false;
        	}

        	var strSvc      = "ET04_1020402_M_01_P";
        	var strUrl      = "/prj/ET/ET04/Save_1020402_M_01_P.do";
        	var strInDs     = "ds_input=ds_input:a";
        	var strOutDs    = "";
        	var strArg      = "";
        	var GBV_MENUID    = objApp.gv_cutPrgId;
        	if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
        	{
        		strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
        	}
        	var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
        	var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
        	this.gfn_Transaction(strSvc
        					   , strUrl
        					   , strInDs
        					   , strOutDs
        					   , strArg
        					   , strCallBack
        					   , strASync);
        };

        /**********************************************************************
                09-1. 실기대상자 삭제 함수 선언
        ***********************************************************************/
        this.btnDaesangjaDel_onclick = function(obj,e)
        {
        	var ipsiYyyy 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "PYEONIP_YYYY");
        	var mojipGbcd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "PYEONIP_MOJIP_GBCD");
        	var hakgwaCd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "HAKGWA_CD");
        	var juyaGbcd 	= this.dsMaster.getColumn( this.dsMaster.rowposition, "JUYA_GBCD");
        	var pyeonipHaknyeon = this.dsMaster.getColumn( this.dsMaster.rowposition, "PYEONIP_HAKNYEON");

        	if (this.gfn_isNull(ipsiYyyy) || this.gfn_isNull(mojipGbcd) || this.gfn_isNull(hakgwaCd) || this.gfn_isNull(juyaGbcd) || this.gfn_isNull(pyeonipHaknyeon))
        	{
        		this.gfn_alert("학부/학과를 선택해주세요.", "", "");
        		return;
        	}

        	if (!this.gfn_confirm( "선택된 학과를 기준으로 실기대상자를 삭제합니까?", "프로시저","", "question" ))
        	{
        		return false;
        	}

        	var strSvc      = "ET04_1020402_M_02_P";
        	var strUrl      = "/prj/ET/ET04/Del_1020402_M_02_P.do";
        	var strInDs     = "ds_input=ds_input:a";
        	var strOutDs    = "";
        	var strArg      = "";
        	var GBV_MENUID    = objApp.gv_cutPrgId;
        	if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
        	{
        		strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
        	}
        	var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
        	var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
        	this.gfn_Transaction(strSvc
        					   , strUrl
        					   , strInDs
        					   , strOutDs
        					   , strArg
        					   , strCallBack
        					   , strASync);
        };

        /**********************************************************************
                10. 팁
        ***********************************************************************/
        this.fn_Tip = function()
        {
        	this.alert("도움말 준비중입니다.");
        };

        /**********************************************************************
                11. 기타 Control Event
        ***********************************************************************/
        /**
         *      그리드멀티 소트정열
         */
        this.grdMaster_onheaddblclick = function(obj,e)
        {
            this.gfn_gridSort(obj,e);
        };
        this.grdDetail01_onheaddblclick = function(obj,e)
        {
        	this.gfn_gridSort(obj,e);
        };
        this.grdDetail02_onheaddblclick = function(obj,e)
        {
            this.gfn_gridSort(obj,e);
        };

        /**
          * 닫을시 사용자가 변경유무를 체크(공통처리)
         **/
        this.fn_beforeclose = function()
        {
           var value = false;

           if(this.gfn_isUpdate(this.dsMaster))
           {
              value = true;
           }
           else if(this.gfn_isUpdate(this.dsDetail01))
           {
              value = true;
           }
           else if(this.gfn_isUpdate(this.dsDetail02))
           {
              value = true;
           }

           return value;
        };

        /**********************************************************************
                12. 출력물
        ***********************************************************************/
        // 수험표 출력
        this.fn_PrintSuheompyo = function()
        {
        	var pyeonipYyyy 		= this.ds_input.getColumn(0, "PYEONIP_YYYY");
        	var mojipGbcd 			= this.ds_input.getColumn(0, "PYEONIP_MOJIP_GBCD");
        	var hakgwaCd 			= this.ds_input.getColumn(0, "HAKGWA_CD");
        	var juyaGbcd 			= this.ds_input.getColumn(0, "JUYA_GBCD");
        	var pyeonipHaknyeon     = this.ds_input.getColumn(0, "PYEONIP_HAKNYEON");

        	if (this.gfn_isNull(pyeonipYyyy))
        	{
        		this.gfn_alert("편입년도를 입력해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(mojipGbcd))
        	{
        		this.gfn_alert("모집구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(hakgwaCd))
        	{
        		this.gfn_alert("학과를 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(juyaGbcd))
        	{
        		this.gfn_alert("주야구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(pyeonipHaknyeon))
        	{
        		this.gfn_alert("학년을 선택해주세요.","입력정보","","warning");
        		return false;
        	}

        	this.gfn_commonUtils_report('ET04/ET04_1020402_M_02.crf', {PYEONIP_YYYY:pyeonipYyyy
        															, MOJIP_GBCD:mojipGbcd
        															, HAKGWA_CD:hakgwaCd
        															, JUYA_GBCD:juyaGbcd
        															, PYEONIP_HAKNYEON:pyeonipHaknyeon});
        };

        // 실기확인대장 출력
        this.fn_PrintMyeonjeop = function()
        {
        	var pyeonipYyyy 		= this.ds_input.getColumn(0, "PYEONIP_YYYY");
        	var mojipGbcd 			= this.ds_input.getColumn(0, "PYEONIP_MOJIP_GBCD");
        	var hakgwaCd 			= this.ds_input.getColumn(0, "HAKGWA_CD");
        	var juyaGbcd 			= this.ds_input.getColumn(0, "JUYA_GBCD");
        	var pyeonipHaknyeon     = this.ds_input.getColumn(0, "PYEONIP_HAKNYEON");

        	if (this.gfn_isNull(pyeonipYyyy))
        	{
        		this.gfn_alert("편입년도를 입력해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(mojipGbcd))
        	{
        		this.gfn_alert("모집구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(hakgwaCd))
        	{
        		this.gfn_alert("학과를 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(juyaGbcd))
        	{
        		this.gfn_alert("주야구분을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(pyeonipHaknyeon))
        	{
        		this.gfn_alert("학년을 선택해주세요.","입력정보","","warning");
        		return false;
        	}

        	this.gfn_commonUtils_report('ET04/ET04_1020402_M_01.crf', {PYEONIP_YYYY:pyeonipYyyy
        															, MOJIP_GBCD:mojipGbcd
        															, HAKGWA_CD:hakgwaCd
        															, JUYA_GBCD:juyaGbcd
        															, PYEONIP_HAKNYEON:pyeonipHaknyeon});
        };

        /**********************************************************************
                13. 공통 함수
        ***********************************************************************/
        // 전공 조회(검색조건)
        this.fn_SearchJeongong = function ()
        {
        	var strSvc      = "SearchJeongong";
            var strUrl      = "/prj/EN/EN_COM/Retrieve_JEONGONG_CD.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "ds_SearchJeongong=ds_jeongongCd";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        }

        this.fn_PostSearchJeongong = function()
        {
        	this.ds_SearchJeongong.insertRow(0);
        	this.ds_SearchJeongong.setColumn(0, 'DEPT_CD','');
         	this.ds_SearchJeongong.setColumn(0, 'DEPT_NM','전체');
        	this.divSearch.form.cboSearchJeongong.set_index(0);
        }

        // 기준년도 조회
        this.fn_GijunYyyy = function()
        {
        	var strSvc      = "GijunYyyy";
            var strUrl      = "/prj/EN/EN_COM/Retrieve_GIJUN_YYYY.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "ds_gijunYyyy=ds_gijunYyyy";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        }

        this.fn_PostGijunYyyy = function()
        {
        	this.ds_input.setColumn(0,"PYEONIP_YYYY", this.ds_gijunYyyy.getColumn(0, "YYYY"));
        	this.fn_SearchMojip();
        }

        //모집구분 조회(검색조건)
        this.fn_SearchMojip = function()
        {
        	this.ds_SearchHakgwa.deleteAll();
        	this.ds_SearchJuya.deleteAll();
        	this.ds_SearchHaknyeon.deleteAll();

        	var strSvc      = "SearchMojip";
            var strUrl      = "/prj/ET/ET_COM/Retrieve_PYEONIP_MOJIP.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "ds_SearchMojip=ds_pyeonipMojip";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        this.fn_PostSearchMojip = function()
        {
        	for(var i = 0; i < this.ds_SearchMojip.rowcount; i++)
        	{
                if(this.ds_SearchMojip.getColumn(i, "HYEONJAE_MOJIP_YN") == 'Y')
        		{
        			this.ds_input.setColumn(0,"PYEONIP_MOJIP_GBCD", this.ds_SearchMojip.getColumn(0, "PYEONIP_MOJIP_GBCD"));
                }
            }

        	if(this.ds_SearchMojip.rowcount == 0)
        	{
        		this.ds_SearchMojip.insertRow(0);
        		this.ds_SearchMojip.setColumn(0, 'PYEONIP_MOJIP_GBCD','');
        		this.ds_SearchMojip.setColumn(0, 'PYEONIP_MOJIP_NM','전체');
        	}

        	this.fn_SearchHakgwa();
        }

        // 학과 조회(검색조건)
        this.fn_SearchHakgwa = function ()
        {
        	this.ds_input.setColumn(0, "MYEONJEOP_YN", "N");
        	this.ds_input.setColumn(0, "SILGI_YN", "Y");

        	var strSvc      = "SearchHakgwa";
            var strUrl      = "/prj/ET/ET_COM/Retrieve_PYEONIP_HAKGWA.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "ds_SearchHakgwa=ds_Hakgwa";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        }

        this.fn_PostSearchHakgwa = function()
        {
        	this.ds_SearchHakgwa.insertRow(0);
        	this.ds_SearchHakgwa.setColumn(0, 'HAKGWA_CD','');
         	this.ds_SearchHakgwa.setColumn(0, 'HAKGWA_NM','전체');
        	this.divSearch.form.cboSearchHakgwa.set_index(0);

        	this.ds_SearchJuya.insertRow(0);
        	this.ds_SearchJuya.setColumn(0, 'JUYA_GBCD','');
         	this.ds_SearchJuya.setColumn(0, 'JUYA_GBNM','전체');
        	this.divSearch.form.cboSearchJuya.set_index(0);

        	this.ds_SearchHaknyeon.insertRow(0);
        	this.ds_SearchHaknyeon.setColumn(0, 'PYEONIP_HAKNYEON','');
         	this.ds_SearchHaknyeon.setColumn(0, 'PYEONIP_HAKNYEON_NM','전체');
        	this.divSearch.form.cboSearchHaknyeon.set_index(0);
        }

        //주야구분 조회(검색조건)
        this.fn_SearchJuya = function ()
        {
        	var strSvc      = "SearchJuya";
            var strUrl      = "/prj/ET/ET_COM/Retrieve_JUYA.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "ds_SearchJuya=ds_Juya";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        }

        this.fn_PostSearchJuya = function()
        {
        	this.ds_SearchJuya.insertRow(0);
        	this.ds_SearchJuya.setColumn(0, 'JUYA_GBCD','');
         	this.ds_SearchJuya.setColumn(0, 'JUYA_GBNM','전체');
        	this.divSearch.form.cboSearchJuya.set_index(0);

        	this.ds_SearchHaknyeon.insertRow(0);
        	this.ds_SearchHaknyeon.setColumn(0, 'PYEONIP_HAKNYEON','');
         	this.ds_SearchHaknyeon.setColumn(0, 'PYEONIP_HAKNYEON_NM','전체');
        	this.divSearch.form.cboSearchHaknyeon.set_index(0);
        }

        //학년 조회(검색조건)
        this.fn_SearchHaknyeon = function ()
        {
        	var strSvc      = "SearchHaknyeon";
            var strUrl      = "/prj/ET/ET_COM/Retrieve_PYEONIP_HAKNYEON.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "ds_SearchHaknyeon=ds_Haknyeon";
            var strArg      = "";
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;                                   //샏략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        }

        this.fn_PostSearchHaknyeon = function()
        {
        	this.ds_SearchHaknyeon.insertRow(0);
        	this.ds_SearchHaknyeon.setColumn(0, 'PYEONIP_HAKNYEON','');
         	this.ds_SearchHaknyeon.setColumn(0, 'PYEONIP_HAKNYEON_NM','전체');
        	this.divSearch.form.cboSearchHaknyeon.set_index(0);
        }

        //중복체크
        this.fn_Unique = function (params)
        {
            var uniqueCk = 0;
            var array = new Array();
            for(var i = 0 ; i < params.length; i++){
                for(var j = 0 ; j < array.length ; j++){
                    if(array[j] == params[i]){
                        uniqueCk = 1;
                        break;
                    }
                }
                array[array.length] = params[i];
            }
            return uniqueCk;
        };

        /**********************************************************************
                14. 검색창 엔터키 조회
        ***********************************************************************/
        this.divSearch_spnSearchYYYY_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.ds_input.setColumn(0,"PYEONIP_YYYY",obj.value);
        		this.fn_Ret();
        	}
        };

        this.divSearch_cboSearchMojip_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.ds_input.setColumn(0,"PYEONIP_MOJIP_GBCD",obj.value);
        		this.fn_Ret();
        	}
        };

        this.divSearch_cboSearchHakgwa_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.ds_input.setColumn(0,"JIWONHAKGWA_CD",obj.value);
        		this.fn_Ret();
        	}
        };

        this.divSearch_cboSearchJeongong_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.ds_input.setColumn(0,"JEONGONG_CD",obj.value);
        		this.fn_Ret();
        	}
        };

        this.divSearch_cboSearchJuya_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.ds_input.setColumn(0,"JUYA_GBCD",obj.value);
        		this.fn_Ret();
        	}
        };

        this.divSearch_cboSearchHaknyeon_onkeydown = function(obj,e)
        {
        	if(e.keycode == 13)
        	{
        		this.ds_input.setColumn(0,"PYEONIP_HAKNYEON",obj.value);
        		this.fn_Ret();
        	}
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.divSearch.form.spnSearchYYYY.addEventHandler("onchanged",this.fn_SearchMojip,this);
            this.divSearch.form.spnSearchYYYY.addEventHandler("onkeydown",this.divSearch_spnSearchYYYY_onkeydown,this);
            this.divSearch.form.cboSearchMojip.addEventHandler("onitemchanged",this.fn_SearchHakgwa,this);
            this.divSearch.form.cboSearchMojip.addEventHandler("onkeydown",this.divSearch_cboSearchMojip_onkeydown,this);
            this.divSearch.form.cboSearchHakgwa.addEventHandler("onitemchanged",this.fn_SearchJuya,this);
            this.divSearch.form.cboSearchHakgwa.addEventHandler("onkeydown",this.divSearch_cboSearchHakgwa_onkeydown,this);
            this.divSearch.form.cboSearchJuya.addEventHandler("onitemchanged",this.fn_SearchHaknyeon,this);
            this.divSearch.form.cboSearchJuya.addEventHandler("onkeydown",this.divSearch_cboSearchJuya_onkeydown,this);
            this.divSearch.form.cboSearchHaknyeon.addEventHandler("onkeydown",this.divSearch_cboSearchHaknyeon_onkeydown,this);
            this.divSearch.form.cboSearchJeongong.addEventHandler("onkeydown",this.divSearch_cboSearchJeongong_onkeydown,this);
            this.grdMaster.addEventHandler("onselectchanged",this.grdMaster_onselectchanged,this);
            this.grdMaster.addEventHandler("onheaddblclick",this.grdMaster_onheaddblclick,this);
            this.btnNew1.addEventHandler("onclick",this.btnNew1_onclick,this);
            this.btnSave1.addEventHandler("onclick",this.btnSave1_onclick,this);
            this.btnDel1.addEventHandler("onclick",this.btnDel1_onclick,this);
            this.btnNew2.addEventHandler("onclick",this.btnNew2_onclick,this);
            this.btnSave2.addEventHandler("onclick",this.btnSave2_onclick,this);
            this.btnDel2.addEventHandler("onclick",this.btnDel2_onclick,this);
            this.grdDetail01.addEventHandler("onheaddblclick",this.grdDetail01_onheaddblclick,this);
            this.grdDetail02.addEventHandler("onheaddblclick",this.grdDetail02_onheaddblclick,this);
            this.btnDaesangjaNew.addEventHandler("onclick",this.btnDaesangjaNew_onclick,this);
            this.btnDaesangjaDel.addEventHandler("onclick",this.btnDaesangjaDel_onclick,this);
            this.dsMaster.addEventHandler("onrowposchanged",this.dsMaster_onrowposchanged,this);
            this.dsMaster.addEventHandler("oncolumnchanged",this.dsMaster_oncolumnchanged,this);
        };
        this.loadIncludeScript("ET04_1020402_M.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
